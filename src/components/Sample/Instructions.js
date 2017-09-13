import React from "react";
import styled from "styled-components";
import Icon from "antd/lib/icon";
import {
  List,
  ListItem,
  ListDivider,
  ListSubHeader
} from "react-toolbox/lib/list";

const ListContainer = styled.div`
  height: 100%;
  width: 50%;
  & ul {
    display: flex !important;
    height: 100% !important;
    flex-direction: column;
    justify-content: space-evenly;
    padding-right: 3em;
    margin-left: 16px;
  }
`;

const Example = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

export default () => (
  <div style={{ display: "flex" }}>
    <ListContainer>
      <List>
        <ListSubHeader caption="Hardware How-to" />
        <ListItem
          leftIcon={<div>1.</div>}
          caption="Sample Water"
          legend="Take sample of water using syringe provided"
        />
        <ListItem
          leftIcon={<div>2.</div>}
          caption="Test Water"
          legend="Connect syringe onto disposable kit and push to release all water in
        syringe"
        />
        <ListItem
          leftIcon={<div>3.</div>}
          caption={
            <div>
              Wait 20 minutes&nbsp;<Icon type="clock-circle-o" />
            </div>
          }
          legend=" "
        />
        <ListItem
          leftIcon={<div>4.</div>}
          caption="Position Scanner and Phone"
          legend="load disposable kit into scan tool and place phone over port"
        />
        <ListItem
          leftIcon={<div>6.</div>}
          caption="Take Picture"
          legend="Take picture of the results of the tests."
        />
      </List>
    </ListContainer>
    <div style={{ height: "100%", width: "50%", overflow: "hidden" }}>
      <Example src="public/assets/images/hardware-1.jpeg" alt="hardware" />
    </div>
  </div>
);
