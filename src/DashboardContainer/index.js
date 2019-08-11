import React from 'react';
import './DashboardContainer.css';
import { AvgMergeTimeByPullRequestSize, AvgPullRequestMergeTime, AvgIssueCloseTime, MonthSummary } from '../RepoCharts';
import { Empty, Loading, Error } from '../common';
import { STATS_REPO_QUERY } from '../graphql/queries';
import { Query } from 'react-apollo';
import { DashboardDataProcessor } from './DashboardDataProcessor';

const processor = new DashboardDataProcessor();

const DashboardContainer = (props) => {

    return (
        <div className="dashboard-container">
            {!!props.mainName && !!props.repoName &&
                <Query query={STATS_REPO_QUERY} variables={{name: props.mainName, repo: props.repoName}}>
                    {({ loading, error, data, fetchMore }) => {
                        if (loading){
                            return <Loading />;
                        }
                        if (error || !data.repository){
                            console.log("Error", error);
                            return <Error />;
                        }

                        var issueInfo = processor.getIssueInfo(data.repository.issues, fetchMore);
                        var mergeInfo = processor.getPullRequestInfo(data.repository.pullRequests, fetchMore);
                        return (
                            <div>
                                <div className="row-container">
                                    <div className="dashboard-item dashboard-avg-merge-time-pr-size full-width">
                                        <AvgMergeTimeByPullRequestSize {...mergeInfo} ></AvgMergeTimeByPullRequestSize>
                                    </div>
                                </div>
                                <div className="row-container">
                                    <div className="dashboard-item dashboard-avg-pr-merge-time half-width">
                                        <AvgPullRequestMergeTime {...mergeInfo} ></AvgPullRequestMergeTime>
                                    </div>
                                    <div className="dashboard-item dashboard-avg-issue-close-time half-width">
                                        <AvgIssueCloseTime {...issueInfo} ></AvgIssueCloseTime>
                                    </div>
                                </div>
                                <div className="row-container">
                                    <div className="dashboard-item dashboard-month-summary full-width">
                                        <MonthSummary {...mergeInfo} {...issueInfo} ></MonthSummary>
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

export default DashboardContainer;
