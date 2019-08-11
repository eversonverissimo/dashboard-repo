import { DashboardDataProcessor } from "../DashboardContainer/DashboardDataProcessor";

test('DashboardDataProcessor: get issue info with valid values', () => {

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
  expect(issuesInfo['avgIssueCloseTime']).toEqual('6h38m');
  expect(issuesInfo['countIssues']).toEqual(6);
  
});
  
test('DashboardDataProcessor: get issue info with deprecated issues', () => {
  
  const issues = {
    "edges":[
      {"node":{"createdAt":"2018-08-06T01:21:46Z","closedAt":"2019-08-06T06:56:59Z","closed":true}},
      {"node":{"createdAt":"2019-08-08T19:40:16Z","closedAt":"2019-08-09T10:01:18Z","closed":true}},
      {"node":{"createdAt":"2019-08-08T19:44:17Z","closedAt":"2019-08-09T10:01:26Z","closed":true}},
      {"node":{"createdAt":"2019-08-11T06:15:07Z","closedAt":"2019-08-11T06:21:41Z","closed":true}},
      {"node":{"createdAt":"2019-08-11T09:34:25Z","closedAt":"2019-08-11T13:57:59Z","closed":true}},
      {"node":{"createdAt":"2017-08-11T11:42:57Z","closedAt":"2017-08-11T12:51:17Z","closed":true}}
    ]
  };
  
  const startDate = new Date('Jul 12 2019'), endDate = new Date('Aug 12 2019');
  const issuesInfo = DashboardDataProcessor.getIssueInfo(issues, startDate, endDate);
  expect(issuesInfo['avgIssueCloseTime']).toEqual('61days 2h38m');
  expect(issuesInfo['countIssues']).toEqual(5);

});

test('DashboardDataProcessor: get issue info with no issues', () => {

  const issues = {"edges":[]};
  const startDate = new Date('Jul 12 2019'), endDate = new Date('Aug 12 2019');
  const issuesInfo = DashboardDataProcessor.getIssueInfo(issues, startDate, endDate);
  expect(issuesInfo['avgIssueCloseTime']).toEqual('0h0m');
  expect(issuesInfo['countIssues']).toEqual(0);
  
});

test('DashboardDataProcessor: get pull requests', () => {
  
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

  const startDate = new Date('Jul 12 2019'), endDate = new Date('Aug 12 2019');
  const prInfo = DashboardDataProcessor.getPullRequestInfo(pullRequests, startDate, endDate);
  
  // Pull requests statistics
  expect(prInfo['countPR']).toEqual(7);
  expect(prInfo['smallPR']['avgMergeTime']).toEqual(20);
  expect(prInfo['smallPR']['count']).toEqual(2);
  expect(prInfo['mediumPR']['avgMergeTime']).toEqual(2);
  expect(prInfo['mediumPR']['count']).toEqual(1);
  expect(prInfo['largePR']['avgMergeTime']).toEqual(1);
  expect(prInfo['largePR']['count']).toEqual(1);

  // Pull requests opened in specific days
  expect(prInfo['prOpenedPerDay'][0].day).toEqual("12 Jul");
  expect(prInfo['prOpenedPerDay'][0].value).toEqual(0);
  expect(prInfo['prOpenedPerDay'][29].day).toEqual("10 Aug");
  expect(prInfo['prOpenedPerDay'][29].value).toEqual(1);
  expect(prInfo['prOpenedPerDay'][30].day).toEqual("11 Aug");
  expect(prInfo['prOpenedPerDay'][30].value).toEqual(4);

  // Pull requests merged in specific days
  expect(prInfo['prMergedPerDay'][0].day).toEqual("12 Jul");
  expect(prInfo['prMergedPerDay'][0].value).toEqual(0);
  expect(prInfo['prMergedPerDay'][29].day).toEqual("10 Aug");
  expect(prInfo['prMergedPerDay'][29].value).toEqual(1);
  expect(prInfo['prMergedPerDay'][30].day).toEqual("11 Aug");
  expect(prInfo['prMergedPerDay'][30].value).toEqual(1);

  // Pull requests closed in specific days
  expect(prInfo['prClosedPerDay'][0].day).toEqual("12 Jul");
  expect(prInfo['prClosedPerDay'][0].value).toEqual(2);
  expect(prInfo['prClosedPerDay'][29].day).toEqual("10 Aug");
  expect(prInfo['prClosedPerDay'][29].value).toEqual(1);
  expect(prInfo['prClosedPerDay'][30].day).toEqual("11 Aug");
  expect(prInfo['prClosedPerDay'][30].value).toEqual(0);

});

test('DashboardDataProcessor: get pull requests with none', () => {

  const pullRequests = {"edges":[]};
  const startDate = new Date('Jul 12 2019'), endDate = new Date('Aug 12 2019');
  const prInfo = DashboardDataProcessor.getPullRequestInfo(pullRequests, startDate, endDate);
  
  // Pull requests statistics
  expect(prInfo['countPR']).toEqual(0);
  expect(prInfo['smallPR']['avgMergeTime']).toEqual(0);
  expect(prInfo['smallPR']['count']).toEqual(0);
  expect(prInfo['mediumPR']['avgMergeTime']).toEqual(0);
  expect(prInfo['mediumPR']['count']).toEqual(0);
  expect(prInfo['largePR']['avgMergeTime']).toEqual(0);
  expect(prInfo['largePR']['count']).toEqual(0);
});