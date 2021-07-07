import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Toolbar from './toolbar';
import LaddersList from './list';

export type LaddersStackParamList = {
  LaddersList: {};
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
        <Stack.Screen name="LaddersList" component={LaddersList} />
      </Stack.Navigator>
    </>
  );
};
