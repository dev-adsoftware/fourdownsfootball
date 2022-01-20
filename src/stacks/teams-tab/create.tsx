import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {useTheme} from '../../providers/theme';
import {CreateTeamsScreen} from '../../screens/teams/create';
import {SelectNationScreen} from '../../screens/teams/select-nation';
import {SelectStateScreen} from '../../screens/teams/select-state';
import {Nation} from '../../services/nations';
import {State} from '../../services/states';

type Properties = {};

export type CreateTeamStackParamList = {
  'Create Team': {nation?: Nation; state?: State};
  'Select Nation': {selectedNation?: Nation};
  'Select State': {nationId: string; selectedState?: State};
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
      <Stack.Screen name="Select State" component={SelectStateScreen} />
    </Stack.Navigator>
  );
};

export {CreateTeamStack};
