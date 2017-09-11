import React from "react";
import styled from "styled-components";

const Polygon = styled.div`
  position: relative;
  height: 1em;
  width: 20%;
  margin: 1.5em;
  background: ${props => (props.progress >= 1 ? "#39c2b2" : "lightgrey")};
`;

const PolygonLeft = Polygon.extend`
  background: ${props => (props.progress >= 0 ? "#39c2b2" : "lightgrey")};
  &:before {
    position: absolute;
    content: "";
    right: -25px;
    height: 1em;
    width: 50px;
    background: ${props => (props.progress >= 0 ? "#39c2b2" : "lightgrey")};
    transform: skew(-30deg);
  }
`;

const PolygonRight = Polygon.extend`
  background: ${props => (props.progress >= 2 ? "#39c2b2" : "lightgrey")};
  &:before {
    position: absolute;
    content: "";
    left: -25px;
    height: 1em;
    width: 50px;
    background: ${props => (props.progress >= 2 ? "#39c2b2" : "lightgrey")};
    transform: skew(-30deg);
  }
`;

const PolygonMid = Polygon.extend`
  width: 25%;
  transform: skew(-30deg);
`;

export default ({ progress }) => (
  <div style={{ display: "flex", justifyContent: "center" }}>
    <PolygonLeft progress={progress} />
    <PolygonMid progress={progress} />
    <PolygonRight progress={progress} />
  </div>
);
