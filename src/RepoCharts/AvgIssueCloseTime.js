import React from 'react';

const AvgIssueCloseTime = ({avgIssueCloseTime}) => {
    avgIssueCloseTime = avgIssueCloseTime || '5 days 3h25m';

    return (
        <div className="avg-issue-close-time-wrapper">
            <div className="dashboard-item-header">
                <h4 className="dashboard-title">Average Issue Close Time</h4>
            </div>
            <div className="dashboard-item-body">
                <h1 className="large-text">{avgIssueCloseTime}</h1>
            </div>
        </div>
    );
}

export { AvgIssueCloseTime };