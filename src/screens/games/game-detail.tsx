import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {GamesStackParamList} from '../../stacks/games';
import {useData} from '../../providers/data';
import {GameDetailQueryResponseDto} from '../../services/dtos';
import {GameDetailScoreboard} from '../../components/games/game-detail-scoreboard';
import {GameDetailTabStack} from '../../stacks/game-detail';

export type GameDetailTabParamList = {
  'Game Play': undefined;
  'Box Score': undefined;
  'Play-by-Play': undefined;
  'Game Stats': undefined;
};

type Properties = {
  route: RouteProp<GamesStackParamList, 'Game Detail Stack'>;
  navigation: NativeStackNavigationProp<GamesStackParamList>;
};

const GameDetailScreen: React.FC<Properties> = ({route, navigation}) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: `${route.params.game.awayTeam?.nickname} @ ${route.params.game.homeTeam?.nickname}`,
    });
  });

  const {activeGame} = useData();

  React.useEffect(() => {
    if (route.params.game.id !== activeGame.item?.id) {
      const game = new GameDetailQueryResponseDto();
      game.id = route.params.game.id;
      game.state = 'loading';
      activeGame.set(game);
    }
  }, [activeGame, route.params.game.id]);

  const styles = StyleSheet.create({
    emptyContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 100,
    },
  });

  return (
    <>
      {!activeGame.item ||
      activeGame.isLoading ||
      activeGame.item?.state === 'loading' ? (
        <View style={[styles.emptyContainer]}>
          <ActivityIndicator />
        </View>
      ) : (
        <>
          <GameDetailScoreboard activeGame={activeGame} />
          <GameDetailTabStack />
        </>
      )}
    </>
  );
};

export {GameDetailScreen};
