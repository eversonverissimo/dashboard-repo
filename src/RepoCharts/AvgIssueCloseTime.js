import React from 'react';

const AvgIssueCloseTime = ({ values }) => {
    return (
        <div className="avg-issue-close-time-wrapper">
            <div className="dashboard-item-header">
                <h4 className="dashboard-title">Average Issue Close Time</h4>
            </div>
            <div className="dashboard-item-body">
                <h1 class="large-text">5 days 3h25m</h1>
            </div>
        </div>
    );
}

export { AvgIssueCloseTime };