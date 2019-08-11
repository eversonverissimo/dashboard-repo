
import _ from 'lodash';
import moment from 'moment';

export class DashboardDataProcessor {

    /* Get the diffence in seconds between given start and end time */
    diffSeconds = (startDate, endDate) => {
        const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
        const diffSecs = Math.ceil(diffTime / (1000));

        return diffSecs;
    }

    /* Returns a formatted amount of time (dd hh mm ss) given time in seconds */
    formattedTimeDiff = (diffSecs) => {

        var days = Math.floor(Math.floor(Math.floor(diffSecs/60)/60)/24)%24;
        var hours = Math.floor(Math.floor(diffSecs/60)/60)%60;
        var minutes = Math.floor(diffSecs/60)%60;
        var seconds = Math.floor(diffSecs%60);

        return `${(days > 0 && days + 'days ') || ''}
            ${(hours > 0 && hours + 'h') || ''}${(minutes > 0 && minutes + 'm ') || ''}`;
    }

    /* Get hours given time in seconds */
    getHours = (timeInSeconds) => {
        return timeInSeconds/(60*60);
    }

    /* Checks if period A overlaps period B */
    dateRangeOverlaps = (startDateA, endDateA, startDateB, endDateB) => {
        return !((endDateA < startDateB) || (startDateA > endDateB));
    }

    /* Checks if data is between start and end */
    dateBetween = (dateToBeChecked, startDate, endDate) => {
        return startDate <= dateToBeChecked && endDate >= dateToBeChecked;
    }

    /* Get average time for an issue to be closed or 0h 0m if none is provided */
    getIssueInfo = (issues, fetchMore) => {
        
        var self = this;
        var response = {};

        // Fill up empty with dates
        const endDate = new Date();
        const startDate = new Date();
        startDate.setMonth(startDate.getMonth()-1);
        var currentDate = new Date();
        currentDate.setMonth(currentDate.getMonth()-1);

        var currentformatted;
        var issuesOpenedPerDay = {}, issuesClosedPerDay = {};
        while (currentDate <= endDate) {
            currentformatted = moment(currentDate).format('D MMM');
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
                
                sumSecs += self.diffSeconds(createdAtDate, closedAtDate);
                
                createdAtFormatted = moment(createdAtDate).format('D MMM');
                closedAtFormatted = node.closedAt && moment(closedAtDate).format('D MMM');
                                
                // Checks if issue was still opened somewhen last month
                if (self.dateRangeOverlaps(createdAtDate, closedAtDate, startDate, endDate)) {
                    countIssuesLastMonth++;
                }
                // Checks if issue was created last month
                if (self.dateBetween(createdAtDate, startDate, endDate)){
                    issuesOpenedPerDay[createdAtFormatted] = issuesOpenedPerDay[createdAtFormatted] + 1;
                }
                
                // Checks if issue was closed last month
                if (self.dateBetween(closedAtDate, startDate, endDate)){
                    issuesClosedPerDay[closedAtFormatted] = issuesClosedPerDay[closedAtFormatted] + 1;
                }

            });

            // Calculates average
            avgSecs = sumSecs/issues.edges.length;
        }

        response = {
            avgIssueCloseTime: avgSecs ? self.formattedTimeDiff(avgSecs) : '0h 0m',
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

    /* get average time for a pull request to close or merge */
    getPullRequestInfo = (pullRequests, refetch) => {
        
        var self = this;
        var response = {};

        // Fill up empty with dates
        const endDate = new Date();
        const startDate = new Date();
        startDate.setMonth(startDate.getMonth()-1);
        var currentDate = new Date();
        currentDate.setMonth(currentDate.getMonth()-1);

        var currentformatted;
        var prOpenedPerDay = {}, prMergedPerDay = {}, prClosedPerDay = {};
        while (currentDate <= endDate) {
            currentformatted = moment(currentDate).format('D MMM');
            prOpenedPerDay[currentformatted] = 0;
            prMergedPerDay[currentformatted] = 0;
            prClosedPerDay[currentformatted] = 0;
            currentDate.setDate(currentDate.getDate()+1);
        }

        if (pullRequests.edges.length){

            var sumSmallTime = 0, countSmall = 0,
                sumMediumTime = 0, countMedium = 0,
                sumLargeTime = 0, countLarge = 0,
                countPRLastMonth = 0;

            var createdAtFormatted, mergedAtFormatted, closedAtFormatted,
                createdAtDate, mergedAtDate, closedAtDate;
        
            var prSize, diffSecs, commit;

            pullRequests.edges.forEach(function({node}) {
                if (node.commits){
                    createdAtDate = node.createdAt && new Date(node.createdAt);
                    mergedAtDate = node.mergedAt && new Date(node.mergedAt);
                    closedAtDate = node.closedAt && new Date(node.closedAt);
                
                    // Checks if PR was still opened somewhen last month
                    if (self.dateRangeOverlaps(createdAtDate, mergedAtDate || closedAtDate || new Date(), startDate, endDate)) {
                        countPRLastMonth++;
                    }

                    createdAtFormatted = moment(createdAtDate).format('D MMM');
                    mergedAtFormatted = node.mergedAt && moment(mergedAtDate).format('D MMM');
                    closedAtFormatted = node.closedAt && moment(closedAtDate).format('D MMM');

                    // Checks if PR was created last month
                    if (self.dateBetween(createdAtDate, startDate, endDate)){
                        prOpenedPerDay[createdAtFormatted] = prOpenedPerDay[createdAtFormatted] + 1;
                    }
                    
                    // Checks if PR was merged last month
                    if (node.merged && self.dateBetween(mergedAtDate, startDate, endDate)){
                        prMergedPerDay[mergedAtFormatted] = prMergedPerDay[mergedAtFormatted] + 1;
                    }

                    // Checks if PR was closed last month
                    if (!node.merged && node.closed && self.dateBetween(closedAtDate, startDate, endDate)){
                        prClosedPerDay[closedAtFormatted] = prClosedPerDay[closedAtFormatted] + 1;
                    }

                    if (node.merged && node.commits.edges.length){
                        prSize = 0;
                        node.commits.edges.forEach(function(edgeCommit) {
                            commit = (edgeCommit.node && edgeCommit.node.commit) || {};
                            prSize += commit.additions + commit.deletions;
                        });
    
                        diffSecs = self.diffSeconds(createdAtDate, mergedAtDate || closedAtDate);
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

            /* Avg Merge Time by PR Size */
            response.smallPR = {
                avgMergeTime: countSmall && self.getHours(sumSmallTime/countSmall),
                count: countSmall
            };
            response.mediumPR = {
                avgMergeTime: countMedium && self.getHours(sumMediumTime/countMedium),
                count: countMedium
            };
            response.largePR = {
                avgMergeTime: countLarge && self.getHours(sumLargeTime/countLarge),
                count: countLarge
            };
            
            /* Avg PR Merge Time */
            var avgMergeTime = (sumSmallTime + sumMediumTime + sumLargeTime)/(countSmall + countMedium + countLarge);
            response.avgPRMergeTime = avgMergeTime ? self.formattedTimeDiff(avgMergeTime) : '0h 0m';
                        
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
}
