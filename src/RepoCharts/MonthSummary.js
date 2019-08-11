import React, {useState} from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CustomTooltip = ({ active, payload, currentView }) => {

  if (active && payload) {
    return (
      <div className="tooltip-info">
          <div className="tooltip-header">{currentView === 'PR' ? 'Pull Requests' : 'Issues'} at {payload[0].payload.day}</div>
          <div className="tooltip-body">
             {payload.map(p => (
                <div key={p.name}>
                    <div style={{width:90, display: 'inline-block'}}>
                        <span style={{color: p.color, fontSize: 20}}>&bull;</span> <span>{p.name}</span>
                    </div>
                    <div style={{display: 'inline-block'}}>{p.value}</div>
                </div>
             ))}
          </div>
      </div>
    );
  }

  return null;
};

const MonthSummary = (props) => {

    const { issuesOpenedPerDay, issuesClosedPerDay, countPR, countIssues,
        prOpenedPerDay, prMergedPerDay, prClosedPerDay } = props;
        
    const [currentView, setCurrentView] = useState("PR");

    const prXAxisInterval = Math.round(Object.keys(prOpenedPerDay).length / 5);
    const seriesPR = [
        { name: 'Opened', stroke: '#B20BFF', data: prOpenedPerDay },
        { name: 'Merged', stroke: '#23CA11', data: prMergedPerDay },
        { name: 'Closed', stroke: '#FF3A00', data: prClosedPerDay }
    ];

    const issuesXAxisInterval = Math.round(Object.keys(issuesOpenedPerDay).length / 5);
    const seriesIssues = [
        { name: 'Opened', stroke: '#23CA11', data: issuesOpenedPerDay },
        { name: 'Closed', stroke: '#FF3A00', data: issuesClosedPerDay }
    ];

    return (
        <div className="month-summary-wrapper">
            <div className="dashboard-item-header">
                <h4 className="dashboard-title">Month Summary</h4>
            </div>
            <div className="dashboard-item-body" style={{marginTop: -15}}>
                <button className={"btn-view-mode " + (currentView === 'PR' ? 'active' : '')}
                    style={{marginLeft: 20}}
                    onClick={()=>setCurrentView('PR')}>
                    <div className="btn-header">Pull Requests</div>
                    <div className="btn-body">{countPR}</div>
                </button>
                <button className={"btn-view-mode " + (currentView === 'ISSUES' ? 'active' : '')}
                    onClick={()=>setCurrentView('ISSUES')}>
                    <div className="btn-header">Issues</div>
                    <div className="btn-body">{countIssues}</div>
                </button>
                <div style={{paddingRight: 40}}>
                    <ResponsiveContainer width="100%" height={400}>
                        <LineChart style={{margin: '0 auto'}}>
                            <CartesianGrid />
                            <XAxis dataKey="day" interval={currentView === 'PR' ? prXAxisInterval : issuesXAxisInterval} allowDuplicatedCategory={false} />
                            <YAxis dataKey="value" />
                            <Tooltip content={<CustomTooltip currentView={currentView} />} />
                            <Legend iconType="circle" iconSize={7}/>
                            {(currentView === 'PR' ? seriesPR : seriesIssues).map(s => (
                                <Line dataKey="value" data={s.data} name={s.name} stroke={s.stroke} key={s.name} dot={false}/>
                            ))}
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}

export { MonthSummary };
