import React from 'react';
import {VStack} from '../components/primitives/v-stack';
import {SafeBar} from '../components/primitives/safe-bar';
import {LogoSvg} from '../components/composites/logo-svg';

interface Splash2ScreenProperties {}

export const Splash2Screen: React.FC<Splash2ScreenProperties> = () => {
  return (
    <>
      <SafeBar />
      <VStack justify="center" full styles={[{backgroundColor: '#ccc'}]}>
        <LogoSvg size={50} />
      </VStack>
    </>
  );
};
