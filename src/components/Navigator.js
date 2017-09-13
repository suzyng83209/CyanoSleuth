import React from "react";
import Sidebar from "react-sidebar";
import styled from "styled-components";
import Icon from "antd/lib/icon";
import { Link } from "react-router";
import { auth } from "../../src/firebase";
import config from "../../src/server/config";

const mql = window.matchMedia(`(min-width: 800px)`);

const SidebarContainer = styled.div`
  width: 60vw;
  max-width: 360px;
`;

const UserContainer = styled.div`
  background: #39c2b2;
  height: 20vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 16px;
  img {
    height: 75%;
    border-radius: 50%;
    border: 4px solid teal;
  }
  div {
    width: 50%;
  }
`;

const UserInfo = styled.div`
  * {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
`;

const ListItem = styled.div`
  padding: 24px;
  color: grey;
  font-size: 1.5em;
  border-bottom: 2px solid lightgrey;
  text-transform: capitalize;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  &:hover,
  &:active {
    background: rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }
`;

const Logo = styled.img`
  position: absolute;
  margin: 16px auto;
  bottom: 0;
  right: 0;
  left: 0;
  width: ${props => (props.size ? props.size : "4em")};
`;

class Navigator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mql: mql,
      docked: props.docked,
      open: props.open,
      longitude: null,
      latitude: null,
      user: null
    };
  }

  onSetSidebarOpen = open => {
    this.setState({ sidebarOpen: open });
  };

  componentWillMount = () => {
    mql.addListener(this.mediaQueryChanged);
    this.setState({ mql: mql, sidebarDocked: mql.matches });
  };

  componentDidMount = () => {
    auth.onAuthStateChanged(user => {
      this.setState({ user });
    });
  };

  componentWillUnmount = () => {
    this.state.mql.removeListener(this.mediaQueryChanged);
  };

  mediaQueryChanged = () => {
    this.setState({ sidebarDocked: this.state.mql.matches });
  };

  renderSidebarContent = () => (
    <SidebarContainer>
      <UserContainer>
        <img src={this.state.user.photoURL} alt="User" />
        <UserInfo>
          <h1>{this.state.user.displayName}</h1>
          <p style={{ margin: "4px 0 8px" }}>
            <Icon type="mail" style={{ marginRight: "4px" }} />
            {this.state.user.email}
          </p>
          <h3>Citizen Scientist</h3>
        </UserInfo>
      </UserContainer>
      <ListItem>
        <p>Purchase more test kits</p>
        <Icon type="right" />
      </ListItem>
      <ListItem>
        <p>Provide Feedback</p>
        <Icon type="right" />
      </ListItem>
      <Link to="/home">
        <Logo
          src="public/assets/images/full-logo.png"
          alt="CyanoSleuth"
          size="50%"
        />
      </Link>
    </SidebarContainer>
  );

  render = () => {
    const { sidebarOpen, sidebarDocked, user } = this.state;

    return (
      <Sidebar
        sidebar={user ? this.renderSidebarContent() : " "}
        open={sidebarOpen}
        docked={sidebarDocked}
        onSetOpen={this.onSetSidebarOpen}
      >
        {this.props.children}
      </Sidebar>
    );
  };
}

export default Navigator;
