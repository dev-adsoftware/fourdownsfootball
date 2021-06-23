import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Toolbar from './toolbar';
import TeamsList from './list';
import TeamsDetail from './detail';

export type TeamsStackParamList = {
  Teams: { ownerId: string };
  Detail: { ownerId: string };
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
        <Stack.Screen name="Teams" component={TeamsList} />
        <Stack.Screen name="Detail" component={TeamsDetail} />
      </Stack.Navigator>
    </>
  );
};
