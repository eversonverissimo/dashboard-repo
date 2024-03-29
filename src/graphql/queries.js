
import gql from "graphql-tag";

export const STATS_REPO_QUERY = gql`
  query GetAvgPRMergeTime($name:String! $repo:String!) {
    repository(owner:$name, name:$repo) {
      pullRequests(first:10) {
        edges {
          node {
            createdAt
            closedAt
            mergedAt
            merged
            closed
            commits(first:100) {
              edges {
                node {
                  commit {
                    additions
                    deletions
                  }
                }
              }
            }
          }
        }
      }
      issues(first: 100, states: CLOSED){
        edges {
          node {
            createdAt
            closedAt
            closed
          }
        }
      }
    }
  }
`;
