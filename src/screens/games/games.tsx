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

  const {ownerDashboard} = useData();

  return (
    <GamesList
      gameRequests={ownerDashboard.item?.gameRequests || []}
      gameInvites={ownerDashboard.item?.gameInvites || []}
      gameParticipants={ownerDashboard.item?.gameParticipants || []}
      isLoading={ownerDashboard.isLoading}
      onRefresh={ownerDashboard.refresh}
      navigation={navigation}
    />
  );
};

export {GamesScreen};
