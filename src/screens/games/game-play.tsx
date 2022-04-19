import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Animated,
  Easing,
} from 'react-native';
import uuid from 'react-native-uuid';
import {GameControlPanel} from '../../components/games/game-control-panel';
import {GameField} from '../../components/games/game-field';
import {GameMomentumBar} from '../../components/games/game-momentum-bar';
import {GamePlaybook} from '../../components/games/game-playbook';
import {useData} from '../../providers/data';
import {useTheme} from '../../providers/theme';
import {GameDetailTabParamList} from '../../stacks/game-detail';
import {GameEngine} from '../../utilities/game-engine';
import {GamePlayerCarousel} from '../../components/games/game-player-carousel';
import {GameActionDto, GameDetailQueryResponseDto} from '../../services/dtos';
import {GameDetailExtendedPlaybookPlaySnapshotDto} from '../../services/dtos/queries/game-detail/game-detail-query-response.dto';
import {GameWaitingPanel} from '../../components/games/game-waiting-panel';
import {GameActionsService} from '../../services/game-actions';

type Properties = {
  navigation: NativeStackNavigationProp<GameDetailTabParamList>;
};

const GamePlayScreen: React.FC<Properties> = () => {
  const {activeGame, ownerDashboard} = useData();
  const opposingTeam = GameEngine.getOpposingTeam(
    activeGame.item as GameDetailQueryResponseDto,
    ownerDashboard.item?.owner.id as string,
  );

  const ownerTeam = GameEngine.getOwnerTeam(
    activeGame.item as GameDetailQueryResponseDto,
    ownerDashboard.item?.owner.id as string,
  );

  const actingTeam = GameEngine.getActingTeam(
    activeGame.item as GameDetailQueryResponseDto,
  );

  const offenseTeam = GameEngine.getOffenseTeam(
    activeGame.item as GameDetailQueryResponseDto,
  );

  const [isPlaybookOpen, setIsPlaybookOpen] = React.useState(false);
  const [selectedPlaybookPlay, setSelectedPlaybookPlay] = React.useState(
    ownerTeam.playbookPlays[0],
  );

  const animationPlaybookOpacity = React.useRef(new Animated.Value(0)).current;
  const fadePlaybook = React.useCallback(
    (inOut: 'in' | 'out') => {
      animationPlaybookOpacity.setValue(inOut === 'in' ? 0 : 1);
      Animated.timing(animationPlaybookOpacity, {
        toValue: inOut === 'in' ? 1 : 0,
        duration: 200,
        useNativeDriver: true,
        easing: Easing.linear,
      }).start(() => {
        if (inOut === 'out') {
          setIsPlaybookOpen(false);
        }
      });
    },
    [animationPlaybookOpacity],
  );

  const theme = useTheme();
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    gameFieldContainer: {
      backgroundColor: theme.colors.grass,
      width: '100%',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    overlayContainer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      height: 195,
      width: '100%',
      // marginTop: -195,
      alignItems: 'center',
      justifyContent: 'space-between',
      zIndex: 1,
    },
    controlPanelContainer: {
      width: '80%',
    },
    playbookOverlayContainer: {
      position: 'absolute',
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      zIndex: 99,
      backgroundColor: 'rgba(0,0,0,0.8)',
      padding: 15,
    },
    playbookContainer: {
      backgroundColor: theme.colors.background,
      width: '100%',
      height: '100%',
      borderWidth: 1,
      borderColor: theme.colors.separator,
      borderRadius: 5,
    },
    playbookHeaderContainer: {
      height: 35,
      width: '100%',
      // backgroundColor: theme.colors.secondaryBackground,
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,
      flexDirection: 'row',
      // alignItems: 'center',
    },
    playbookHeaderTitleContainer: {
      flex: 1,
      height: 25,
      // flexDirection: 'row',
      backgroundColor: theme.colors.secondaryBackground,
      borderTopLeftRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 5,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.separator,
    },
    playbookHeaderTitleText: {
      ...theme.typography.caption1,
      fontWeight: 'bold',
    },
    playbookHeaderCloseButtonContainer: {
      width: 35,
      height: 35,
      backgroundColor: theme.colors.blue,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderTopRightRadius: 5,
      borderBottomLeftRadius: 5,
      borderWidth: 2,
      borderColor: theme.colors.separator,
      marginTop: -1,
      marginRight: -1,
    },
    playbookGridContainer: {
      height: '100%',
      width: '100%',
      paddingHorizontal: 3,
    },
    playbookSectionHeader: {
      width: '100%',
      flexDirection: 'row',
      paddingHorizontal: 5,
      marginTop: 5,
      marginBottom: 1,
    },
    playbookSectionHeaderText: {
      ...theme.typography.caption2,
      fontWeight: 'bold',
    },
    playbookRow: {
      width: '100%',
      height: 70,
      flexDirection: 'row',
      marginBottom: 2,
    },
    playbookColumn: {
      flex: 1,
      borderWidth: 1,
      borderColor: theme.colors.separator,
      height: '100%',
      margin: 2,
      borderRadius: 5,
      backgroundColor: theme.colors.secondaryBackground,
    },
  });

  return (
    <>
      {activeGame.item ? (
        activeGame.isLoading ? (
          <ActivityIndicator />
        ) : (
          <View style={[styles.container]}>
            <GameMomentumBar
              teamName={opposingTeam.nickname}
              teamPrimaryColor={opposingTeam.primaryColor}
              momentum={
                activeGame.item.momentum < 0
                  ? Math.abs(activeGame.item.momentum)
                  : 0
              }
              timeRemaining={GameEngine.getTimeRemaining(
                activeGame.item,
                opposingTeam.id,
              )}
              actionIconName="user-friends"
              onActionPressed={async () => {
                console.log('checking opponent roster');
              }}
            />
            <View style={[styles.gameFieldContainer]}>
              <GameField
                ballOn={activeGame.item.ballOn}
                opponentTeamName={opposingTeam.nickname}
                opponentTeamPrimaryColor={opposingTeam.primaryColor}
                myTeamName={ownerTeam.nickname}
                myTeamPrimaryColor={ownerTeam.primaryColor}
                assignments={selectedPlaybookPlay.play.assignments}
                defendingView={offenseTeam.id !== ownerTeam.id}
              />
              <View style={[styles.overlayContainer]}>
                <View style={[styles.controlPanelContainer]}>
                  {actingTeam.id === ownerTeam.id ? (
                    <GameControlPanel
                      selectedPlaybookPlay={selectedPlaybookPlay}
                      onPressPlaybook={() => {
                        setIsPlaybookOpen(true);
                        fadePlaybook('in');
                      }}
                      onSubmit={async () => {
                        console.log('submitted game action');
                        const gameAction = new GameActionDto();
                        gameAction.id = uuid.v4() as string;
                        gameAction.gameId = activeGame.item?.id || 'n/a';
                        gameAction.actingTeamSnapshotId = ownerTeam.id;
                        gameAction.playbookPlaySnapshotId =
                          selectedPlaybookPlay.id;
                        gameAction.flipped = false;
                        gameAction.noHuddle = false;
                        gameAction.hurryUp = false;
                        gameAction.assignments = [
                          ...selectedPlaybookPlay.play.assignments,
                        ];
                        await new GameActionsService().createGameAction(
                          gameAction,
                        );
                      }}
                    />
                  ) : (
                    <GameWaitingPanel />
                  )}
                </View>
                <GamePlayerCarousel
                  players={selectedPlaybookPlay.play.assignments.map(
                    assignment => {
                      return ownerTeam.players.filter(player => {
                        return (
                          player.position === assignment.depthChartPosition &&
                          player.depthChartSlot === assignment.depthChartSlot
                        );
                      })[0];
                    },
                  )}
                />
              </View>
            </View>
            <GameMomentumBar
              teamName={ownerTeam.nickname}
              teamPrimaryColor={ownerTeam.primaryColor}
              momentum={
                activeGame.item.momentum > 0
                  ? Math.abs(activeGame.item.momentum)
                  : 0
              }
              timeRemaining={GameEngine.getTimeRemaining(
                activeGame.item,
                ownerTeam.id,
              )}
              actionIconName="cog"
              onActionPressed={async () => {
                console.log('checking settings');
              }}
            />
            {isPlaybookOpen ? (
              <Animated.View
                style={[
                  styles.playbookOverlayContainer,
                  {opacity: animationPlaybookOpacity},
                ]}>
                <GamePlaybook
                  plays={ownerTeam.playbookPlays}
                  onSelect={(playbookPlayId: string) => {
                    const filteredPlaybookPlay = ownerTeam.playbookPlays.filter(
                      (
                        playbookPlay: GameDetailExtendedPlaybookPlaySnapshotDto,
                      ) => {
                        return playbookPlay.id === playbookPlayId;
                      },
                    )[0];

                    console.log(
                      `selected play ${filteredPlaybookPlay.play.name}`,
                    );

                    setSelectedPlaybookPlay(filteredPlaybookPlay);
                  }}
                  onClose={() => {
                    fadePlaybook('out');
                  }}
                />
              </Animated.View>
            ) : (
              <></>
            )}
          </View>
        )
      ) : (
        <></>
      )}
    </>
  );
};

export {GamePlayScreen};
