import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import uuid from 'react-native-uuid';
import {GameRequestForm} from '../../components/games/game-request-form';
import {useData} from '../../providers/data';
import {GameRequestDto} from '../../services/dtos';
import {GameRequestsService} from '../../services/game-requests';
import {GamesStackParamList} from '../../stacks/games';

type Properties = {
  route: RouteProp<GamesStackParamList, 'Game Request'>;
  navigation: NativeStackNavigationProp<GamesStackParamList>;
};

const GameRequestScreen: React.FC<Properties> = ({route, navigation}) => {
  const [isProcessing, setIsProcessing] = React.useState(false);
  const {ownerDashboard} = useData();

  return (
    <GameRequestForm
      team={route.params?.team}
      owner={route.params?.owner}
      isProcessing={isProcessing}
      onSubmit={async (team, owner) => {
        setIsProcessing(true);
        const gameRequest = new GameRequestDto();
        gameRequest.id = uuid.v4() as string;
        gameRequest.ownerId = ownerDashboard.item?.owner.id as string;
        gameRequest.teamId = team.id;
        gameRequest.invitedOwnerId = owner.id;
        gameRequest.status = 'Submitted';

        await new GameRequestsService().createGameRequest(gameRequest);
        await ownerDashboard.refresh();
        setIsProcessing(false);
        navigation.goBack();
      }}
      navigation={navigation}
    />
  );
};

export {GameRequestScreen};
