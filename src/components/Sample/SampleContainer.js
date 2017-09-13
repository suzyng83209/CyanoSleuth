import React from "react";
import Col from "antd/lib/col";
import Row from "antd/lib/row";
import Button from "antd/lib/button";
import styled from "styled-components";
import { Link } from "react-router";
import ProgressIndicator from "./ProgressIndicator";

const Subtitle = styled.h3`
  border-top: 1px solid #dddddd;
  margin: 0 10%;
  padding: 8px 12px 0;
  color: #565656;
  font-size: 1.2em;
`;

const Title = styled.h1`
  margin: 0 10%;
  padding: 0 12px 8px;
  color: #39c2b2;
  font-weight: 300;
  font-size: 2.4em;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  padding: 2em;
  z-index: 8;
  box-shadow: 0 -4px 6px rgba(0, 0, 0, 0.1);
`;

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const progressTitles = ["Take Sample", "Scan Sample", "Test Results"];

class SampleContainer extends React.Component {
  render = () => {
    const { step, increase, decrease, hasData, children } = this.props;
    return (
      <Container>
        <div style={{ boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", zIndex: "8" }}>
          <ProgressIndicator progress={step} />
          <Subtitle>Step {step + 1}</Subtitle>
          <Title>{progressTitles[step]}</Title>
        </div>
        <div style={{ overflow: "scroll", height: "100%" }}>
          {React.Children.map(children, (child, index) => {
            if (index === step) return React.cloneElement(child);
          })}
        </div>
        <ButtonWrapper>
          <Col span={12}>
            {step > 0 ? (
              <Button size="large" onClick={decrease}>
                Back
              </Button>
            ) : (
              <Link to="home">
                <Button size="large">Back</Button>
              </Link>
            )}
          </Col>
          <Col span={12}>
            {step < 2 ? (
              <Button
                size="large"
                type="primary"
                onClick={increase}
                disabled={step === 1 && !hasData}
              >
                Next
              </Button>
            ) : (
              <Link to="home">
                <Button size="large" type="primary">
                  Finish
                </Button>
              </Link>
            )}
          </Col>
        </ButtonWrapper>
      </Container>
    );
  };
}

export default SampleContainer;
