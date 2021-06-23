import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TeamsMain from './main';
import TeamsNew from './new';

export type TeamsRootStackParamList = {
  Main: { ownerId: string };
  New: { ownerId: string };
};

const Stack = createStackNavigator<TeamsRootStackParamList>();

export default () => {
  return (
    <>
      <Stack.Navigator mode="modal">
        <Stack.Screen
          name="Main"
          component={TeamsMain}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="New" component={TeamsNew} />
      </Stack.Navigator>
    </>
  );
};
