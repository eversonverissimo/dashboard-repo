
import gql from "graphql-tag";

export const AVG_MERGE_TIME_BY_PR_SIZE = gql`
    query GetAvgPRMergeTime($name:String! $repo:String!) {
        repository(owner:$name, name:$repo) {
            pullRequests(first:20) {
                edges {
                    node {
                        url
                        title
                        createdAt
                        closedAt
                        commits(first:20) {
                            edges {
                                node {
                                    commit  {
                                        additions
                                        deletions
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;

export const AVG_PR_MERGE_TIME = gql`
    query GetAvgPRMergeTime($name:String! $repo:String!) {
        repository(owner:$name, name:$repo) {
            pullRequests(first:20) {
                edges {
                    node {
                        url
                        title
                        createdAt
                        closedAt
                        mergedAt
                    }
                }
            }
        }
    }
`;

export const AVG_PR_MERGED_OPENED_BY_DAY = gql`
    query GetAvgPRMergeTime($name:String! $repo:String!) {
        repository(owner:$name, name:$repo) {
            pullRequests(first:20) {
                edges {
                    node {
                        url
                        title
                        createdAt
                        closedAt
                        mergedAt
                    }
                }
            }
        }
    }
`;

export const AVG_ISSUE_CLOSE_TIME = gql`
    query GetAvgIssueCloseTime($name:String! $repo:String!) {
        repository(owner:$name, name:$repo) {
            issues(first: 100, states: CLOSED){
                edges {
                    node {
                        title
                        url
                        createdAt
                        closedAt
                    }
                }
            }
        }
    }
`;
