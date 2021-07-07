import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Toolbar from './toolbar';
import LeaguesList from './list';

export type LeaguesStackParamList = {
  LeaguesList: {};
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
        <Stack.Screen name="LeaguesList" component={LeaguesList} />
      </Stack.Navigator>
    </>
  );
};
