import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LeaguesMain from './main';

export type LeaguesRootStackParamList = {
  Main: { ownerId: string };
  // New: { ownerId: string };
};

const Stack = createStackNavigator<LeaguesRootStackParamList>();

export default () => {
  return (
    <>
      <Stack.Navigator mode="modal">
        <Stack.Screen
          name="Main"
          component={LeaguesMain}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </>
  );
};
