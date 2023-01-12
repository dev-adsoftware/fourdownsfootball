import React from 'react';
import {VStack} from '../components/primitives/v-stack';
import {SafeBar} from '../components/primitives/safe-bar';
import {LogoSvg} from '../components/composites/logo-svg';

interface SplashScreenProps {}

export const SplashScreen: React.FC<SplashScreenProps> = () => {
  return (
    <>
      <SafeBar />
      <VStack justifyContent="center" alignItems="center" full>
        <LogoSvg size={100} />
      </VStack>
    </>
  );
};
