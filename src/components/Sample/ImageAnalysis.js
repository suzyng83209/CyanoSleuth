import React from "react";
import axios from 'axios';
import styled from "styled-components";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css"; // see installation section above for versions of NPM older than 3.0.0
// If you choose not to use import, you need to assign Cropper to default
// var Cropper = require('react-cropper').default

const NITROGEN = "Nitrogen data";
const PHOSPHORUS = "Phosphorus data";
const BLOOM = "Bloom data";

const ImageUpload = styled.div`
  height: 50%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: lightgrey;
  cursor: pointer;
  font-size: 2em;
  color: white;
  &:active {
    background: grey;
  }
`;

const ImagePreview = styled.div`
  height: 160px;
  width: 160px;
  color: ${props => (props.disable ? "grey" : "#565656")};
  cursor: ${props => (props.disable ? "not-allowed" : "pointer")};
  border: 4px solid ${props => (props.active ? "#39c2b2" : "lightgrey")};
  border-radius: 8px;
  padding: 16px;
  margin: 16px;
  &:hover,
  &:active {
    border: 4px solid
      ${props =>
        props.disable ? "lightgrey" : props.active ? "#39c2b2" : "#42e2d0"};
  }
  &:active {
    background: ${props =>
      props.disable ? "#dddddd" : "rgba(57, 194, 178, 0.5)"};
  }
`;

const Label = styled.div`
  position: relative;
  text-align: center;
  top: 30%;
  font-size: 1.2em;
  text-transform: uppercase;
  font-family: "Expletus Sans";
  color: ${props => (props.active ? "#39c2b2" : "#565656")};
`;

const imageStyles = {
  height: "100%",
  width: "100%",
  textAlign: "center",
  display: "flex",
  alignItems: "center"
};

const ImageCrop = ({ srcUrl, name }) =>
  srcUrl ? (
    <img
      src={`${srcUrl}`}
      alt={`Click to select ${name} test area`}
      style={imageStyles}
    />
  ) : (
    <div style={imageStyles}>Click to select {name} test area</div>
  );

export default class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      src: null,
      file: null,
      [BLOOM]: null,
      [NITROGEN]: null,
      [PHOSPHORUS]: null,
      active: NITROGEN
    };
  }

  crop = () => {
    this.setState({
      [this.state.active]: this.cropper.getCroppedCanvas().toDataURL()
    });
  };

  handleInputChange = e => {
    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onload = () => {
      this.setState({ file, preview: reader.result });
    };

    reader.readAsDataURL(file);
  };

  handleButtonFocus = name => {
    if (this.state.active === name) {
      this.setState({ active: null });
    } else {
      this.setState({ active: name });
    }
  };

  handleButtonBlur = () => {
    this.cropper.clear();
  };

  loadImage = e => {
    e.preventDefault();
    this.input.click();
  };

  submit = () => {
    axios.post('/api/upload', {
      firstName: 'Fred',
      lastName: 'Flintstone'
    })
    .then(function (response) {
      console.log(response);
    })
  }

  render() {
    const { active, preview } = this.state;
    const cropperStyles = {
      height: "50%",
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    };
    return (
      <div>
        <input
          type="file"
          id="input"
          ref={r => (this.input = r)}
          onChange={this.handleInputChange}
          style={{ display: "none" }}
        />
        {preview ? (
          <Cropper
            src={preview}
            style={cropperStyles}
            ref={r => (this.cropper = r)}
            autoCrop={false}
            crop={this.crop}
            guide={false}
            aspectRatio={1}
            viewMode={3}
          />
        ) : (
          <ImageUpload onClick={this.loadImage}>
            Upload an Image and Isolate Your Results
          </ImageUpload>
        )}
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <ImagePreview
            active={active === NITROGEN}
            onBlur={this.handleButtonBlur}
            onClick={() => this.handleButtonFocus(NITROGEN)}
          >
            <ImageCrop srcUrl={this.state[NITROGEN]} name={NITROGEN} />
            <Label active={active === NITROGEN}>Nitrogen</Label>
          </ImagePreview>
          <ImagePreview
            active={active === PHOSPHORUS}
            onBlur={this.handleButtonBlur}
            onClick={() => this.handleButtonFocus(PHOSPHORUS)}
          >
            <ImageCrop srcUrl={this.state[PHOSPHORUS]} name={PHOSPHORUS} />
            <Label active={active === PHOSPHORUS}>Phosphorus</Label>
          </ImagePreview>
          <ImagePreview
            disable={true}
            onBlur={this.handleButtonBlur}
            onClick={() => this.handleButtonFocus(BLOOM)}
          >
            <ImageCrop srcUrl={this.state[BLOOM]} name={BLOOM} />
            <Label active={active === BLOOM}>Algal Bloom</Label>
          </ImagePreview>
        </div>
        <div onClick={this.submit}>test submit</div>
      </div>
    );
  }
}
