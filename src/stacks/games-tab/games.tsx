import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {useTheme} from '../../providers/theme';
import {GamesScreen} from '../../screens/games/games';
import {SelectOwnerScreen} from '../../screens/games/select-owner';
import {Owner} from '../../services/owners';
import {RequestGameStack} from './request';

type Properties = {};

export type GamesStackParamList = {
  Games: undefined;
  'Request Game Stack': undefined;
  'Select Owner': {selectedOwner?: Owner};
};

const Stack = createNativeStackNavigator<GamesStackParamList>();

const GamesStack: React.FC<Properties> = ({}) => {
  const theme = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: theme.colors.background},
        headerTintColor: theme.colors.text,
        headerBackTitleVisible: false,
      }}>
      <Stack.Screen name="Games" component={GamesScreen} />
      <Stack.Screen
        name="Request Game Stack"
        component={RequestGameStack}
        options={{presentation: 'modal', headerShown: false}}
      />
      <Stack.Screen name="Select Owner" component={SelectOwnerScreen} />
    </Stack.Navigator>
  );
};

export {GamesStack};
