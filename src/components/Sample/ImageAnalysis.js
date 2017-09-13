import React from "react";
import Icon from "antd/lib/icon";
import Button from "antd/lib/button";
import styled from "styled-components";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

const N60 = "60s nitrate";
const N30 = "30s nitrate";
const P = "phosphorus";
const B = "bloom";

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
      active: null,
      file: null,
      [B]: null,
      [P]: null,
      [N30]: null,
      [N60]: null
    };
  }

  crop = () => {
    this.setState({
      [this.state.active]: this.cropper.getCroppedCanvas().toDataURL()
    });
    this.props.setImgData([
      this.state[N60],
      this.state[N30],
      this.state[P],
      this.state[B]
    ]);
  };

  componentDidMount = () => {
    this.props.setImgData([null, null, null, null]);
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
            active={active === N60}
            onBlur={this.handleButtonBlur}
            onClick={() => this.handleButtonFocus(N60)}
          >
            <ImageCrop srcUrl={this.state[N60]} name={N60} />
            <Label active={active === N60}>60s Nitrate</Label>
          </ImagePreview>
          <ImagePreview
            active={active === N30}
            onBlur={this.handleButtonBlur}
            onClick={() => this.handleButtonFocus(N30)}
          >
            <ImageCrop srcUrl={this.state[N30]} name={N30} />
            <Label active={active === N30}>30s Nitrate</Label>
          </ImagePreview>
          <ImagePreview
            active={active === P}
            onBlur={this.handleButtonBlur}
            onClick={() => this.handleButtonFocus(P)}
          >
            <ImageCrop srcUrl={this.state[P]} name={P} />
            <Label active={active === P}>Phosphate</Label>
          </ImagePreview>
          <ImagePreview
            disable={true}
            onBlur={this.handleButtonBlur}
            onClick={() => this.handleButtonFocus(B)}
          >
            <ImageCrop srcUrl={this.state[B]} name={B} />
            <Label active={active === B}>Algal Bloom</Label>
          </ImagePreview>
        </ImagePreviewContainer>
      </div>
    );
  }
}
