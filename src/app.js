import React from "react";
import {
  Router,
  Route,
  IndexRedirect,
  IndexRoute,
  browserHistory
} from "react-router";
import { auth } from './firebase';

import Navigator from "./components/Navigator";
import AuthPage from "./components/Auth/AuthPage";
import Home from "./components/Home";

import Sample from './components/Sample/Sample';

import "./styles/app.scss";

const checkAuth = () => {
  auth.onAuthStateChanged(user => {
    if (!user) {
      browserHistory.push("/auth");
    }
  });
}

export default class App extends React.Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/auth" component={AuthPage} />
        <Route path="/" component={Navigator} onEnter={checkAuth}>
          <IndexRedirect to="/home" />
          <Route path="home" component={Home} />
          <Route path="sample" component={Sample} />
        </Route>
      </Router>
    );
  }
}
