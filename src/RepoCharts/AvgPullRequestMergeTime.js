import React from 'react';

const AvgPullRequestMergeTime = ({ values }) => {
    return (
        <div className="avg-pull-request-merge-time-wrapper">
            <div className="dashboard-item-header">
                <h4 className="dashboard-title">Average Pull Request Merge Time</h4>
            </div>
            <div className="dashboard-item-body">
                <h1 class="large-text">1 day 2h30m</h1>
            </div>
        </div>
    );
}

export { AvgPullRequestMergeTime };