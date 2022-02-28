import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {GameRSVPForm} from '../../components/games/game-rsvp-form';
import {useAuth} from '../../providers/auth';
import {useData} from '../../providers/data';
import {GameInvitesService} from '../../services/game-invites';
import {Team} from '../../services/teams';
import {GamesStackParamList} from '../../stacks/games';

type Properties = {
  route: RouteProp<GamesStackParamList, 'Game RSVP'>;
  navigation: NativeStackNavigationProp<GamesStackParamList>;
};

const GameRSVPScreen: React.FC<Properties> = ({route, navigation}) => {
  const auth = useAuth();
  const {gameInvites} = useData();

  return (
    <GameRSVPForm
      team={route.params?.team}
      onSubmit={async (team: Team) => {
        await new GameInvitesService().update(
          route.params.gameInvite.id,
          ['sequence', 'lastUpdateDate', 'lastUpdatedBy', 'teamId', 'status'],
          {
            sequence: route.params.gameInvite.sequence,
            lastUpdateDate: new Date().toISOString(),
            lastUpdatedBy: auth.owner?.id,
            teamId: team?.id,
            status: 'Accepted',
          },
        );

        await gameInvites.refresh();
      }}
      navigation={navigation}
    />
  );
};

export {GameRSVPScreen};
