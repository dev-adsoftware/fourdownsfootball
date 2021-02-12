import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Toolbar from './toolbar';
import TeamsMain from './main';

type TeamsStackParamList = {
  Teams: undefined;
};

const Stack = createStackNavigator<TeamsStackParamList>();

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
        <Stack.Screen name="Teams" component={TeamsMain} />
      </Stack.Navigator>
    </>
  );
};
