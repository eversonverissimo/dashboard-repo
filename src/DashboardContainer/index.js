import React from 'react';
import './DashboardContainer.css';
import { AvgMergeTimeByPullRequestSize, AvgPullRequestMergeTime, AvgIssueCloseTime, MonthSummary } from '../RepoCharts';
import { Empty } from '../common';

const DashboardContainer = (props) => {

    return (
        <div className="dashboard-container">
            {!!props.mainName && !!props.repoName &&
                <div>
                    <div className="row-container">
                        <div className="dashboard-item dashboard-avg-merge-time-pr-size full-width">
                            <AvgMergeTimeByPullRequestSize {...props} ></AvgMergeTimeByPullRequestSize>
                        </div>
                    </div>
                    <div className="row-container">
                        <div className="dashboard-item dashboard-avg-pr-merge-time half-width">
                            <AvgPullRequestMergeTime {...props}></AvgPullRequestMergeTime>
                        </div>
                        <div className="dashboard-item dashboard-avg-issue-close-time half-width">
                            <AvgIssueCloseTime {...props}></AvgIssueCloseTime>
                        </div>
                    </div>
                    <div className="row-container">
                        <div className="dashboard-item dashboard-month-summary full-width">
                            <MonthSummary {...props}></MonthSummary>
                        </div>
                    </div>
                </div>
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
