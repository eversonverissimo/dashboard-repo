
import _ from 'lodash';

export class DashboardDataProcessor {

    /* Get the diffence in seconds between given start and end time */
    diffSeconds = (startTime, endTime) => {
        const createdAt = new Date(startTime);
        const closedAt = new Date(endTime);
        const diffTime = Math.abs(closedAt.getTime() - createdAt.getTime());
        const diffSecs = Math.ceil(diffTime / (1000));

        return diffSecs;
    }

    /* Returns a formatted amount of time (dd hh mm ss) given time in seconds */
    formattedTimeDiff = (diffSecs) => {

        var days = Math.floor(Math.floor(Math.floor(diffSecs/60)/60)/24)%24;
        var hours = Math.floor(Math.floor(diffSecs/60)/60)%60;
        var minutes = Math.floor(diffSecs/60)%60;
        var seconds = Math.floor(diffSecs%60);

        return `${(days > 0 && days + 'days ') || ''} ${(hours > 0 && hours + 'h ') || ''} 
            ${(minutes > 0 && minutes + 'm ') || ''} ${(seconds > 0 && seconds + 's ') || ''}`;
    }

    /* Get hours given time in seconds */
    getHours = (timeInSeconds) => {
        return timeInSeconds/(60*60);
    }

    /* Get average time for an issue to be closed or 0h 0m if none is provided */
    getIssueInfo = ({issues}) => {

        var self = this;
        var sumSecs = 0;
        var avgSecs = 0;
        var createdAt, closedAt;
        var issuesOpenedPerDay = {}, issuesClosedPerDay = {};

        if (issues.edges.length){
            issues.edges.forEach(function({node}) {
                sumSecs += self.diffSeconds(node.createdAt, node.closedAt);
                
                createdAt = new Date(node.createdAt).toLocaleDateString();
                closedAt = node.closedAt && new Date(node.closedAt).toLocaleDateString();

                issuesOpenedPerDay[createdAt] = (issuesOpenedPerDay[createdAt] || 0) + 1;
                node.closed && (issuesOpenedPerDay[closedAt] = (issuesOpenedPerDay[closedAt] || 0));
                
                issuesClosedPerDay[createdAt] = (issuesClosedPerDay[createdAt] || 0);
                node.closed && (issuesClosedPerDay[closedAt] = (issuesClosedPerDay[closedAt] || 0) + 1);

            });

            avgSecs = sumSecs/issues.edges.length;
        }

        var response = {
            avgIssueCloseTime: avgSecs ? self.formattedTimeDiff(avgSecs) : '0h 0m',
            countIssues: issues.edges.length,
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
    getPullRequestInfo = ({pullRequests}) => {

        var self = this;
        var response = {};
        if (pullRequests.edges.length){

            var sumSmallTime = 0, countSmall = 0,
                sumMediumTime = 0, countMedium = 0,
                sumLargeTime = 0, countLarge = 0;

            var createdAt, mergedAt, closedAt;
        
            var prSize, diffSecs, commit;
            var prOpenedPerDay = {}, prMergedPerDay = {}, prClosedPerDay = {};

            pullRequests.edges.forEach(function({node}) {
                if (node.commits){
                    createdAt = new Date(node.createdAt).toLocaleDateString();
                    mergedAt = node.mergedAt && new Date(node.mergedAt).toLocaleDateString();
                    closedAt = node.closedAt && new Date(node.closedAt).toLocaleDateString();

                    prOpenedPerDay[createdAt] = (prOpenedPerDay[createdAt] || 0) + 1;
                    node.merged && (prOpenedPerDay[mergedAt] = (prOpenedPerDay[mergedAt] || 0));
                    !node.merged && node.closed && (prOpenedPerDay[closedAt] = (prOpenedPerDay[closedAt] || 0));

                    prMergedPerDay[createdAt] = (prMergedPerDay[createdAt] || 0);
                    node.merged && (prMergedPerDay[mergedAt] = (prMergedPerDay[mergedAt] || 0) + 1);
                    !node.merged && node.closed && (prMergedPerDay[closedAt] = (prMergedPerDay[closedAt] || 0));

                    prClosedPerDay[createdAt] = (prClosedPerDay[createdAt] || 0);
                    node.merged && (prClosedPerDay[mergedAt] = (prClosedPerDay[mergedAt] || 0));
                    !node.merged && node.closed && (prClosedPerDay[closedAt] = (prClosedPerDay[closedAt] || 0) + 1);

                    if (node.merged && node.commits.edges.length){
                        prSize = 0;
                        node.commits.edges.forEach(function(edgeCommit) {
                            commit = (edgeCommit.node && edgeCommit.node.commit) || {};
                            prSize += commit.additions + commit.deletions;
                        });
    
                        diffSecs = self.diffSeconds(node.createdAt, node.mergedAt || node.closedAt);
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
            response.countPR = pullRequests.edges.length;

            return response;
        }
    }
}
