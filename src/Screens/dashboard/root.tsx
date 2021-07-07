import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DashboardMain from './main';
import DashboardNew from './new';

export type DashboardRootStackParamList = {
  Main: { ownerId: string };
  New: { ownerId: string };
};

const Stack = createStackNavigator<DashboardRootStackParamList>();

export default () => {
  return (
    <>
      <Stack.Navigator mode="modal">
        <Stack.Screen
          name="Main"
          component={DashboardMain}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="New" component={DashboardNew} />
      </Stack.Navigator>
    </>
  );
};
