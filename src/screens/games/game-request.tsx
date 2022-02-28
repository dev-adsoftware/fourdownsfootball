import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import uuid from 'react-native-uuid';
import {GameRequestForm} from '../../components/games/game-request-form';
import {useAuth} from '../../providers/auth';
import {useData} from '../../providers/data';
import {GameRequestsService} from '../../services/game-requests';
import {GamesStackParamList} from '../../stacks/games';

type Properties = {
  route: RouteProp<GamesStackParamList, 'Game Request'>;
  navigation: NativeStackNavigationProp<GamesStackParamList>;
};

const GameRequestScreen: React.FC<Properties> = ({route, navigation}) => {
  const {gameRequests} = useData();
  const auth = useAuth();

  return (
    <GameRequestForm
      team={route.params?.team}
      owner={route.params?.owner}
      onSubmit={async (team, owner) => {
        await new GameRequestsService().create({
          id: uuid.v4() as string,
          ownerId: auth.owner?.id as string,
          teamId: team?.id as string,
          invitedOwnerId: owner?.id as string,
          status: 'Submitted',
        });

        await gameRequests.refresh();
        navigation.goBack();
      }}
      navigation={navigation}
    />
  );
};

export {GameRequestScreen};
