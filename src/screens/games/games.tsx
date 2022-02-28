import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {GamesList} from '../../components/games/list';
import {NewToolbar} from '../../components/toolbars/new';
import {useData} from '../../providers/data';
import {GamesStackParamList} from '../../stacks/games';

type Properties = {
  navigation: NativeStackNavigationProp<GamesStackParamList>;
};

const GamesScreen: React.FC<Properties> = ({navigation}) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <NewToolbar onNew={() => navigation.navigate('Game Request', {})} />
        );
      },
    });
  }, [navigation]);

  const {gameRequests, gameInvites, gameParticipants} = useData();

  return (
    <GamesList
      gameRequests={gameRequests}
      gameInvites={gameInvites}
      gameParticipants={gameParticipants}
      navigation={navigation}
    />
  );
};

export {GamesScreen};
