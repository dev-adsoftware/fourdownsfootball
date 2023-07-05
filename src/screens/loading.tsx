import React from 'react';
import {Text} from '../primitives/text';

interface LoadingScreenProps {}

export const LoadingScreen: React.FC<LoadingScreenProps> = _props => {
  return (
    <Text text="loading screen" typeFace="sourceSansProRegular" fontSize={17} />
  );
};
