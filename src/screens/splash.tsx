import React from 'react';
import {VStack} from '../components/primitives/v-stack';
import {SafeBar} from '../components/primitives/safe-bar';
import {LogoSvg} from '../components/composites/logo-svg';

interface SplashScreenProperties {}

export const SplashScreen: React.FC<SplashScreenProperties> = () => {
  return (
    <>
      <SafeBar />
      <VStack justify="center" full>
        <LogoSvg size={100} />
      </VStack>
    </>
  );
};
