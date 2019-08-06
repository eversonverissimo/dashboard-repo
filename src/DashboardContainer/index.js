import React from 'react';
import './DashboardContainer.css';
import { AvgMergeTimeByPullRequestSize, AvgPullRequestMergeTime, AvgIssueCloseTime, MonthSummary } from '../RepoCharts';

const DashboardContainer = ({mainName, repoName}) => {

    return (
        <div className="dashboard-container">
            <div className="row-container">
                <div className="dashboard-item dashboard-avg-merge-time-pr-size full-width">
                    <AvgMergeTimeByPullRequestSize></AvgMergeTimeByPullRequestSize>
                </div>
            </div>
            <div className="row-container">
                <div className="dashboard-item dashboard-avg-pr-merge-time half-width">
                    <AvgPullRequestMergeTime></AvgPullRequestMergeTime>
                </div>
                <div className="dashboard-item dashboard-avg-issue-close-time half-width">
                    <AvgIssueCloseTime></AvgIssueCloseTime>
                </div>
            </div>
            <div className="row-container">
                <div className="dashboard-item dashboard-month-summary full-width">
                    <MonthSummary></MonthSummary>
                </div>
            </div>
        </div>
    );
}

export default DashboardContainer;
