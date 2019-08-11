import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import DashboardApp from '../DashboardApp';
import DashboardContainer from '../DashboardContainer';
import { AvgIssueCloseTime, AvgMergeTimeByPullRequestSize, AvgPullRequestMergeTime, MonthSummary } from '../RepoCharts';
import { DashboardDataProcessor } from '../DashboardContainer/DashboardDataProcessor';

it('App renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('DashboardApp renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<DashboardApp />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('DashboardContainer renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<DashboardContainer />, div);
  ReactDOM.unmountComponentAtNode(div);
});

/* Test render charts */
it('AvgIssueCloseTime renders without crashing', () => {

  const div = document.createElement('div');
  ReactDOM.render(<AvgIssueCloseTime issues={issuesInfo} />, div);
  ReactDOM.unmountComponentAtNode(div);
  
  var issues = {
    "edges":[
      {"node":{"createdAt":"2019-08-06T01:21:46Z","closedAt":"2019-08-06T06:56:59Z","closed":true,"__typename":"Issue"},"__typename":"IssueEdge"},
      {"node":{"createdAt":"2019-08-08T19:40:16Z","closedAt":"2019-08-09T10:01:18Z","closed":true,"__typename":"Issue"},"__typename":"IssueEdge"},
      {"node":{"createdAt":"2019-08-08T19:44:17Z","closedAt":"2019-08-09T10:01:26Z","closed":true,"__typename":"Issue"},"__typename":"IssueEdge"},
      {"node":{"createdAt":"2019-08-11T06:15:07Z","closedAt":"2019-08-11T06:21:41Z","closed":true,"__typename":"Issue"},"__typename":"IssueEdge"},
      {"node":{"createdAt":"2019-08-11T09:34:25Z","closedAt":"2019-08-11T13:57:59Z","closed":true,"__typename":"Issue"},"__typename":"IssueEdge"},
      {"node":{"createdAt":"2019-08-11T11:42:57Z","closedAt":"2019-08-11T12:51:17Z","closed":true,"__typename":"Issue"},"__typename":"IssueEdge"}
    ],
    "__typename":"IssueConnection"
  };
  
  var issuesInfo = DashboardDataProcessor.getIssueInfo(issues);
  ReactDOM.render(<AvgIssueCloseTime issues={issuesInfo} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('AvgMergeTimeByPullRequestSize renders without crashing', () => {
  
  const div = document.createElement('div');
  ReactDOM.render(<AvgMergeTimeByPullRequestSize {...prInfo} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('AvgPullRequestMergeTime renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AvgPullRequestMergeTime {...prInfo} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('MonthSummary renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MonthSummary {...prInfo} {...issuesInfo} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

const pullRequests = {
  "edges":[
    {"node":{"createdAt":"2019-07-04T20:17:42Z","closedAt":"2019-07-06T10:59:30Z","mergedAt":"2019-07-06T10:59:30Z","merged":true,"closed":true,
    "commits":{"edges":[{"node":{"commit":{"additions":23,"deletions":10}}}]}}},
    {"node":{"createdAt":"2019-07-06T11:01:02Z","closedAt":"2019-07-06T11:33:35Z","mergedAt":"2019-07-06T11:33:35Z","merged":true,"closed":true,
    "commits":{"edges":[{"node":{"commit":{"additions":3,"deletions":3}}}]}}},
    {"node":{"createdAt":"2019-07-11T01:39:12Z","closedAt":"2019-07-12T16:12:49Z","mergedAt":null,"merged":false,"closed":true,
    "commits":{"edges":[{"node":{"commit":{"additions":6,"deletions":11}}}]}}},
    {"node":{"createdAt":"2019-07-11T15:19:36Z","closedAt":"2019-07-12T16:12:13Z","mergedAt":null,"merged":false,"closed":true,
    "commits":{"edges":[{"node":{"commit":{"additions":13,"deletions":18}}}]}}},
    {"node":{"createdAt":"2019-08-10T09:23:40Z","closedAt":"2019-08-10T11:36:10Z","mergedAt":"2019-08-10T11:36:10Z","merged":true,"closed":true,
    "commits":{"edges":[{"node":{"commit":{"additions":21,"deletions":1}}},{"node":{"commit":{"additions":176,"deletions":51}}},{"node":{"commit":{"additions":41,"deletions":4}}},{"node":{"commit":{"additions":124,"deletions":69}}}]}}},
    {"node":{"createdAt":"2019-08-11T12:29:29Z","closedAt":null,"mergedAt":null,"merged":false,"closed":false,
    "commits":{"edges":[{"node":{"commit":{"additions":96,"deletions":525}}},{"node":{"commit":{"additions":56,"deletions":13}}},{"node":{"commit":{"additions":5,"deletions":1}}},{"node":{"commit":{"additions":6,"deletions":6}}},{"node":{"commit":{"additions":15,"deletions":10}}},{"node":{"commit":{"additions":80,"deletions":17}}}]}}},
    {"node":{"createdAt":"2019-08-11T15:04:43Z","closedAt":"2019-08-10T15:50:40Z","mergedAt":"2019-08-11T15:50:40Z","merged":true,"closed":true,
    "commits":{"edges":[{"node":{"commit":{"additions":466,"deletions":160}}},{"node":{"commit":{"additions":132,"deletions":127}}},{"node":{"commit":{"additions":119,"deletions":21}}}]}}},
    {"node":{"createdAt":"2019-08-11T15:23:16Z","closedAt":null,"mergedAt":null,"merged":false,"closed":false,
    "commits":{"edges":[{"node":{"commit":{"additions":86,"deletions":13}}}]}}},
    {"node":{"createdAt":"2019-08-11T16:58:11Z","closedAt":"2019-08-10T18:06:08Z","mergedAt":null,"merged":false,"closed":true,
    "commits":{"edges":[{"node":{"commit":{"additions":27,"deletions":25}}},{"node":{"commit":{"additions":119,"deletions":21}}}]}}}]
}

const issues = {
  "edges":[
    {"node":{"createdAt":"2019-08-06T01:21:46Z","closedAt":"2019-08-06T06:56:59Z","closed":true}},
    {"node":{"createdAt":"2019-08-08T19:40:16Z","closedAt":"2019-08-09T10:01:18Z","closed":true}},
    {"node":{"createdAt":"2019-08-08T19:44:17Z","closedAt":"2019-08-09T10:01:26Z","closed":true}},
    {"node":{"createdAt":"2019-08-11T06:15:07Z","closedAt":"2019-08-11T06:21:41Z","closed":true}},
    {"node":{"createdAt":"2019-08-11T09:34:25Z","closedAt":"2019-08-11T13:57:59Z","closed":true}},
    {"node":{"createdAt":"2019-08-11T11:42:57Z","closedAt":"2019-08-11T12:51:17Z","closed":true}}
  ]
};

const startDate = new Date('Jul 12 2019'), endDate = new Date('Aug 12 2019');
const issuesInfo = DashboardDataProcessor.getIssueInfo(issues, startDate, endDate);
const prInfo = DashboardDataProcessor.getPullRequestInfo(pullRequests, startDate, endDate);