import React from "react";
import {
  Router,
  Route,
  IndexRedirect,
  IndexRoute,
  browserHistory
} from "react-router";

import AppContainer from './components/AppContainer';
import AuthPage from './components/AuthPage';

export default class App extends React.Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={AppContainer}>
          <IndexRedirect to="/home" />
          <Route path="home" component={AuthPage} />
          <Route path="login" component={AuthPage} />
        </Route>
      </Router>
    );
  }
}
