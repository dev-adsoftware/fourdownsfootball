import React from 'react';
import { Text, View } from 'react-native';
import {
  TeamRosterView,
  TeamSummaryView,
} from '@dev-adsoftware/fourdownsfootball-dtos';

import { RouteProp } from '@react-navigation/native';
import { MaterialTopTabNavigationProp } from '@react-navigation/material-top-tabs';

import { useTheme } from '../../providers/theme';
import { TeamApi } from '../../apis/team.api';

type TabParamList = {
  Scores: { team: TeamSummaryView };
};
type ScreenRouteProp = RouteProp<TabParamList, 'Scores'>;
type ScreenNavigationProp = MaterialTopTabNavigationProp<
  TabParamList,
  'Scores'
>;

type Props = {
  route: ScreenRouteProp;
  navigation: ScreenNavigationProp;
};

export default ({ route }: Props) => {
  const [roster, setRoster] = React.useState(new TeamRosterView());

  const theme = useTheme();
  console.log('in roster');
  console.log(route.params.team);

  React.useEffect(() => {
    const getRoster = async () => {
      const teamApi = new TeamApi();
      const rosterFetched = await teamApi.getRoster(
        route.params.team.id,
        route.params.team.sequence,
      );
      console.log('fetched');
      console.log(rosterFetched);
      setRoster(rosterFetched);
    };

    getRoster();
  }, [route.params.team.id, route.params.team.sequence]);

  return (
    <>
      {roster && roster.players && roster.players.length > 0 ? (
        <View style={theme.layout.container}>
          <Text>
            Roster size {roster.players.length} {roster.players[0].id}
          </Text>
        </View>
      ) : (
        <View style={theme.layout.container}>
          <Text>No roster</Text>
        </View>
      )}
    </>
  );
};
