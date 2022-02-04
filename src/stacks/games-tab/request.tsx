import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {useTheme} from '../../providers/theme';
import {GameRequestScreen} from '../../screens/games/request';
import {SelectOwnerScreen} from '../../screens/games/select-owner';
import {SelectTeamScreen} from '../../screens/games/select-team';
import {Owner} from '../../services/owners';
import {Team} from '../../services/teams';

type Properties = {};

export type RequestGameStackParamList = {
  'Request Game': {
    team?: Team;
    owner?: Owner;
  };
  'Select Team': {selectedTeam?: Team};
  'Select Owner': {selectedOwner?: Owner};
};

const Stack = createNativeStackNavigator<RequestGameStackParamList>();

const RequestGameStack: React.FC<Properties> = ({}) => {
  const theme = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: theme.colors.background},
        headerTintColor: theme.colors.text,
        headerBackTitleVisible: false,
      }}>
      <Stack.Screen name="Request Game" component={GameRequestScreen} />
      <Stack.Screen name="Select Team" component={SelectTeamScreen} />
      <Stack.Screen name="Select Owner" component={SelectOwnerScreen} />
    </Stack.Navigator>
  );
};

export {RequestGameStack};
