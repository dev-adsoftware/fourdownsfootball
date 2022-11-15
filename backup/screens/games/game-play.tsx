import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Easing,
  Text,
  Dimensions,
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
import {
  GameActionDto,
  GameDetailQueryResponseDto,
  PlayerSnapshotDto,
} from '../../services/dtos';
import {GameActionsService} from '../../services/game-actions';
import {GameDetailExtendedPlaySnapshotDto} from '../../services/dtos/queries/game-detail/game-detail-query-response.dto';
import {Alignment} from '../../services/dtos/types/alignment';
import {RouteProp} from '@react-navigation/native';

type Action = {type: 'increment'} | {type: 'clear'};

const reducer = (state: {timer: number}, action: Action): {timer: number} => {
  switch (action.type) {
    case 'increment':
      const newState = {timer: state.timer + 1};
      return newState;
    case 'clear':
      return {timer: 0};
  }
};

type Properties = {
  route: RouteProp<GameDetailTabParamList, 'Game Play'>;
  navigation: NativeStackNavigationProp<GameDetailTabParamList>;
};

const GamePlayScreen: React.FC<Properties> = ({}) => {
  const {ownerDashboard, activeGame} = useData();
  const {setLocalState: setLocalState} = activeGame;

  const opposingTeam = React.useMemo(
    () =>
      GameEngine.getOpposingTeam(
        activeGame.item as GameDetailQueryResponseDto,
        ownerDashboard.item.owner.id as string,
      ),
    [activeGame.item, ownerDashboard.item.owner.id],
  );

  const ownerTeam = React.useMemo(
    () =>
      GameEngine.getOwnerTeam(
        activeGame.item as GameDetailQueryResponseDto,
        ownerDashboard.item.owner.id as string,
      ),
    [activeGame.item, ownerDashboard.item.owner.id],
  );

  const actingTeam = React.useMemo(
    () =>
      GameEngine.getActingTeam(activeGame.item as GameDetailQueryResponseDto),
    [activeGame.item],
  );

  const offenseTeam = React.useMemo(
    () =>
      GameEngine.getOffenseTeam(activeGame.item as GameDetailQueryResponseDto),
    [activeGame.item],
  );

  const gameFieldAnimateFuncRef =
    React.useRef<(onAnimationFinished: () => void) => void>();

  const [isPlaybookOpen, setIsPlaybookOpen] = React.useState(false);
  const [selectedPlay, setSelectedPlay] = React.useState(ownerTeam.plays[0]);
  const [isWaitingForExpectedSequence, setIsWaitingForExpectedSequence] =
    React.useState(false);

  const animationPlaybookOpacity = React.useRef(new Animated.Value(0)).current;
  const fadePlaybook = React.useCallback(
    async (inOut: 'in' | 'out') => {
      return new Promise(resolve => {
        animationPlaybookOpacity.setValue(inOut === 'in' ? 0 : 1);
        Animated.timing(animationPlaybookOpacity, {
          toValue: inOut === 'in' ? 1 : 0,
          duration: 200,
          useNativeDriver: true,
          easing: Easing.linear,
        }).start(() => {
          if (inOut === 'out') {
            setIsPlaybookOpen(false);
            resolve(undefined);
          }
        });
      });
    },
    [animationPlaybookOpacity],
  );

  const animationResultTranslate = React.useRef(new Animated.Value(1)).current;
  const animationCarouselTranslate = React.useRef(
    new Animated.Value(actingTeam.id === ownerTeam.id ? 0 : 1),
  ).current;
  const animationControlPanelOpacity = React.useRef(
    new Animated.Value(0),
  ).current;

  const fadeControlPanel = React.useCallback(
    async (inOut: 'in' | 'out') => {
      return new Promise(resolve => {
        Animated.timing(animationControlPanelOpacity, {
          toValue: inOut === 'in' ? 1 : 0,
          duration: 200,
          useNativeDriver: true,
          easing: Easing.linear,
        }).start(({finished}) => {
          if (finished) {
            resolve(undefined);
          }
        });
      });
    },
    [animationControlPanelOpacity],
  );

  const animateResultBox = React.useCallback(async () => {
    return new Promise(resolve => {
      animationResultTranslate.setValue(1);
      Animated.sequence([
        Animated.spring(animationResultTranslate, {
          toValue: 0,
          useNativeDriver: true,
          friction: 5,
          delay: 500,
        }),
        Animated.spring(animationResultTranslate, {
          toValue: -1,
          useNativeDriver: true,
          delay: 2000,
        }),
      ]).start(async ({finished}) => {
        if (finished) {
          resolve(undefined);
        }
      });
    });
  }, [animationResultTranslate]);

  const animateCarousel = React.useCallback(
    async (inOut: 'in' | 'out') => {
      return new Promise(resolve => {
        Animated.sequence([
          Animated.timing(animationCarouselTranslate, {
            toValue: inOut === 'in' ? 0 : 1,
            duration: 300,
            useNativeDriver: true,
            easing: Easing.linear,
          }),
        ]).start(async ({finished}) => {
          if (finished) {
            resolve(undefined);
          }
        });
      });
    },
    [animationCarouselTranslate],
  );

  // console.log(activeGame.localState);
  // console.log(activeGame.item.sequence);

  const doAnimationSequence = React.useCallback(async () => {
    console.log('animation sequence');
    if (
      activeGame.localState?.lastPlayedSequence !== activeGame.item.sequence
    ) {
      console.log('sequence change');

      // Before doing any animations, reset the local state
      setIsWaitingForExpectedSequence(false);
      // setSelectedPlay(ownerTeam.plays[0]);

      animationResultTranslate.setValue(1);
      if (gameFieldAnimateFuncRef.current) {
        animationControlPanelOpacity.setValue(0);
        gameFieldAnimateFuncRef.current(async () => {
          await animateResultBox();
          await setLocalState({
            lastPlayedSequence: activeGame.item.sequence,
          });
          await fadeControlPanel('in');
        });
      }
    } else {
      if (gameFieldAnimateFuncRef.current) {
        animationControlPanelOpacity.setValue(0);
        gameFieldAnimateFuncRef.current(async () => {
          await fadeControlPanel('in');
        });
      }
    }
  }, [
    activeGame.localState.lastPlayedSequence,
    activeGame.item.sequence,
    setLocalState,
    animationResultTranslate,
    animationControlPanelOpacity,
    animateResultBox,
    fadeControlPanel,
  ]);

  React.useEffect(() => {
    doAnimationSequence();
  }, [doAnimationSequence]);

  React.useEffect(() => {
    console.log('component was remounted');
    return () => {
      console.log('component was unmounted');
    };
  }, []);

  const theme = useTheme();
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    gameFieldContainer: {
      backgroundColor: '#71A92C' || theme.colors.grass,
      width: '100%',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    resultOverlayContainer: {
      position: 'absolute',
      top: 50,
      left: 0,
      height: 70,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      // backgroundColor: 'red',
      zIndex: 1,
    },
    resultTextContainer: {
      backgroundColor: 'rgba(0,0,0,0.75)',
      paddingHorizontal: 20,
      paddingVertical: 5,
      borderColor: 'white',
      borderWidth: 3,
      borderRadius: 10,
      alignItems: 'center',
      width: '80%',
    },
    resultText: {
      ...theme.typography.title2,
      color: theme.colors.yellow,
      // fontSize: 40,
      fontWeight: 'bold',
      textShadowColor: theme.colors.black,
      textShadowOffset: {width: 5, height: 5},
      textShadowRadius: 5,
    },
    resultSubText: {
      ...theme.typography.caption1,
      color: theme.colors.white,
      // fontSize: 40,
      fontWeight: 'bold',
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
    waitingForOpponentContainer: {
      position: 'absolute',
      // bottom: '50%',
      bottom: 0,
      padding: 10,
      borderRadius: 5,
      borderColor: theme.colors.yellow,
      borderWidth: 3,
      backgroundColor: 'rgba(0,0,0,.8)',
      transform: [{translateY: -110 - 100 - 90}],
    },
    waitingforOpponentText: {
      ...theme.typography.subheading,
      color: theme.colors.white,
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
    emptyContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  const [timerState, timerDispatch] = React.useReducer(reducer, {timer: 0});

  React.useEffect(() => {
    const timerCb = setInterval(() => {
      timerDispatch({type: 'increment'});
    }, 1000);
    return () => {
      clearInterval(timerCb);
    };
  }, []);

  return (
    <>
      <View style={[styles.container]}>
        <GameMomentumBar
          teamName={opposingTeam.nickname}
          teamPrimaryColor={opposingTeam.primaryColor}
          momentum={
            activeGame.item.momentum < 0
              ? Math.abs(activeGame.item.momentum)
              : 0
          }
          timeRemaining={
            GameEngine.getTimeRemaining(activeGame.item, opposingTeam.id) -
            // 0
            (opposingTeam.id === actingTeam.id ? timerState.timer : 0)
          }
          actionIconName="user-friends"
          onActionPressed={async () => {
            await animateCarousel('out');
          }}
        />
        <View style={[styles.gameFieldContainer]}>
          <GameField
            ballOn={
              offenseTeam.id === ownerTeam.id
                ? 100 - activeGame.item.ballOn
                : activeGame.item.ballOn
            }
            direction={activeGame.item.direction}
            homeTeamName={activeGame.item.homeTeam.nickname}
            homeTeamPrimaryColor={activeGame.item.homeTeam.primaryColor}
            awayTeamName={activeGame.item.awayTeam.nickname}
            awayTeamPrimaryColor={activeGame.item.awayTeam.primaryColor}
            offenseAssignments={
              offenseTeam.id === ownerTeam.id
                ? actingTeam.id === ownerTeam.id
                  ? selectedPlay.assignments
                  : activeGame.item?.logs[activeGame.item.logs.length - 1]
                      .initiatingGameAction?.playSnapshot.assignments || []
                : []
            }
            defenseAssignments={
              offenseTeam.id !== ownerTeam.id
                ? actingTeam.id === ownerTeam.id
                  ? selectedPlay.assignments
                  : activeGame.item?.logs[activeGame.item.logs.length - 1]
                      .completingGameAction?.playSnapshot.assignments || []
                : []
            }
            defendingView={offenseTeam.id !== ownerTeam.id}
            animateFuncRef={gameFieldAnimateFuncRef}
          />
          <Animated.View
            style={[
              styles.resultOverlayContainer,
              {
                transform: [
                  {
                    translateX: animationResultTranslate.interpolate({
                      inputRange: [-1, 1],
                      outputRange: [
                        -Dimensions.get('screen').width,
                        Dimensions.get('screen').width,
                      ],
                    }),
                  },
                ],
              },
            ]}>
            <View style={[styles.resultTextContainer]}>
              <Text style={[styles.resultText]} numberOfLines={1}>
                {activeGame.item.logs[activeGame.item.logs.length - 1].headline}
              </Text>
              {activeGame.item.logs[
                activeGame.item.logs.length - 1
              ].details.map((detail: string, index: number) => {
                return (
                  <Text
                    key={`${detail}-${index}`}
                    style={[styles.resultSubText]}>
                    {detail}
                  </Text>
                );
              })}
            </View>
          </Animated.View>
          {actingTeam.id !== ownerTeam.id ? (
            <Animated.View
              style={[
                styles.waitingForOpponentContainer,
                {
                  opacity: animationControlPanelOpacity,
                },
              ]}>
              <Text style={[styles.waitingforOpponentText]}>
                Waiting for opponent
              </Text>
            </Animated.View>
          ) : (
            <></>
          )}
          <Animated.View
            style={[
              styles.overlayContainer,
              {opacity: animationControlPanelOpacity},
            ]}>
            <View
              style={[
                styles.controlPanelContainer,
                // {
                //   transform: [{translateY: 0}],
                // },
              ]}>
              {actingTeam.id === ownerTeam.id ? (
                <GameControlPanel
                  selectedPlay={selectedPlay}
                  isSplit={false}
                  isWaiting={
                    isWaitingForExpectedSequence ||
                    (!!activeGame.localState.expectedSequence &&
                      activeGame.localState.expectedSequence !==
                        activeGame.item.sequence)
                  }
                  onPressPlaybook={async () => {
                    setIsPlaybookOpen(true);
                    await fadePlaybook('in');
                  }}
                  onSubmit={async () => {
                    await animateCarousel('out');
                    setIsWaitingForExpectedSequence(true);

                    const expectedSequence = String(
                      Number(activeGame.item.sequence) + 1,
                    );
                    activeGame.setLocalState({
                      ...activeGame.localState,
                      expectedSequence,
                    });

                    const gameAction = new GameActionDto();
                    gameAction.id = uuid.v4() as string;
                    gameAction.gameId = activeGame.item?.id || 'n/a';
                    gameAction.gameSequence = activeGame.item?.sequence || '-1';
                    gameAction.initiatingGameActionId =
                      activeGame.item?.logs[
                        activeGame.item?.logs.length - 1
                      ].initiatingGameActionId;
                    gameAction.actingTeamSnapshotId = ownerTeam.id;
                    gameAction.playSnapshotId = selectedPlay.id;
                    gameAction.flipped = false;
                    gameAction.noHuddle = false;
                    gameAction.hurryUp = false;
                    gameAction.assignments = [...selectedPlay.assignments];

                    await new GameActionsService().createGameAction(gameAction);
                  }}
                />
              ) : (
                <>
                  {offenseTeam.id === ownerTeam.id ? (
                    <GameControlPanel
                      selectedPlay={
                        activeGame.item?.logs[activeGame.item.logs.length - 1]
                          .initiatingGameAction?.playSnapshot || selectedPlay
                      }
                      isSplit={true}
                      isWaiting={false}
                      onPressPlaybook={() => {}}
                      onSubmit={async () => {}}
                    />
                  ) : (
                    <></>
                  )}
                </>
              )}
            </View>
            <Animated.View
              style={{
                transform: [
                  {
                    translateY: animationCarouselTranslate.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 400],
                    }),
                  },
                ],
              }}>
              <GamePlayerCarousel
                players={
                  actingTeam.id === ownerTeam.id
                    ? selectedPlay.assignments.map(assignment => {
                        const filteredPlayer: PlayerSnapshotDto & {
                          alignment?: Alignment;
                        } = ownerTeam.players.filter(player => {
                          return (
                            player.position === assignment.depthChartPosition &&
                            player.depthChartSlot === assignment.depthChartSlot
                          );
                        })[0];
                        filteredPlayer.alignment = assignment.alignment;
                        return filteredPlayer;
                      })
                    : []
                }
              />
            </Animated.View>
          </Animated.View>
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
            await animateCarousel('in');
          }}
        />
        {isPlaybookOpen ? (
          <Animated.View
            style={[
              styles.playbookOverlayContainer,
              {opacity: animationPlaybookOpacity},
            ]}>
            <GamePlaybook
              plays={ownerTeam.plays.sort((a, b) => {
                if (a.formation > b.formation) {
                  return 1;
                } else if (a.formation === b.formation) {
                  if (a.name > b.name) {
                    return 1;
                  } else {
                    return -1;
                  }
                } else {
                  return -1;
                }
              })}
              onSelect={(playId: string) => {
                const filteredPlay = ownerTeam.plays.filter(
                  (play: GameDetailExtendedPlaySnapshotDto) => {
                    return play.id === playId;
                  },
                )[0];

                setSelectedPlay(filteredPlay);
              }}
              onClose={async () => {
                await fadePlaybook('out');
              }}
            />
          </Animated.View>
        ) : (
          <></>
        )}
      </View>
    </>
  );
};

export {GamePlayScreen};
