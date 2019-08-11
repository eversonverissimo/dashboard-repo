
## Dashboard Repo
### GithHub Repositories in Dashboards

This project aims to display a simple dashboard with information and statistics about a specific repository. For that to work, one should inform the name of the organization or user and then one of its repositories name. In order to keep it simple and performatic, only infou about the first 100 pull requests and issues were recovered.

This project displays four blocks:

1. Average Merge Time by Pull Request Size
It shows how long it took for developers to merge pull requests. Pull requests are also categorized as small (if it has less than 100 modifications, among line additions and deletions), medium (if it has between 100 and 1000 modifications) and large otherwise. Also it shows in a tooltip how many pull requests were labeled in each category.

2. Average Pull Request Merge Time
It presents how long a pull request remained opened until merged, in average. Closed and still opened pull requests are not considered.

3. Average Issue Close Time
It presents how long an issue remained opened until closed, in average.

4. Month Summary
It displays for the last month (a month ago up to now) how many pull requests or issues were opened, closed or, in the case of pull requests, merged per day. One can see in a tooltip that information per day.

## Get started
Et voilá! Let's get started!

### `npm install`
Once you clone or download this project, in the project directory, you can run this command to install dependencies of the project. Not so many, so don't worry that much!

### `npm start`
And open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`
Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
