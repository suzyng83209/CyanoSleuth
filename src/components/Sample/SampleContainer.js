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
  padding: 12px;
  padding-bottom: 0;
  color: #565656;
  font-size: 1.5em;
`;

const Title = styled.h1`
  margin: 0 10%;
  padding: 0 12px 16px;
  color: #39c2b2;
  font-weight: 300;
  font-size: 3em;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  padding: 4em;
  z-index: 8;
  box-shadow: 0 -6px 8px rgba(0, 0, 0, 0.2);
`;

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const progressTitles = ["Take Sample", "Scan Sample", "Test Results"];

class SampleContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0
    };
  }

  increaseStep = () => {
    this.setState({ step: this.state.step + 1 });
  };

  decreaseStep = () => {
    this.setState({ step: this.state.step - 1 });
  };

  render = () => {
    const { step } = this.state;
    return (
      <Container>
        <div style={{ boxShadow: "0 6px 8px rgba(0, 0, 0, 0.2)", zIndex: "8" }}>
          <ProgressIndicator progress={step} />
          <Subtitle>Step {step + 1}</Subtitle>
          <Title>{progressTitles[step]}</Title>
        </div>
        <div style={{ overflow: "hidden" }}>
          {React.Children.map(this.props.children, (child, index) => {
            if (index === step) return React.cloneElement(child);
          })}
        </div>
        <ButtonWrapper>
          <Col span={12}>
            {step > 0 && (
              <Button size="large" onClick={this.decreaseStep}>
                Back
              </Button>
            )}
          </Col>
          <Col span={12}>
            {step < 2 ? (
              <Button size="large" type="primary" onClick={this.increaseStep}>
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
