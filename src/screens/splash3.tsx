import React from 'react';
import {SafeBar} from '../components/primitives/safe-bar';
import {Spinner} from '../components/composites/spinner';
import {HStack} from '../components/primitives/h-stack';
import {Container} from '../components/primitives/container';
import {Rect} from '../components/primitives/rect';
import {CircleButton} from '../components/composites/circle-button';
import {Input} from '../components/composites/input';

interface Splash3ScreenProps {}

export const Splash3Screen: React.FC<Splash3ScreenProps> = () => {
  return (
    <>
      <SafeBar />
      {/* <HStack justifyContent="flex-start"> */}
      <Container m="md">
        {/* <Spinner /> */}
        {/* <CircleButton
            icon="plus"
            onPress={() => {
              console.log('pressed');
            }}
          /> */}
        <Input
          label="Email"
          autoCapitalize="none"
          returnKeyType="next"
          keyboardType="email-address"
          // hasError={error.length > 0}
          // value={username}
          // onChangeText={(text: string) => {
          //   setError('');
          //   setUsername(text);
          // }}
        />
      </Container>
      {/* </HStack> */}
    </>
  );
};
