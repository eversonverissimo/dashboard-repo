import React from 'react';
import './DashboardContainer.css';
import { AvgMergeTimeByPullRequestSize, AvgPullRequestMergeTime, AvgIssueCloseTime, MonthSummary } from '../RepoCharts';
import { Empty, Loading, Error } from '../common';
import { STATS_REPO_QUERY } from '../graphql/queries';
import { Query } from 'react-apollo';
import { DashboardDataProcessor } from './DashboardDataProcessor';

const DashboardContainer = (props) => {

  const endDate = new Date();
  const startDate = new Date();
  startDate.setMonth(startDate.getMonth()-1);

  return (
    <div className="dashboard-container">
      {!!props.mainName && !!props.repoName &&
        <Query query={STATS_REPO_QUERY} variables={{name: props.mainName, repo: props.repoName}}>
          {({ loading, error, data }) => {
            if (loading){
              return (
                <div className="row-container">
                  <div className="dashboard-item full-width">
                    <Loading />
                  </div>
                </div>
              );
            }
            if (error || !data.repository){
              console.log("Error", error);
              return (
                <div className="row-container">
                  <div className="dashboard-item full-width">
                    <Error />
                  </div>
                </div>
              );
            }

            var issueInfo = DashboardDataProcessor.getIssueInfo(data.repository.issues, startDate, endDate);
            var prInfo = DashboardDataProcessor.getPullRequestInfo(data.repository.pullRequests, startDate, endDate);

            return (
              <div>
                <div className="row-container">
                  <div className="dashboard-item dashboard-avg-merge-time-pr-size full-width">
                    <AvgMergeTimeByPullRequestSize {...prInfo} ></AvgMergeTimeByPullRequestSize>
                  </div>
                </div>
                <div className="row-container">
                  <div className="dashboard-item dashboard-avg-pr-merge-time half-width">
                    <AvgPullRequestMergeTime {...prInfo} ></AvgPullRequestMergeTime>
                  </div>
                  <div className="dashboard-item dashboard-avg-issue-close-time half-width">
                    <AvgIssueCloseTime {...issueInfo} ></AvgIssueCloseTime>
                  </div>
                </div>
                <div className="row-container">
                  <div className="dashboard-item dashboard-month-summary full-width">
                    <MonthSummary {...prInfo} {...issueInfo} ></MonthSummary>
                  </div>
                </div>
              </div>
            );
          }}
        </Query>
      }
      {(!props.mainName || !props.repoName) && 
        <div className="row-container">
          <div className="dashboard-item full-width">
            <Empty></Empty>
          </div>
        </div>
      }
    </div>
  );
}

export default DashboardContainer;
