import React from "react";
import Spin from "antd/lib/spin";
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

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 42.886447,
      longitude: -78.878369,
      zoom: 15,
      bearing: 0,
      pitch: 0,
      width: window.innerWidth,
      height: window.innerHeight,
      loading: true
    };
  }

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
  };

  render() {
    const { loading, latitude, longitude } = this.state;
    return (
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
    );
  }
}

export default Map;
