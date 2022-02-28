import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {TeamsStackParamList} from '../../stacks/teams';
import {TeamsRosterList} from '../../components/teams/roster';
import {Player, PlayersService} from '../../services/players';
import {RouteProp} from '@react-navigation/native';
import {TeamDetailTabParamList} from '../../stacks/team-detail';

type Properties = {
  route: RouteProp<TeamDetailTabParamList, 'roster'>;
  navigation: NativeStackNavigationProp<TeamsStackParamList>;
};

const TeamRosterScreen: React.FC<Properties> = ({route, navigation}) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [players, setPlayers] = React.useState<Player[]>([]);

  const fetchPlayers = React.useCallback(async () => {
    setIsLoading(true);
    const fetchedPlayers = (
      await new PlayersService().listByTeam(route.params.teamId)
    ).items.sort((a: Player, b: Player) => {
      return a.lastName > b.lastName ? 1 : -1;
    });
    setPlayers(fetchedPlayers);
    setIsLoading(false);
  }, [route.params.teamId]);

  React.useEffect(() => {
    fetchPlayers();
  }, [fetchPlayers]);

  return (
    <TeamsRosterList
      isLoading={isLoading}
      players={players}
      onPressPlayer={(player: Player) => {
        navigation.navigate('Team Player Detail', {player});
      }}
      onRefresh={fetchPlayers}
    />
  );
};

export {TeamRosterScreen};
