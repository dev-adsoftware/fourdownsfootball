import React from 'react';
import {SafeBar} from '../components/primitives/safe-bar';
import {LogoSvg} from '../components/svg/logo-svg';
import {View} from '../components/primitives/view';

interface Splash2ScreenProperties {}

export const Splash2Screen: React.FC<Splash2ScreenProperties> = () => {
  return (
    <>
      <SafeBar />
      <View justifyContent="center" alignItems="center" bg="evenLayerSurface">
        <LogoSvg size={50} />
      </View>
    </>
  );
};
