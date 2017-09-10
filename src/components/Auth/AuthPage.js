import React from "react";
import isEmail from "validator/lib/isEmail";
import { browserHistory } from "react-router";
import Button from "antd/lib/button";
import { Input } from "react-toolbox/lib/input";
import { auth, ui, uiConfig } from "../../firebase";

import {
  Container,
  ErrorMessage,
  ModuleContainer,
  ButtonContainer,
  LogoContainer,
  AuthDivider,
  Subtitle,
  Title
} from "./styledAuthComponents";

const EMAIL_INVALID_MSG = "Please enter a valid email address.";

class AuthorizationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: true,
      email: "",
      password: "",
      authErrMsg: null,
      emailErrMsg: null
    };
  }

  componentDidMount = () => {
    ui.start("#firebaseui-auth", uiConfig);
    auth.onAuthStateChanged(user => {
      if (user) {
        browserHistory.push("/home");
      }
    });
  };

  componentWillUnmount = () => {
    ui.reset();
  };

  handleInputChange(name, value) {
    console.log(value, name);
    this.setState({ [name]: value });
  }

  login = () => {
    this.validateEmail();

    auth
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .catch(err => {
        this.setState({ authErrMsg: `${err.code}: ${err.message}` });
      });
  };

  signUp = () => {
    auth
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .catch(err => {
        this.setState({ authErrMsg: `${err.code}: ${err.message}` });
      });
  };

  validateEmail = () => {
    if (isEmail(this.state.email)) {
      return true;
    }
    this.setState({ emailErrMsg: EMAIL_INVALID_MSG });
    return false;
  };

  clearErrMsg = () => {
    this.setState({ authErrMsg: null, emailErrMsg: null });
  };

  render() {
    const { email, password, login, authErrMsg, emailErrMsg } = this.state;
    return (
      <Container>
        <LogoContainer>
          <Title>
            <span style={{ color: "#39C2B2" }}>Cyan</span>
            <img src="public/assets/images/cyano.png" alt="O" />Sleuth
          </Title>
          <Subtitle>Citizen Science for Lake Erie</Subtitle>
        </LogoContainer>
        <div id="firebaseui-auth" />
        <ModuleContainer
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "none"
          }}
        >
          <AuthDivider />
          <p style={{ margin: "8px", fontSize: "20px", color: "#dddddd" }}>
            or
          </p>
          <AuthDivider />
        </ModuleContainer>
        <ModuleContainer>
          <Input
            type="email"
            label="Email"
            value={email}
            error={emailErrMsg}
            onBlur={this.validateEmail}
            onFocus={this.clearErrMsg}
            onChange={this.handleInputChange.bind(this, "email")}
          />
          <Input
            type="password"
            label="Password"
            value={password}
            onChange={this.handleInputChange.bind(this, "password")}
          />
          <ErrorMessage>{this.state.authErrMsg || <p>&nbsp;</p>}</ErrorMessage>
          <ButtonContainer>
            <Button type="primary" size="large" onClick={this.login}>
              Login
            </Button>
            <Button size="large">Sign Up</Button>
          </ButtonContainer>
        </ModuleContainer>
      </Container>
    );
  }
}

export default AuthorizationPage;
