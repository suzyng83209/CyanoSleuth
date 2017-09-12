import React from "react";
import Spin from "antd/lib/spin";
import Button from "antd/lib/button";
import { Link } from "react-router";
import Spinner from "react-spinkit";
import styled from "styled-components";
import { StaticMap, Marker } from "react-map-gl";

const accessToken =
  "pk.eyJ1Ijoic3V6eW5nODMyMDkiLCJhIjoiY2o3NzFjdmR6MTM5aTMzcDNoZWpiaDZqNSJ9.we3yNhQ6vDhcFuSpVoWNmA";

const Icon = styled.img`
  height: 48px;
  width: 48px;
  padding: 8px;
  border-radius: 50%;
  background: radial-gradient(white, white, transparent, transparent);
  transition: all 200ms;
  &:hover {
    height: 64px;
    width: 64px;
  }
`;

const IconWrapper = styled.div`
  height: 64px;
  width: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

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

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: props.latitude || 42.886447,
      longitude: props.longitude || -78.878369,
      zoom: 15,
      bearing: 0,
      pitch: 0,
      width: props.width || window.innerWidth,
      height: props.width || window.innerHeight,
      loading: true
    };
  }

  resize = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  };

  componentDidMount = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        console.log(coords);
        this.setState({
          latitude: coords.latitude,
          longitude: coords.longitude,
          loading: false
        });
      });
    }
    window.addEventListener("resize", this.resize);
  };

  componentWillMount = () => {
    this.resize();
  };

  componentWillUnmount = () => {
    window.removeEventListener("resize", this.resize);
  };

  render() {
    const { loading, latitude, longitude } = this.state;
    return (
      <div>
        <Spin size="large" spinning={loading}>
          <StaticMap
            {...this.state}
            mapboxApiAccessToken={accessToken}
            mapStyle="mapbox://styles/mapbox/streets-v9"
          >
            {!loading && (
              <Marker latitude={latitude} longitude={longitude}>
                <IconWrapper>
                  <Icon
                    src="public/assets/images/logo-cyano.png"
                    alt="You are here"
                  />
                </IconWrapper>
              </Marker>
            )}
          </StaticMap>
        </Spin>
        <Description>
          <StatusContainer>
            <h2 style={{ textAlign: "left" }}>Current Status</h2>
            <Status>Safe to Swim</Status>
            <div style={{ fontSize: "16px" }}>Last tested x hours ago</div>
          </StatusContainer>
          <Link to={`/sample?lat=${latitude}&lng=${longitude}`}>
            <Button type="primary" size="large" style={{ width: "100%" }}>
              Test the Water
            </Button>
          </Link>
        </Description>
      </div>
    );
  }
}

export default Map;
