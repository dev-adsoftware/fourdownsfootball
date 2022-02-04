import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Color} from '../components/teams/select-color-input';
import {useTheme} from '../providers/theme';
import {NationSelectScreen} from '../screens/teams/nation-select';
import {TeamPlayerDetailScreen} from '../screens/teams/player-detail';
import {StateSelectScreen} from '../screens/teams/state-select';
import {TeamRequestScreen} from '../screens/teams/team-request';
import {TeamsScreen} from '../screens/teams/teams';
import {TownSelectScreen} from '../screens/teams/town-select';
import {Nation} from '../services/nations';
import {Player} from '../services/players';
import {State} from '../services/states';
import {Team} from '../services/teams';
import {Town} from '../services/towns';
import {TeamDetailTabStack} from './team-detail';

type Properties = {};

export type TeamsStackParamList = {
  Teams: undefined;
  'Team Detail Stack': {team: Team};
  'Team Player Detail': {player: Player};
  'Team Request': {
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
  'Nation Select': {
    selectedNation?: Nation;
    returnRoute: keyof TeamsStackParamList;
    returnParamKey: string;
  };
  'State Select': {
    nationId: string;
    selectedState?: State;
    returnRoute: keyof TeamsStackParamList;
    returnParamKey: string;
  };
  'Town Select': {
    stateId: string;
    selectedTown?: Town;
    returnRoute: keyof TeamsStackParamList;
    returnParamKey: string;
  };
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
      <Stack.Screen name="Team Detail Stack" component={TeamDetailTabStack} />
      <Stack.Screen
        name="Team Player Detail"
        component={TeamPlayerDetailScreen}
      />
      <Stack.Screen name="Team Request" component={TeamRequestScreen} />
      <Stack.Screen
        name="Nation Select"
        component={NationSelectScreen}
        options={{title: 'Select Country'}}
      />
      <Stack.Screen
        name="State Select"
        component={StateSelectScreen}
        options={{title: 'Select State'}}
      />
      <Stack.Screen
        name="Town Select"
        component={TownSelectScreen}
        options={{title: 'Select City'}}
      />
    </Stack.Navigator>
  );
};

export {TeamsStack};
