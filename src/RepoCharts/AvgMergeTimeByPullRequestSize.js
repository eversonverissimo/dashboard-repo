import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {

    if (active) {
      return (
        <div className="tooltip-info" style={{padding: '20px 10px'}}>
            <div>
                <div style={{width:120, display: 'inline-block'}}>Average Time</div>
                <div style={{display: 'inline-block'}}>{payload[0].payload.time}h</div>
            </div>
            <div>
                <div style={{width:120, display: 'inline-block'}}>Pull Requests</div>
                <div style={{display: 'inline-block'}}>{payload[0].payload.count}</div>
            </div>
        </div>
      );
    }
  
    return null;
};

const AvgMergeTimeByPullRequestSize = ({smallPR, mediumPR, largePR}) => {

    const data = [
        {
          name: 'Small', time: Math.round(smallPR.avgMergeTime), count: smallPR.count,
        },
        {
          name: 'Medium', time: Math.round(mediumPR.avgMergeTime), count: mediumPR.count,
        },
        {
          name: 'Large', time: Math.round(largePR.avgMergeTime), count: largePR.count,
        },
    ];
    
    return (
        <div className="avg-merge-time-pr-size-wrapper">
            <div className="dashboard-item-header">
                <h4 className="dashboard-title">Average Merge Time by Pull Request Size</h4>
            </div>
            <div className="dashboard-item-body" style={{padding: '0 40px'}}>
                <ResponsiveContainer width="100%" height={400} >
                    <BarChart data={data} >
                        <CartesianGrid vertical={false} />
                        <XAxis dataKey="name" />
                        <YAxis unit="h" />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar dataKey="time" fill="#4B9BFF" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export { AvgMergeTimeByPullRequestSize };