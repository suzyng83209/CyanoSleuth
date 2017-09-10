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

import Navigator from "./components/Navigator";
import AuthPage from "./components/Auth/AuthPage";
import Home from './components/Home';

import './styles/app.scss'

export default class App extends React.Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={Navigator}>
          <IndexRedirect to="/home" />
          <Route path="home" component={Home} />
          <Route path="login" component={AuthPage} />
          <Route path="sign-up" component={AuthPage} />
        </Route>
      </Router>
    );
  }
}
