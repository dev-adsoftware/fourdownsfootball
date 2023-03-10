import React from 'react';
import {SafeBar} from '../primitives/safe-bar';
import {LogoSvg} from '../components/svg/logo-svg';
import {View} from '../primitives/view';

interface SplashScreenProps {}

export const SplashScreen: React.FC<SplashScreenProps> = () => {
  return (
    <>
      <SafeBar />
      <View justifyContent="center" alignItems="center">
        <LogoSvg size={100} />
      </View>
    </>
  );
};
