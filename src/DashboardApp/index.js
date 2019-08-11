import React, {useState} from 'react';
import './DashboardApp.css';
import DashboardContainer from '../DashboardContainer';
import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { setContext } from 'apollo-link-context';

const cache = new InMemoryCache();
const httpLink = new HttpLink({
 uri: 'https://api.github.com/graphql'
});
const authLink = setContext((_, { headers }) => {
  return {
   headers: {
    ...headers,
    authorization: "Bearer 7058906608b851a05d4eca1a10001879d533a43b",
   }
  }
});

const client = new ApolloClient({ link: authLink.concat(httpLink), cache });

const DashboardApp = () => {

  const [mainName, setMainName] = useState("eversonverissimo");
  const [repoName, setRepoName] = useState("empty-repo");

  return (
    <ApolloProvider client={client}>
      <div className="dashboard-wrapper">
        <div className="left-rectangle">
          <div className="shape"><img className="dashboard-logo" alt="Project Logo" src="/logo.png"/></div>
        </div>
        <div className="main-wrapper">
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
      </div>
    </ApolloProvider>
  );
}

export default DashboardApp;
