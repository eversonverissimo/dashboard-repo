import React, {useState} from 'react';
import './Dashboard.css';
import DashboardContainer from '../DashboardContainer';

const Dashboard = () => {

    const [mainName, setMainName] = useState("");
    const [repoName, setRepoName] = useState("");

    return (
        <div className="dashboard-wrapper">
            <div className="dashboard-header">
                <div className="form-group">
                    <input className="form-input main-name" type="text" placeholder="Organization or User name"
                        value={mainName} onChange={event => setMainName(event.target.value)}>
                    </input>
                    <input className="form-input repo-name" type="text" placeholder="Repository name"
                        value={repoName} onChange={event => setRepoName(event.target.value)}>
                    </input>
                </div>
            </div>
            <div className="dashboard-body">
                <DashboardContainer mainName={mainName} repoName={repoName} ></DashboardContainer>
            </div>
        </div>
    );
}

export default Dashboard;
