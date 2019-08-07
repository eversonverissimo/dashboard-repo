import React from 'react';
import { AVG_PR_MERGE_TIME } from '../graphql/queries';
import { Query } from 'react-apollo';
import { Loading, Error } from '../common';

const AvgPullRequestMergeTime = ({mainName, repoName}) => {
    return (
        <div className="avg-pull-request-merge-time-wrapper">
            <div className="dashboard-item-header">
                <h4 className="dashboard-title">Average Pull Request Merge Time</h4>
            </div>
            <div className="dashboard-item-body">
                <Query query={AVG_PR_MERGE_TIME} variables={{name: mainName, repo: repoName}}>
                    {({ loading, error, data }) => {
                        if (loading){
                            return <Loading />;
                        }
                        if (error){
                            return <Error />;
                        }

                        return <h1 className="large-text">1 day 2h30m</h1>;
                    }}
                </Query>
            </div>
        </div>
    );
}

export { AvgPullRequestMergeTime };