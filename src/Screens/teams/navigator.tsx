import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Toolbar from '../home/toolbar';
import TeamsMain from '../teams/main';

type TeamsStackParamList = {
  Teams: undefined;
};

const Stack = createStackNavigator<TeamsStackParamList>();

export default () => {
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerRight: Toolbar,
        }}>
        <Stack.Screen name="Teams" component={TeamsMain} />
      </Stack.Navigator>
    </>
  );
};
