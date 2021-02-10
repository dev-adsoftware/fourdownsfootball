import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Toolbar from '../home/toolbar';
import LaddersMain from '../ladders/main';

type LaddersStackParamList = {
  Ladders: undefined;
};

const Stack = createStackNavigator<LaddersStackParamList>();

export default () => {
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerRight: Toolbar,
        }}>
        <Stack.Screen name="Ladders" component={LaddersMain} />
      </Stack.Navigator>
    </>
  );
};
