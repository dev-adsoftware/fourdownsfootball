import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {useTheme} from '../../providers/theme';
import {TeamsScreen} from '../../screens/teams/teams';
import {TempScreen} from '../../screens/temp';
import {CreateTeamStack} from './create';

type Properties = {};

export type TeamsStackParamList = {
  Teams: undefined;
  'Team Detail': {teamId: string};
  'Create Team Stack': undefined;
};

const Stack = createNativeStackNavigator<TeamsStackParamList>();

const TeamsStack: React.FC<Properties> = ({}) => {
  const theme = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: theme.colors.background},
        headerTintColor: theme.colors.text,
        headerBackTitleVisible: false,
      }}>
      <Stack.Screen name="Teams" component={TeamsScreen} />
      <Stack.Screen name="Team Detail" component={TempScreen} />
      <Stack.Screen
        name="Create Team Stack"
        component={CreateTeamStack}
        options={{presentation: 'modal', headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export {TeamsStack};
