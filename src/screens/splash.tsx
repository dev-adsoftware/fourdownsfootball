import React from 'react';
import {Text} from 'react-native';
import {Container} from '../components/primitives/container';

type Properties = {};
const SplashScreen: React.FC<Properties> = () => {
  return (
    <Container
      newProp="propValue"
      bgColor="red.500"
      style={{backgroundColor: 'green'}}>
      <Text>hello</Text>
    </Container>
  );
};

export {SplashScreen};
