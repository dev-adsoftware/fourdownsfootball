import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {useTheme} from '../../providers/theme';
import {CreateTeamsScreen} from '../../screens/teams/create';
import {SelectNationScreen} from '../../screens/teams/select-nation';
import {Nation} from '../../services/nations';

type Properties = {};

export type CreateTeamStackParamList = {
  'Create Team': {nation?: Nation};
  'Select Nation': {selectedNation?: Nation};
};

const Stack = createNativeStackNavigator<CreateTeamStackParamList>();

const CreateTeamStack: React.FC<Properties> = ({}) => {
  const theme = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: theme.colors.background},
        headerTintColor: theme.colors.text,
        headerBackTitleVisible: false,
      }}>
      <Stack.Screen name="Create Team" component={CreateTeamsScreen} />
      <Stack.Screen name="Select Nation" component={SelectNationScreen} />
    </Stack.Navigator>
  );
};

export {CreateTeamStack};
