import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Color} from '../../components/teams/select-color-input';
import {useTheme} from '../../providers/theme';
import {CreateTeamsScreen} from '../../screens/teams/create';
import {SelectDefenseStyleScreen} from '../../screens/teams/select-defense-style';
import {SelectNationScreen} from '../../screens/teams/select-nation';
import {SelectOffenseStyleScreen} from '../../screens/teams/select-offense-style';
import {SelectPrimaryColorScreen} from '../../screens/teams/select-primary-color';
import {SelectSecondaryColorScreen} from '../../screens/teams/select-secondary-color';
import {SelectStateScreen} from '../../screens/teams/select-state';
import {SelectStripeColorScreen} from '../../screens/teams/select-stripe-color';
import {SelectTeamEmphasisScreen} from '../../screens/teams/select-team-emphasis';
import {SelectTownScreen} from '../../screens/teams/select-town';
import {Nation} from '../../services/nations';
import {State} from '../../services/states';
import {Town} from '../../services/towns';

type Properties = {};

export type CreateTeamStackParamList = {
  'Create Team': {
    nation?: Nation;
    state?: State;
    town?: Town;
    primaryColor?: Color;
    secondaryColor?: Color;
    stripeColor?: Color;
    teamEmphasis?: string;
    offenseStyle?: string;
    defenseStyle?: string;
  };
  'Select Nation': {selectedNation?: Nation};
  'Select State': {nationId: string; selectedState?: State};
  'Select Town': {stateId: string; selectedTown?: Town};
  'Select Primary Color': {selectedColor?: Color};
  'Select Secondary Color': {selectedColor?: Color};
  'Select Stripe Color': {selectedColor?: Color};
  'Select Team Emphasis': {selectedEmphasis?: string};
  'Select Offense Style': {selectedStyle?: string};
  'Select Defense Style': {selectedStyle?: string};
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
      <Stack.Screen
        name="Select Nation"
        component={SelectNationScreen}
        options={{title: 'Select Country'}}
      />
      <Stack.Screen name="Select State" component={SelectStateScreen} />
      <Stack.Screen
        name="Select Town"
        component={SelectTownScreen}
        options={{title: 'Select City'}}
      />
      <Stack.Screen
        name="Select Primary Color"
        component={SelectPrimaryColorScreen}
      />
      <Stack.Screen
        name="Select Secondary Color"
        component={SelectSecondaryColorScreen}
      />
      <Stack.Screen
        name="Select Stripe Color"
        component={SelectStripeColorScreen}
      />
      <Stack.Screen
        name="Select Team Emphasis"
        component={SelectTeamEmphasisScreen}
      />
      <Stack.Screen
        name="Select Offense Style"
        component={SelectOffenseStyleScreen}
      />
      <Stack.Screen
        name="Select Defense Style"
        component={SelectDefenseStyleScreen}
      />
    </Stack.Navigator>
  );
};

export {CreateTeamStack};
