import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Toolbar from './toolbar';
import LaddersMain from './main';

type LaddersStackParamList = {
  Ladders: undefined;
};

const Stack = createStackNavigator<LaddersStackParamList>();

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
        <Stack.Screen name="Ladders" component={LaddersMain} />
      </Stack.Navigator>
    </>
  );
};
