import React from "react";
import styled from "styled-components";

const status = {
  safe: "Safe to Swim",
  caution: "Caution",
  danger: "No Swimming Advised"
};

const StatusCircle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 360px;
  width: 360px;
  border-radius: 50%;
  text-transform: uppercase;
  font-family: "expletus sans";
  font-weight: 300;
  padding: 0.5em;
  text-align: center;
  border: 8px solid
    ${props =>
      props.status === status.safe
        ? "#39c2b2"
        : props.status === status.caution ? "#FFED91" : "#FF5350"};
  font-size: 4em;
  color: ${props =>
    props.status === status.safe
      ? "#39c2b2"
      : props.status === status.caution ? "#FFED91" : "#FF5350"};
  margin: 1em;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justy-content: space-around;
  align-items: center;
  @media screen and (min-width: 800px) {
    flex-direction: row;
  }
`;

const Placeholder = styled.div`
  background: white;
  margin: 4px;
  height: 16px;
  width: 16px;
`;

const HealthBarWrapper = styled.div`
  width: 100%;
  margin: 0 1em;
  padding: 0.5em;
  font-size: ${props => (props.primary ? "2em !important" : "1.5em")}
  display: "flex";
  flex-direction: row;
  justify-content: space-between;
  border-top: 2px solid lightgrey;
  border-bottom: ${props => (props.primary ? "2px solid lightgrey" : "none")};
`;

const MAX_LEVEL = 5;

const Status = ({ toxinLevel }) => {
  if (toxinLevel < 2) {
    return <StatusCircle status={status.safe}>{status.safe}</StatusCircle>;
  } else if (toxinLevel > 3) {
    return <StatusCircle status={status.danger}>{status.danger}</StatusCircle>;
  }
  return <StatusCircle status={status.caution}>{status.caution}</StatusCircle>;
};

const emptyArray = [{}, {}, {}, {}, {}];

const HealthBar = ({ test, level, message, primary }) => {
  return (
    <HealthBarWrapper primary={primary}>
      <span>{test}</span>
      <span style={{ float: "right" }}>
        {message ? (
          message
        ) : (
          emptyArray.map((_, i) => {
            if (i < level)
              return (
                <img
                  src="public/assets/images/logo-blk.png"
                  height="16px"
                  width="16px"
                  alt="*"
                />
              );
          })
        )}
      </span>
    </HealthBarWrapper>
  );
};

export default class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: props.loading,
      bloomRisk: props.bloomRisk,
      toxinLevel: props.toxinLevel,
      algaeLevel: props.algaeLevel,
      nitrogenLevel: props.nitrogenLevel,
      phosphorusLevel: props.phosphorusLevel
    };
  }

  componentDidUpdate = prevProps => {
    if (!prevProps.loading) {
      this.setState({ loading: false });
    }
  };

  render = () => {
    const {
      bloomRisk,
      toxinLevel,
      algaeLevel,
      nitrogenLevel,
      phosphorusLevel
    } = this.state;
    if (this.state.loading)
      return (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          Loading...
        </div>
      );
    return (
      <Container>
        <div style={{ display: "50%" }}>
          <Status toxinLevel={toxinLevel} />
          <HealthBar test={<h3>Bloom Risk</h3>} level={bloomRisk} primary />
        </div>
        <div style={{ display: "flex", flexDirection: "column", width: "50%" }}>
          <h2 style={{ padding: "0.5em" }}>Results Summary</h2>
          <HealthBar
            test={"Toxins"}
            level={toxinLevel}
            message={"no toxins detected!"}
          />
          <HealthBar test={"Algae Presense"} level={algaeLevel} />
          <HealthBar test={"Total Nitrogen"} level={nitrogenLevel} />
          <HealthBar test={"Total Phosphorus"} level={phosphorusLevel} />
        </div>
      </Container>
    );
  };
}
