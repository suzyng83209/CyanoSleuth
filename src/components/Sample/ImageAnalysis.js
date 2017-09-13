import React from "react";
import axios from "axios";
import Icon from "antd/lib/icon";
import Button from "antd/lib/button";
import styled from "styled-components";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

const NITROGEN = "Nitrogen data";
const PHOSPHORUS = "Phosphorus data";
const BLOOM = "Bloom data";

const Container = styled.div``;

const ImageUpload = styled.div`
  height: 50%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 2em !important;
  background: lightgrey;
  cursor: pointer;
  color: white;
  &:active {
    background: grey;
  }
`;

const Placeholder = ImageUpload.extend`
  background: white;
  cursor: default;
  color: lightgrey;
  &:active {
    background: white;
  }
`;

const ImagePreview = styled.div`
  height: 128px;
  width: 128px;
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
  font-size: 1em;
  text-transform: uppercase;
  font-family: "Expletus Sans";
  color: ${props => (props.active ? "#39c2b2" : "#565656")};
`;

const imageStyles = {
  width: "100%",
  height: "100%",
  display: "flex",
  textAlign: "center",
  alignItems: "center"
};

const cropperStyles = {
  width: "100%",
  height: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
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

const ImagePreviewContainer = ({ disable, children }) => {
  return (
    !disable && (
      <div
        style={{
          height: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around"
        }}
      >
        {children}
      </div>
    )
  );
};

export default class ImageAnalysis extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      active: null,
      [BLOOM]: null,
      [NITROGEN]: null,
      [PHOSPHORUS]: null
    };
  }

  crop = () => {
    this.setState({
      [this.state.active]: this.cropper.getCroppedCanvas().toDataURL()
    });
    this.props.setImgData([
      this.state[NITROGEN],
      this.state[PHOSPHORUS],
      this.state[BLOOM]
    ]);
  };

  componentDidMount = () => {
    this.props.setImgData([
      this.state[NITROGEN],
      this.state[PHOSPHORUS],
      this.state[BLOOM]
    ]);
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

  render() {
    const { active, preview, file } = this.state;
    return (
      <div style={{ height: "100%" }}>
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
          <div>
            <ImageUpload onClick={this.loadImage}>
              <div style={{ margin: "2em 0 0.5em" }}>Upload an Image</div>
              <Icon type="upload" />
            </ImageUpload>
            <Placeholder>
              <Icon type="api" />
              <div style={{ margin: "0.5em 0 2em" }}>Analyse the Data</div>
            </Placeholder>
          </div>
        )}
        <ImagePreviewContainer disable={!preview}>
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
        </ImagePreviewContainer>
      </div>
    );
  }
}
