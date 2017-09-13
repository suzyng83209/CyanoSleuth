import React from "react";
import axios from "axios";
import moment from "moment";
import SampleContainer from "./SampleContainer";
import Instructions from "./Instructions";
import ImageAnalysis from "./ImageAnalysis";
import Results from "./Results";
import { db, auth } from "../../firebase";

export default class SampleComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0,
      imgData: [], // nitrate60s, nitrate30s, phosphate, bloom
      colorData: [],
      saved: false
    };
  }

  saveToDatabase = () => {
    auth.onAuthStateChanged(user => {
      if (user) {
        const { colorData } = this.state;
        const { query } = this.props.location;
        const now = moment();
        var updates = {};
        updates["water-data/user/" + user.uid] = {
          date: now,
          uid: user.uid,
          email: user.email,
          nitrate60s: colorData[0],
          nitrate30s: colorData[1],
          phosphate: colorData[2],
          bloom: null,
          coordinates: [query.lat, query.lng]
        };
        db.ref("water-data/user/" + user.uid).update(updates);
      } else {
        alert(
          "Your session has ended. Please log in again and re-submit your data."
        );
      }
    });
  };

  submit = () => {
    axios
      .post("/api/upload", {
        imgData: this.state.imgData
      })
      .then(response => {
        console.log(response.data);
        this.setState({ colorData: response.data });
        this.saveToDatabase();
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
      <Results
        loading={!this.state.saved}
        bloomRisk={0}
        toxinLevel={0}
        algaeLevel={null}
        nitrogenLevel={this.state.colorData.length && this.state.colorData[0]}
        phosphorusLevel={this.state.colorData.length && this.state.colorData[2]}
      />
    </SampleContainer>
  );
}
