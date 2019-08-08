import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const MonthSummary = ({ values }) => {

    const series = [
        {
          name: 'Merged',
          stroke: '#B20BFF',
          data: [
            { category: '20 Ago', value: Math.random() },
            { category: '21 Ago', value: Math.random() },
            { category: '22 Ago', value: Math.random() },
            { category: '23 Ago', value: Math.random() },
            { category: '24 Ago', value: Math.random() },
            { category: '25 Ago', value: Math.random() },
            { category: '26 Ago', value: Math.random() },
            { category: '27 Ago', value: Math.random() },
            { category: '28 Ago', value: Math.random() },
            { category: '29 Ago', value: Math.random() },
            { category: '30 Ago', value: Math.random() },
            { category: '31 Ago', value: Math.random() },
          ],
        },
        {
          name: 'Opened',
          stroke: '#23CA11',
          data: [
            { category: '20 Ago', value: Math.random() },
            { category: '21 Ago', value: Math.random() },
            { category: '22 Ago', value: Math.random() },
            { category: '23 Ago', value: Math.random() },
            { category: '24 Ago', value: Math.random() },
            { category: '25 Ago', value: Math.random() },
            { category: '26 Ago', value: Math.random() },
            { category: '27 Ago', value: Math.random() },
            { category: '28 Ago', value: Math.random() },
            { category: '29 Ago', value: Math.random() },
            { category: '30 Ago', value: Math.random() },
            { category: '31 Ago', value: Math.random() },
          ],
        },
        {
          name: 'Closed',
          stroke: '#FF3A00',
          data: [
            { category: '20 Ago', value: Math.random() },
            { category: '21 Ago', value: Math.random() },
            { category: '22 Ago', value: Math.random() },
            { category: '23 Ago', value: Math.random() },
            { category: '24 Ago', value: Math.random() },
            { category: '25 Ago', value: Math.random() },
            { category: '26 Ago', value: Math.random() },
            { category: '27 Ago', value: Math.random() },
            { category: '28 Ago', value: Math.random() },
            { category: '29 Ago', value: Math.random() },
            { category: '30 Ago', value: Math.random() },
            { category: '31 Ago', value: Math.random() },
          ],
        },
    ];

    return (
        <div className="month-summary-wrapper">
            <div className="dashboard-item-header">
                <h4 className="dashboard-title">Month Summary</h4>
            </div>
            <div className="dashboard-item-body">
                <LineChart width={900} height={300} style={{margin: '0 auto'}}>
                    <CartesianGrid />
                    <XAxis dataKey="category" type="category" allowDuplicatedCategory={false} />
                    <YAxis dataKey="value" />
                    <Tooltip />
                    <Legend />
                    {series.map(s => (
                        <Line dataKey="value" data={s.data} name={s.name} stroke={s.stroke} key={s.name} />
                    ))}
                </LineChart>
            </div>
        </div>
    );
}

export { MonthSummary };