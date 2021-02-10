import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Toolbar from '../home/toolbar';
import LeaguesMain from '../leagues/main';

type LeaguesStackParamList = {
  Leagues: undefined;
};

const Stack = createStackNavigator<LeaguesStackParamList>();

export default () => {
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerRight: Toolbar,
        }}>
        <Stack.Screen name="Leagues" component={LeaguesMain} />
      </Stack.Navigator>
    </>
  );
};
