import React from "react";
import axios from "axios";
import SampleContainer from "./SampleContainer";
import Instructions from "./Instructions";
import ImageAnalysis from "./ImageAnalysis";
import Results from "./Results";

export default class SampleComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0,
      imgData: [],  // nitrate60s, nitrate30s, phosphate, bloom
      bloomData: null,
      phosphateData: null,
      nitrate30sData: null,
      nitrate60sData: null
    };
  }

  submit = () => {
    const { lat, lng } = this.props.location.query;
    axios
      .post("/api/upload", {
        imgData: this.state.imgData,
        coordinates: { lat, lng }
      })
      .then(response => {
        console.log(response);
      });
  };

  increaseStep = () => {
    if (this.state.step === 1) {
      this.submit();
    }
    this.setState({ step: this.state.step + 1 });
  };

  decreaseStep = () => {
    this.setState({ step: this.state.step - 1 });
  };

  setImgData = imgData => {
    this.setState({ imgData });
  };

  render = () => (
    <SampleContainer
      step={this.state.step}
      increase={this.increaseStep}
      decrease={this.decreaseStep}
      hasData={this.state.imgData.some(field => field !== null)}
    >
      <Instructions />
      <ImageAnalysis setImgData={this.setImgData} />
      <Results />
    </SampleContainer>
  );
}
