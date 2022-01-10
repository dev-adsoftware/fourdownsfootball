import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {BaseToolbar} from '../components/toolbar.base';
import {TempScreen} from '../screens/temp';
import {ProfileStack} from './profile';

type Properties = {};

export type HomeStackParamList = {
  Home: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

const HomeStack: React.FC<Properties> = ({}) => {
  return (
    <Stack.Navigator
      screenOptions={{
        // headerStyle: {backgroundColor: 'rgba(26, 106, 176, 1.0)'},
        headerTintColor: 'white',
        headerBackTitleVisible: false,
        headerRight: () => {
          return (
            <BaseToolbar>
              <></>
            </BaseToolbar>
          );
        },
      }}>
      <Stack.Screen name="Home" component={TempScreen} />
      <Stack.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          presentation: 'modal',
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export {HomeStack};
