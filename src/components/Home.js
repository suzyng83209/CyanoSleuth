import React from "react";
import Button from "antd/lib/button";
import styled from "styled-components";

import Map from "./Map";

const Description = styled.div`
  height: 35vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  background: white;
  position: absolute;
  padding: 4em 2em;
  bottom: 0;
  right: 0;
  @media screen and (min-width: 800px) {
    background: transparent;
    flex-direction: row;
  }
  button {
	  width: 40%;
	  height: 100%;
	  padding: 1em;
	  font-size: 2em;
	  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
  }
`;

const StatusContainer = styled.div`
  background: white;
  color: #565656 !important;
  border-radius: 4px;
  padding: 1.5em;
  margin: 1em;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);  
`;

const Status = styled.h1`
  font-size: 3em;
  color: #39c2b2;
  display: flex;
  align-items: center;
  flex-direction: column;
  font-family: "Expletus Sans";
  text-transform: uppercase;
`;

class Home extends React.Component {
  render() {
    return (
      <div>
        <Map />
        <Description>
          <StatusContainer>
            <h2 style={{ textAlign: "left" }}>Current Status</h2>
            <Status>Safe to Swim</Status>
            <div style={{ fontSize: "16px" }}>Last tested x hours ago</div>
          </StatusContainer>
          <Button type="primary" size="large">
            Test the Water
          </Button>
        </Description>
      </div>
    );
  }
}

export default Home;
