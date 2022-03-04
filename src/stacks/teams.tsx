import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {useTheme} from '../providers/theme';
import {NationSelectScreen} from '../screens/teams/nation-select';
import {TeamPlayerDetailScreen} from '../screens/teams/player-detail';
import {StateSelectScreen} from '../screens/teams/state-select';
import {TeamRequestScreen} from '../screens/teams/team-request';
import {TeamsScreen} from '../screens/teams/teams';
import {TownSelectScreen} from '../screens/teams/town-select';
import {NationDto, PlayerDto, StateDto, TownDto} from '../services/dtos';
import {OwnerDashboardExtendedTeamDto} from '../services/dtos/queries/owner-dashboard/owner-dashboard-query-response.dto';
import {TeamDetailTabStack} from './team-detail';

type Properties = {};

export type TeamsStackParamList = {
  Teams: undefined;
  'Team Detail Stack': {team: OwnerDashboardExtendedTeamDto};
  'Team Player Detail': {player: PlayerDto};
  'Team Request': {
    nation?: NationDto;
    state?: StateDto;
    town?: TownDto;
  };
  'Nation Select': {
    selectedNation?: NationDto;
    returnRoute: keyof TeamsStackParamList;
    returnParamKey: string;
  };
  'State Select': {
    nationId: string;
    selectedState?: StateDto;
    returnRoute: keyof TeamsStackParamList;
    returnParamKey: string;
  };
  'Town Select': {
    stateId: string;
    selectedTown?: TownDto;
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
        headerStyle: {backgroundColor: theme.colors.black},
        headerTintColor: theme.colors.white,
        headerBackTitleVisible: false,
        contentStyle: {backgroundColor: theme.colors.secondaryBackground},
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
