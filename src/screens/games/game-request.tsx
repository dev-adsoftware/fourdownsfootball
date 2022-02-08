import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {GameRequestForm} from '../../components/games/game-request-form';
import {GamesStackParamList} from '../../stacks/games';

type Properties = {
  route: RouteProp<GamesStackParamList, 'Game Request'>;
  navigation: NativeStackNavigationProp<GamesStackParamList>;
};

const GameRequestScreen: React.FC<Properties> = ({route, navigation}) => {
  return (
    <GameRequestForm
      team={route.params?.team}
      owner={route.params?.owner}
      navigation={navigation}
    />
  );
};

export {GameRequestScreen};
