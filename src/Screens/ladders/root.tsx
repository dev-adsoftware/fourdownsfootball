import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LaddersMain from './main';

export type LaddersRootStackParamList = {
  Main: { ownerId: string };
  // New: { ownerId: string };
};

const Stack = createStackNavigator<LaddersRootStackParamList>();

export default () => {
  return (
    <>
      <Stack.Navigator mode="modal">
        <Stack.Screen
          name="Main"
          component={LaddersMain}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </>
  );
};
