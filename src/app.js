import React from "react";
import {
  Router,
  Route,
  IndexRedirect,
  IndexRoute,
  browserHistory
} from "react-router";
// import ThemeProvider from "react-toolbox/lib/ThemeProvider";
// import theme from "./styles/react-toolbox/theme";
// import "./styles/react-toolbox/theme.css";

import AppContainer from "./components/AppContainer";
import AuthPage from "./components/Auth/AuthPage";

import './styles/app.scss'

export default class App extends React.Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={AppContainer}>
          <IndexRedirect to="/home" />
          <Route path="home" component={AuthPage} />
          <Route path="login" component={AuthPage} />
          <Route path="sign-up" component={AuthPage} />
        </Route>
      </Router>
    );
  }
}
