import React from 'react';
import { View, Button } from 'react-native';

export interface HomeScreenProps {}

export default () => {
  return (
    <View>
      <Button
        title="New Game"
        onPress={async () => {
          console.log('start a new game');
        }}
      />
    </View>
  );
};
