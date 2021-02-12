import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Toolbar from './toolbar';
import LeaguesMain from './main';

type LeaguesStackParamList = {
  Leagues: undefined;
};

const Stack = createStackNavigator<LeaguesStackParamList>();

export default () => {
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerRight: () => {
            return (
              <>
                <Toolbar />
              </>
            );
          },
        }}>
        <Stack.Screen name="Leagues" component={LeaguesMain} />
      </Stack.Navigator>
    </>
  );
};
