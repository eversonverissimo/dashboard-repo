import React from 'react';
import './DashboardContainer.css';
import { AvgMergeTimeByPullRequestSize, AvgPullRequestMergeTime, AvgIssueCloseTime, MonthSummary } from '../RepoCharts';
import { Empty, Loading, Error } from '../common';
import { STATS_REPO_QUERY } from '../graphql/queries';
import { Query } from 'react-apollo';

const DashboardContainer = (props) => {

    return (
        <div className="dashboard-container">
            {!!props.mainName && !!props.repoName &&
                <Query query={STATS_REPO_QUERY} variables={{name: props.mainName, repo: props.repoName}}>
                    {({ loading, error, data }) => {
                        if (loading){
                            return <Loading />;
                        }
                        if (error || !data.repository){
                            console.log("error", error);
                            return <Error />;
                        }

                        console.log("data", data.repository);
                        var avgIssueCloseTime = getAvgIssueCloseTime(data.repository);
                        var mergeTime = getAvgPRMergeTime(data.repository);
                        data = 'oi';
                        return (
                            <div>
                                <div className="row-container">
                                    <div className="dashboard-item dashboard-avg-merge-time-pr-size full-width">
                                        <AvgMergeTimeByPullRequestSize {...mergeTime} ></AvgMergeTimeByPullRequestSize>
                                    </div>
                                </div>
                                <div className="row-container">
                                    <div className="dashboard-item dashboard-avg-pr-merge-time half-width">
                                        <AvgPullRequestMergeTime {...mergeTime} ></AvgPullRequestMergeTime>
                                    </div>
                                    <div className="dashboard-item dashboard-avg-issue-close-time half-width">
                                        <AvgIssueCloseTime values={avgIssueCloseTime} ></AvgIssueCloseTime>
                                    </div>
                                </div>
                                <div className="row-container">
                                    <div className="dashboard-item dashboard-month-summary full-width">
                                        <MonthSummary values={data} ></MonthSummary>
                                    </div>
                                </div>
                            </div>
                        );
                    }}
                </Query>
            }
            {(!props.mainName || !props.repoName) && 
                <div className="row-container">
                    <div className="dashboard-item full-width">
                        <Empty></Empty>
                    </div>
                </div>
            }
        </div>
    );
}

/* Get the diffence in seconds between given start and end time */
const diffSeconds = (startTime, endTime) => {
    const createdAt = new Date(startTime);
    const closedAt = new Date(endTime);
    const diffTime = Math.abs(closedAt.getTime() - createdAt.getTime());
    const diffSecs = Math.ceil(diffTime / (1000));

    return diffSecs;
}

/* Returns a formatted amount of time (dd hh mm ss) given time in seconds */
const formattedTimeDiff = (diffSecs) => {

    var days = Math.floor(Math.floor(Math.floor(diffSecs/60)/60)/24)%24;
    var hours = Math.floor(Math.floor(diffSecs/60)/60)%60;
    var minutes = Math.floor(diffSecs/60)%60;
    var seconds = Math.floor(diffSecs%60);

    return `${days > 0 && days + 'days ' || ''} ${hours > 0 && hours + 'h ' || ''} 
        ${minutes > 0 && minutes + 'm ' || ''} ${seconds > 0 && seconds + 's ' || ''}`;
}

/* Get average time for an issue to be closed or 0h 0m if none is provided */
const getAvgIssueCloseTime = ({issues}) => {
    var sumSecs = 0;
    var avgSecs = 0;

    if (issues.edges.length){
        issues.edges.forEach(function({node}) {
            sumSecs += diffSeconds(node.createdAt, node.closedAt);
        });

        avgSecs = sumSecs/issues.edges.length;
        return formattedTimeDiff(avgSecs);
    }

    return '0h 0m'
}

/* Get hours given time in seconds */
const getHours = (timeInSeconds) => {
    return timeInSeconds/(60*60);
}

/* get average time for a pull request to close or merge */
const getAvgPRMergeTime = ({pullRequests}) => {

    var response = {};
    if (pullRequests.edges.length){

        var sumSmallTime = 0, countSmall = 0,
            sumMediumTime = 0, countMedium = 0,
            sumLargeTime = 0, countLarge = 0;
    
        var prSize, diffSecs, commit;

        pullRequests.edges.forEach(function({node}) {
            if (node.commits && node.commits.edges.length){
                prSize = 0;
                node.commits.edges.forEach(function(edgeCommit) {
                    commit = edgeCommit.node && edgeCommit.node.commit || {};
                    prSize += commit.additions + commit.deletions;
                });
                
                diffSecs = diffSeconds(node.createdAt, node.mergedAt || node.closedAt);
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
        });

        debugger;
        response.smallPR = {
            avgMergeTime: countSmall && getHours(sumSmallTime/countSmall),
            count: countSmall
        };
        response.mediumPR = {
            avgMergeTime: countMedium && getHours(sumMediumTime/countMedium),
            count: countMedium
        };
        response.largePR = {
            avgMergeTime: countLarge && getHours(sumLargeTime/countLarge),
            count: countLarge
        };

        response.avgPRMergeTime = formattedTimeDiff((sumSmallTime + sumMediumTime + sumLargeTime)/(countSmall + countMedium + countLarge));

        return response;
    }
}

export default DashboardContainer;
