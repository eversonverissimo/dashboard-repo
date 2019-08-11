
import gql from "graphql-tag";

export const STATS_REPO_QUERY = gql`
    query GetAvgPRMergeTime($name:String! $repo:String! $prCursor:String $issueCursor:String) {
        repository(owner:$name, name:$repo) {
            pullRequests(first:100, after:$prCursor) {
                edges {
                    cursor
                    node {
                        title
                        url
                        createdAt
                        closedAt
                        mergedAt
                        merged
                        closed
                        commits(first:100) {
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
            issues(first: 100, states: CLOSED, after:$issueCursor){
                edges {
                    cursor
                    node {
                        title
                        url
                        createdAt
                        closedAt
                        closed
                    }
                }
            }
        }
    }
`;
