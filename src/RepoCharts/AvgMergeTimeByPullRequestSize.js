import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Query } from 'react-apollo';
import { AVG_MERGE_TIME_BY_PR_SIZE } from '../graphql/queries';
import { Loading, Error } from '../common';

const AvgMergeTimeByPullRequestSize = ({mainName, repoName}) => {

    const dataMock = [
        {
          name: 'Small', time: 13,
        },
        {
          name: 'Medium', time: 33,
        },
        {
          name: 'Large', time: 44,
        },
    ];
    
    return (
        <div className="avg-merge-time-pr-size-wrapper">
            <div className="dashboard-item-header">
                <h4 className="dashboard-title">Average Merge Time by Pull Request Size</h4>
            </div>
            <div className="dashboard-item-body">
                <Query query={AVG_MERGE_TIME_BY_PR_SIZE} variables={{name: mainName, repo: repoName}}>
                    {({ loading, error, data }) => {
                        if (loading){
                            return <Loading />;
                        }
                        if (error){
                            return <Error />
                        }

                        return (
                            <BarChart
                                width={500}
                                height={300}
                                data={dataMock}
                                style={{margin: '0 auto'}}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="time" fill="#4B9BFF" />
                            </BarChart>
                        );
                    }}
                </Query>
            </div>
        </div>
    );
}

export { AvgMergeTimeByPullRequestSize };