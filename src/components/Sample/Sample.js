import React from "react";
import SampleContainer from "./SampleContainer";
import Instructions from "./Instructions";
import ImageAnalysis from './ImageAnalysis';
import Results from './Results';

export default () => (
  <SampleContainer>
    <Instructions />
	<ImageAnalysis />
	<Results />
  </SampleContainer>
);
