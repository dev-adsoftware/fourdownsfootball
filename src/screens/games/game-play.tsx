import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {GameCoinTossAction} from '../../components/games/game-coin-toss-action';
import {GameLogList} from '../../components/games/game-log-list';
import {GamePlayField} from '../../components/games/game-play-field';
import {useData} from '../../providers/data';
import {useTheme} from '../../providers/theme';
import {GameDetailTabParamList} from '../../stacks/game-detail';
import {GameEngine} from '../../utilities/game-engine';

type Properties = {
  navigation: NativeStackNavigationProp<GameDetailTabParamList>;
};

const GamePlayScreen: React.FC<Properties> = () => {
  const {activeGame} = useData();
  const theme = useTheme();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    text: {
      color: theme.colors.text,
      padding: 10,
      ...theme.typography.largeTitle,
    },
  });

  return (
    <>
      {activeGame.item ? (
        activeGame.item?.state === 'loading' ? (
          <ActivityIndicator />
        ) : (
          <View style={[styles.container]}>
            <GamePlayField
              awayTeamAbbr={GameEngine.getTeamAbbreviation(
                activeGame.item?.awayTeam,
              )}
              awayTeamColor={
                activeGame.item?.awayTeam
                  ? (
                      theme.colors as {
                        [x: string]: string;
                      }
                    )[activeGame.item.awayTeam.primaryColor.toLowerCase()]
                  : theme.colors.red
              }
              homeTeamAbbr={GameEngine.getTeamAbbreviation(
                activeGame.item?.homeTeam,
              )}
              homeTeamColor={
                activeGame.item?.homeTeam
                  ? (
                      theme.colors as {
                        [x: string]: string;
                      }
                    )[activeGame.item.homeTeam.primaryColor.toLowerCase()]
                  : theme.colors.blue
              }
              ballOn={35 || activeGame.item?.ballOn}
              distance={5 || activeGame.item?.distance}
              driveStartYardLine={20}
              lastPlay={{gainLoss: 15, playType: 'run'}}
            />
            <GameLogList
              logs={activeGame.item.logs
                .slice(-3)
                .concat(activeGame.item.logs.slice(-3))
                .concat(activeGame.item.logs.slice(-3))}
            />
            <GameCoinTossAction
              actingTeam={GameEngine.getActingTeam(activeGame.item)}
            />
          </View>
        )
      ) : (
        <></>
      )}
    </>
  );
};

export {GamePlayScreen};
