import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
// import {GameDetailScreen} from '../screens/games/game-detail';
// import {GameRequestScreen} from '../screens/games/game-request';
// import {GameRSVPScreen} from '../screens/games/game-rsvp';
// import {GamesScreen} from '../screens/games/games';
// import {OwnerSelectScreen} from '../screens/games/owner-select';
// import {TeamSelectScreen} from '../screens/games/team-select';
import {SplashScreen} from '../screens/splash';
import {OwnerDto} from '../services/dtos';
import {
  OwnerDashboardExtendedGameDto,
  OwnerDashboardExtendedGameInviteDto,
  OwnerDashboardExtendedTeamDto,
} from '../services/dtos/queries/owner-dashboard/owner-dashboard-query-response.dto';

type Properties = {};

export type GamesStackParamList = {
  Games: undefined;
  'Game Request': {team?: OwnerDashboardExtendedTeamDto; owner?: OwnerDto};
  'Game RSVP': {
    gameInvite: OwnerDashboardExtendedGameInviteDto;
    team?: OwnerDashboardExtendedTeamDto;
  };
  'Game Detail Stack': {game: OwnerDashboardExtendedGameDto};
  // 'Team Select': {
  //   selectedTeam?: OwnerDashboardExtendedTeamDto;
  //   returnRoute: keyof GamesStackParamList;
  //   returnParamKey: string;
  // };
  // 'Owner Select': {
  //   selectedOwner?: OwnerDto;
  //   returnRoute: keyof GamesStackParamList;
  //   returnParamKey: string;
  // };
};

const Stack = createNativeStackNavigator<GamesStackParamList>();

const GamesStack: React.FC<Properties> = ({}) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        // headerStyle: {backgroundColor: 'green' || theme.colors.black},
        // headerTintColor: 'yellow' || theme.colors.white,
        // headerBackTitleVisible: false,
        // contentStyle: {
        //   backgroundColor: 'brown' || theme.colors.secondaryBackground,
        // },
      }}>
      <Stack.Screen name="Games" component={SplashScreen} />
      <Stack.Screen name="Game Detail Stack" component={SplashScreen} />
      <Stack.Screen name="Game Request" component={SplashScreen} />
      <Stack.Screen name="Game RSVP" component={SplashScreen} />
      {/* <Stack.Screen
        name="Team Select"
        component={TeamSelectScreen}
        options={{title: 'Select Team'}}
      />
      <Stack.Screen
        name="Owner Select"
        component={OwnerSelectScreen}
        options={{title: 'Select Owner'}}
      /> */}
      {/* <Stack.Screen name="Games" component={GamesScreen} />
      <Stack.Screen name="Game Detail Stack" component={GameDetailScreen} />
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
      /> */}
    </Stack.Navigator>
  );
};

export {GamesStack};
