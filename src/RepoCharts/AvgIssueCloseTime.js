import React from 'react';
import { Query } from 'react-apollo';
import { Loading, Error } from '../common';
import { AVG_ISSUE_CLOSE_TIME } from '../graphql/queries';

const AvgIssueCloseTime = ({mainName, repoName}) => {
    return (
        <div className="avg-issue-close-time-wrapper">
            <div className="dashboard-item-header">
                <h4 className="dashboard-title">Average Issue Close Time</h4>
            </div>
            <div className="dashboard-item-body">
                <Query query={AVG_ISSUE_CLOSE_TIME} variables={{name: mainName, repo: repoName}}>
                    {({ loading, error, data }) => {
                        if (loading){
                            return <Loading />;
                        }
                        if (error){
                            return <Error />;
                        }

                        return <h1 className="large-text">5 days 3h25m</h1>;
                    }}
                </Query>
            </div>
        </div>
    );
}

export { AvgIssueCloseTime };