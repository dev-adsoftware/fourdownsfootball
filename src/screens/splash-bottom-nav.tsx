import React from 'react';
import {VStack} from '../components/primitives/v-stack';
import {SafeBar} from '../components/primitives/safe-bar';
import {LogoSvg} from '../components/composites/logo-svg';
import {Container} from '../components/primitives/container';
import {Path, Svg} from 'react-native-svg';
import {Text, View} from 'react-native';

interface SplashBottomNavScreenProperties {}

export const SplashBottomNavScreen: React.FC<
  SplashBottomNavScreenProperties
> = () => {
  return (
    <>
      <SafeBar />
      <VStack full>
        {/* <LogoSvg size={100} /> */}
        <View
          style={{
            alignSelf: 'stretch',
            height: 50,
            paddingBottom: 20,
            backgroundColor: 'green',
          }}>
          <Svg viewBox={'0 0 100 50'} height={50} width={100}>
            <Path
              d={['M0 0', 'H50', 'V50', 'H0', 'z'].join(',')}
              fill="yellow"
            />
          </Svg>
        </View>
      </VStack>
    </>
  );
};
