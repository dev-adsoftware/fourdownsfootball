import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {useTheme} from '../providers/theme';
import {GameRequestScreen} from '../screens/games/game-request';
import {GameRSVPScreen} from '../screens/games/game-rsvp';
import {GamesScreen} from '../screens/games/games';
import {OwnerSelectScreen} from '../screens/games/owner-select';
import {TeamSelectScreen} from '../screens/games/team-select';
import {GameInvite} from '../services/game-invites';
import {Game} from '../services/games';
import {Owner} from '../services/owners';
import {Team} from '../services/teams';
import {GameDetailTabStack} from './game-detail';

type Properties = {};

export type GamesStackParamList = {
  Games: undefined;
  'Game Request': {team?: Team; owner?: Owner};
  'Game RSVP': {gameInvite: GameInvite; team?: Team};
  'Game Detail Stack': {game: Game};
  'Team Select': {
    selectedTeam?: Team;
    returnRoute: keyof GamesStackParamList;
    returnParamKey: string;
  };
  'Owner Select': {
    selectedOwner?: Owner;
    returnRoute: keyof GamesStackParamList;
    returnParamKey: string;
  };
};

const Stack = createNativeStackNavigator<GamesStackParamList>();

const GamesStack: React.FC<Properties> = ({}) => {
  const theme = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: theme.colors.black},
        headerTintColor: theme.colors.white,
        headerBackTitleVisible: false,
        contentStyle: {backgroundColor: theme.colors.secondaryBackground},
      }}>
      <Stack.Screen name="Games" component={GamesScreen} />
      <Stack.Screen name="Game Detail Stack" component={GameDetailTabStack} />
      <Stack.Screen name="Game Request" component={GameRequestScreen} />
      <Stack.Screen name="Game RSVP" component={GameRSVPScreen} />
      <Stack.Screen
        name="Team Select"
        component={TeamSelectScreen}
        options={{title: 'Select Team'}}
      />
      <Stack.Screen
        name="Owner Select"
        component={OwnerSelectScreen}
        options={{title: 'Select Owner'}}
      />
    </Stack.Navigator>
  );
};

export {GamesStack};
