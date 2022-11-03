import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {GamesStackParamList} from '../../stacks/games';
import {useData} from '../../providers/data';
import {GameDetailScoreboard} from '../../components/games/game-detail-scoreboard';
import {GameDetailTabStack} from '../../stacks/game-detail';
import {useNotification} from '../../providers/notification';

type Properties = {
  route: RouteProp<GamesStackParamList, 'Game Detail Stack'>;
  navigation: NativeStackNavigationProp<GamesStackParamList>;
};

const GameDetailScreen: React.FC<Properties> = ({route, navigation}) => {
  const [isLocallyLoading, setIsLocallyLoading] = React.useState(true);
  const {addListener, removeListener} = useNotification();
  const {activeGame} = useData();
  const {load: fetchActiveGame} = activeGame;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: `${route.params.game.awayTeam?.nickname} @ ${route.params.game.homeTeam?.nickname}`,
    });
  });

  React.useEffect(() => {
    console.log('fetching game', route.params.game.id);
    fetchActiveGame(route.params.game.id).then(() => {
      setIsLocallyLoading(false);
    });
  }, [route.params.game.id, fetchActiveGame]);

  const refreshGame = React.useCallback(
    async (id: string) => {
      console.log('refreshing game');
      fetchActiveGame(id);
    },
    [fetchActiveGame],
  );

  React.useEffect(() => {
    removeListener('game-detail-games-listener');
    addListener({
      eventType: 'games',
      id: 'game-detail-games-listener',
      callback: (recordId: string) => {
        if (recordId === route.params.game.id) {
          refreshGame(route.params.game.id);
        }
      },
    });
    return () => removeListener('game-detail-games-listener');
  }, [addListener, route.params.game.id, refreshGame, removeListener]);

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
      {isLocallyLoading ? (
        <View style={[styles.emptyContainer]}>
          <ActivityIndicator />
        </View>
      ) : (
        <>
          <GameDetailScoreboard activeGame={activeGame} />
          <GameDetailTabStack activeGame={activeGame} />
        </>
      )}
    </>
  );
};

export {GameDetailScreen};
