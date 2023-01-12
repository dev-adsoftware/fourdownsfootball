import React from 'react';
import {VStack} from '../components/primitives/v-stack';
import {SafeBar} from '../components/primitives/safe-bar';
import {LogoSvg} from '../components/composites/logo-svg';
import {Rect} from '../components/primitives/rect';

interface Splash2ScreenProperties {}

export const Splash2Screen: React.FC<Splash2ScreenProperties> = () => {
  return (
    <>
      <SafeBar />
      <VStack
        justifyContent="center"
        alignItems="center"
        full
        bg="evenLayerSurface">
        <LogoSvg size={50} />
      </VStack>
    </>
  );
};
