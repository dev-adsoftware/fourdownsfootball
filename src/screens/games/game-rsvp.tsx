import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {GameRSVPForm} from '../../components/games/game-rsvp-form';
import {useData} from '../../providers/data';
import {GameInviteDto} from '../../services/dtos';
import {OwnerDashboardExtendedTeamDto} from '../../services/dtos/queries/owner-dashboard/owner-dashboard-query-response.dto';
import {GameInvitesService} from '../../services/game-invites';
import {GamesStackParamList} from '../../stacks/games';

type Properties = {
  route: RouteProp<GamesStackParamList, 'Game RSVP'>;
  navigation: NativeStackNavigationProp<GamesStackParamList>;
};

const GameRSVPScreen: React.FC<Properties> = ({route, navigation}) => {
  const {ownerDashboard} = useData();

  return (
    <GameRSVPForm
      team={route.params?.team}
      onSubmit={async (team: OwnerDashboardExtendedTeamDto) => {
        const currentGameInvite = new GameInviteDto().init({
          ...route.params.gameInvite.toPlainObject(),
        });

        await new GameInvitesService().updateGameInvite(
          route.params.gameInvite.id,
          currentGameInvite,
          {teamId: team?.id, status: 'Accepted'},
          ['teamId', 'status'],
        );

        await ownerDashboard.refresh();
      }}
      navigation={navigation}
    />
  );
};

export {GameRSVPScreen};
