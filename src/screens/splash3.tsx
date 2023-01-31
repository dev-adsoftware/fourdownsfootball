import React from 'react';
import {LogoSvg} from '../components/svg/logo-svg';
import {useWindowDimensions} from 'react-native';
import {View} from '../components/primitives/view';
import {SafeBar} from '../components/primitives/safe-bar';

interface Splash3ScreenProps {}

export const Splash3Screen: React.FC<Splash3ScreenProps> = () => {
  const {width, height} = useWindowDimensions();
  return (
    <>
      <SafeBar bg="oddLayerSurface" />
      <View w={width} h={height} bg="oddLayerSurface">
        <LogoSvg size={100} />
      </View>
    </>
  );
};
