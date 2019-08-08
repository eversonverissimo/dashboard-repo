import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const AvgMergeTimeByPullRequestSize = ({smallPR, mediumPR, largePR}) => {

    const data = [
        {
          name: 'Small', time: smallPR.avgMergeTime, count: smallPR.count,
        },
        {
          name: 'Medium', time: mediumPR.avgMergeTime, mediumPR: smallPR.count,
        },
        {
          name: 'Large', time: largePR.avgMergeTime, largePR: smallPR.count,
        },
    ];
    
    return (
        <div className="avg-merge-time-pr-size-wrapper">
            <div className="dashboard-item-header">
                <h4 className="dashboard-title">Average Merge Time by Pull Request Size</h4>
            </div>
            <div className="dashboard-item-body">
                <BarChart width={500} height={300} data={data} style={{margin: '0 auto'}}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="time" fill="#4B9BFF" />
                </BarChart>
            </div>
        </div>
    );
}

export { AvgMergeTimeByPullRequestSize };