
import _ from 'lodash';
import { TimeHelper } from './TimeHelper';

export class DashboardDataProcessor {

  /** Get average time for an issue to be closed or 0h 0m if none is provided */
  static getIssueInfo = (issues, startDate, endDate) => {
    
    var response = {};

    // Fill up empty with dates
    var currentDate = new Date(startDate);
    var currentformatted;
    var issuesOpenedPerDay = {}, issuesClosedPerDay = {};
    while (currentDate <= endDate) {
      currentformatted = TimeHelper.formattedDate(currentDate);
      issuesOpenedPerDay[currentformatted] = 0;
      issuesClosedPerDay[currentformatted] = 0;
      currentDate.setDate(currentDate.getDate()+1);
    }

    var sumSecs = 0, avgSecs = 0, countIssuesLastMonth = 0;
    var createdAtFormatted, closedAtFormatted, createdAtDate, closedAtDate;

    if (issues.edges.length){
      issues.edges.forEach(function({node}) {
        createdAtDate = node.createdAt && new Date(node.createdAt);
        closedAtDate = node.closedAt && new Date(node.closedAt);
        
        sumSecs += TimeHelper.diffSeconds(createdAtDate, closedAtDate);
        
        createdAtFormatted = TimeHelper.formattedDate(createdAtDate);
        closedAtFormatted = node.closedAt && TimeHelper.formattedDate(closedAtDate);

        // Checks if issue was still opened somewhen last month
        if (TimeHelper.dateRangeOverlaps(createdAtDate, closedAtDate, startDate, endDate)) {
          countIssuesLastMonth++;
        }
        // Checks if issue was created last month
        if (TimeHelper.dateBetween(createdAtDate, startDate, endDate)){
          issuesOpenedPerDay[createdAtFormatted] = issuesOpenedPerDay[createdAtFormatted] + 1;
        }
        
        // Checks if issue was closed last month
        if (TimeHelper.dateBetween(closedAtDate, startDate, endDate)){
          issuesClosedPerDay[closedAtFormatted] = issuesClosedPerDay[closedAtFormatted] + 1;
        }

      });

      // Calculates average
      avgSecs = sumSecs/issues.edges.length;
    }

    response = {
      avgIssueCloseTime: TimeHelper.formattedTimeDiff(avgSecs),
      countIssues: countIssuesLastMonth,
      issuesOpenedPerDay: _.map(issuesOpenedPerDay, function(pr, key) {
        return { value: pr, day: key }
      }),
      issuesClosedPerDay: _.map(issuesClosedPerDay, function(pr, key) {
        return { value: pr, day: key }
      })
    };

    return response;
  }

  /** get average time for a pull request to close or merge */
  static getPullRequestInfo = (pullRequests, startDate, endDate) => {
    
    var response = {};

    // Fill up empty with dates
    var currentDate = new Date(startDate);
    var currentformatted;
    var prOpenedPerDay = {}, prMergedPerDay = {}, prClosedPerDay = {};
    while (currentDate <= endDate) {
      currentformatted = TimeHelper.formattedDate(currentDate);
      prOpenedPerDay[currentformatted] = 0;
      prMergedPerDay[currentformatted] = 0;
      prClosedPerDay[currentformatted] = 0;
      currentDate.setDate(currentDate.getDate()+1);
    }

    var sumSmallTime = 0, countSmall = 0,
    sumMediumTime = 0, countMedium = 0,
    sumLargeTime = 0, countLarge = 0,
    countPRLastMonth = 0;

    var createdAtFormatted, mergedAtFormatted, closedAtFormatted,
      createdAtDate, mergedAtDate, closedAtDate;

    if (pullRequests.edges.length){
    
      var prSize, diffSecs, commit;

      pullRequests.edges.forEach(function({node}) {
        if (node.commits){
          createdAtDate = node.createdAt && new Date(node.createdAt);
          mergedAtDate = node.mergedAt && new Date(node.mergedAt);
          closedAtDate = node.closedAt && new Date(node.closedAt);
        
          // Checks if PR was still opened somewhen last month
          if (TimeHelper.dateRangeOverlaps(createdAtDate, mergedAtDate || closedAtDate || new Date(), startDate, endDate)) {
            countPRLastMonth++;
          }

          createdAtFormatted = TimeHelper.formattedDate(createdAtDate);
          mergedAtFormatted = node.mergedAt && TimeHelper.formattedDate(mergedAtDate);
          closedAtFormatted = node.closedAt && TimeHelper.formattedDate(closedAtDate);

          // Checks if PR was created last month
          if (TimeHelper.dateBetween(createdAtDate, startDate, endDate)){
            prOpenedPerDay[createdAtFormatted] = prOpenedPerDay[createdAtFormatted] + 1;
          }
          
          // Checks if PR was merged last month
          if (node.merged && TimeHelper.dateBetween(mergedAtDate, startDate, endDate)){
            prMergedPerDay[mergedAtFormatted] = prMergedPerDay[mergedAtFormatted] + 1;
          }

          // Checks if PR was closed last month
          if (!node.merged && node.closed && TimeHelper.dateBetween(closedAtDate, startDate, endDate)){
            prClosedPerDay[closedAtFormatted] = prClosedPerDay[closedAtFormatted] + 1;
          }

          // For average merge time, only merged pull requests are considered.
          if (node.merged && node.commits.edges.length){
            prSize = 0;
            node.commits.edges.forEach(function(edgeCommit) {
              commit = (edgeCommit.node && edgeCommit.node.commit) || {};
              prSize += commit.additions + commit.deletions;
            });
  
            diffSecs = TimeHelper.diffSeconds(createdAtDate, mergedAtDate || closedAtDate);
            if (prSize <= 100){
              sumSmallTime += diffSecs;
              countSmall++;
            } else if (prSize <= 1000) {
              sumMediumTime += diffSecs;
              countMedium++;
            } else {
              sumLargeTime += diffSecs;
              countLarge++;
            }
          }
        }
      });
    }

    /* Avg Merge Time by PR Size */
    response.smallPR = {
      avgMergeTime: countSmall && TimeHelper.getHoursFromSeconds(sumSmallTime/countSmall),
      count: countSmall
    };
    response.mediumPR = {
      avgMergeTime: countMedium && TimeHelper.getHoursFromSeconds(sumMediumTime/countMedium),
      count: countMedium
    };
    response.largePR = {
      avgMergeTime: countLarge && TimeHelper.getHoursFromSeconds(sumLargeTime/countLarge),
      count: countLarge
    };
    
    /* Avg PR Merge Time */
    var avgMergeTime = (sumSmallTime + sumMediumTime + sumLargeTime)/(countSmall + countMedium + countLarge);
    response.avgPRMergeTime = TimeHelper.formattedTimeDiff(avgMergeTime);
          
    /* Month Summary */
    response.prOpenedPerDay = _.map(prOpenedPerDay, function(pr, key) {
      return { value: pr, day: key }
    });
    response.prMergedPerDay = _.map(prMergedPerDay, function(pr, key) {
      return { value: pr, day: key }
    });
    response.prClosedPerDay = _.map(prClosedPerDay, function(pr, key) {
      return { value: pr, day: key }
    });
    response.countPR = countPRLastMonth;

    return response;

  }
}
