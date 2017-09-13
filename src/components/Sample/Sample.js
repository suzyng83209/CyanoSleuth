import React from "react";
import SampleContainer from "./SampleContainer";
import Instructions from "./Instructions";
import ImageAnalysis from "./ImageAnalysis";
import Results from "./Results";

export default class SampleComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0,
      imgData: [],
      bloomData: null,
      nitrogenData: null,
      phosphorusData: null
    };
  }

  submit = () => {
    const imgData = [
      this.state[NITROGEN],
      this.state[PHOSPHORUS],
      this.state[BLOOM]
    ];
    axios
      .post("/api/upload", { imgData: this.state.imgData })
      .then((response) => {
        console.log(response);
      });
  };

  increaseStep = () => {
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
