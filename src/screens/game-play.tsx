import React from 'react';
import {useFadeInScreen} from '../components/navigation/fade-in-screen';
import {Text} from '../primitives/text';
import {View} from '../primitives/view';
import {useData} from '../providers/data';
import {
  GameDetailQueryResponseDto,
  PlayCallDto,
  PlaySnapshotDto,
} from '../services/dtos';
import {GameState} from '../services/dtos/types/game-state';
import {GameEngine} from '../utilities/game-engine';
import {GameField} from '../components/game-play/game-field';
import {SAFE_AREA_PADDING_BOTTOM} from '../constants';
import {CircleIconButton} from '../components/buttons/circle-icon-button';
import {useWindowDimensions} from 'react-native';
import {ModalScreen} from './modal-screen';
import {GameNudgeScreen} from './game-nudge';
import {GameRsvpScreen} from './game-rsvp';
import {LoadingScreen} from './loading';
import {GamePlayButton} from '../components/buttons/game-play-button';
import {PlayCallScreen} from './play-call';
import {last, tail} from 'lodash';

interface GamePlayScreenProps {
  game: GameDetailQueryResponseDto;
}

export const GamePlayScreen: React.FC<GamePlayScreenProps> = props => {
  const {push: pushFadeInScreen, pop: popFadeInScreen} = useFadeInScreen();
  const data = useData();

  const {width} = useWindowDimensions();

  const gameFieldAnimateFuncRef =
    React.useRef<(onAnimationFinished: () => void) => void>();

  React.useEffect(() => {
    if (gameFieldAnimateFuncRef.current) {
      gameFieldAnimateFuncRef.current(() => {});
    }
  }, [props.game]);

  const modalWindowCloseFuncRef = React.useRef<() => void>();

  const ownerTeam = React.useMemo(
    () => GameEngine.getOwnerTeam(props.game, data.owner!.id),
    [props.game, data.owner],
  );

  // const opposingTeam = React.useMemo(
  //   () => GameEngine.getOpposingTeam(props.game, data.owner!.id),
  //   [props.game, data.owner],
  // );

  // const actingTeam = React.useMemo(
  //   () => GameEngine.getActingTeam(props.game),
  //   [props.game],
  // );

  const offenseTeam = React.useMemo(
    () => GameEngine.getOffenseTeam(props.game),
    [props.game],
  );

  const defenseTeam = React.useMemo(
    () => GameEngine.getDefenseTeam(props.game),
    [props.game],
  );

  const canAct = React.useMemo(
    () => GameEngine.canAct(props.game, data.owner?.id),
    [props.game, data.owner],
  );

  const canNudgeOrWithdraw = React.useMemo(
    () => GameEngine.canNudgeOrWithdraw(props.game, data.owner?.id as string),
    [props.game, data.owner],
  );

  const canRSVP = React.useMemo(
    () => GameEngine.canRSVP(props.game, data.owner?.id as string),
    [props.game, data.owner],
  );

  const isOnOffense = React.useMemo(
    () => GameEngine.isOnOffense(props.game, data.owner?.id),
    [props.game, data.owner],
  );

  const [backdropHeight, setBackdropHeight] = React.useState(0);
  const [selectedPlay, setSelectedPlay] = React.useState<
    PlaySnapshotDto | undefined
  >(ownerTeam ? ownerTeam.plays[0] : undefined);

  return (
    <>
      <View
        w="full"
        flex={1}
        bg="oddLayerSurface"
        pt={0}
        alignItems="center"
        onLayout={e => {
          setBackdropHeight(e.nativeEvent.layout.height);
        }}>
        {canNudgeOrWithdraw ? (
          <GameNudgeScreen game={props.game} />
        ) : canRSVP ? (
          <GameRsvpScreen game={props.game} />
        ) : props.game.state === GameState.Loading ? (
          <LoadingScreen />
        ) : (
          <>
            <View flex={1} w="full" bg="grass">
              <GameField
                ballOn={{
                  previous: GameEngine.flipBallOn(props.game, data.owner?.id),
                  current: GameEngine.flipBallOn(props.game, data.owner?.id),
                }}
                direction={props.game.direction}
                homeTeamName={props.game.homeTeam?.nickname || 'unknown'}
                homeTeamEndZoneColor={
                  props.game.homeTeam?.primaryColor || 'black'
                }
                awayTeamName={props.game.awayTeam?.nickname || 'unknown'}
                awayTeamEndZoneColor={
                  props.game.awayTeam?.primaryColor || 'black'
                }
                offenseAssignments={
                  isOnOffense ? offenseTeam.plays[0].assignments : []
                }
                defenseAssignments={
                  !isOnOffense && canAct ? defenseTeam.plays[0].assignments : []
                }
                animateFuncRef={gameFieldAnimateFuncRef}
                defendingView={!isOnOffense}
              />
            </View>

            <GamePlayButton
              top={10}
              left={20}
              icon="user-friends"
              onPress={() => {
                console.log('opening opponent roster');
              }}
            />

            <GamePlayButton
              top={10}
              right={20}
              icon="user-clock"
              onPress={() => {
                console.log('showing opponent clock');
              }}
            />

            <GamePlayButton
              bottom={SAFE_AREA_PADDING_BOTTOM + 90}
              left={20}
              icon="stopwatch"
              onPress={() => {
                console.log('showing owner clock');
              }}
            />

            <GamePlayButton
              bottom={SAFE_AREA_PADDING_BOTTOM + 45}
              left={20}
              icon="comment-alt"
              onPress={() => {
                console.log('showing chat');
              }}
            />

            <GamePlayButton
              bottom={SAFE_AREA_PADDING_BOTTOM}
              left={20}
              icon="cogs"
              onPress={() => {
                console.log('opening game settings');
              }}
            />

            <GamePlayButton
              bottom={SAFE_AREA_PADDING_BOTTOM + 100}
              left={width / 2 - 40 - 30}
              icon="bullseye"
              onPress={() => {
                console.log('showing targets');
              }}
              disabled={!canAct || props.game.state === GameState.Kickoff}
            />

            <GamePlayButton
              bottom={SAFE_AREA_PADDING_BOTTOM + 100}
              left={width / 2 - 20}
              icon="sync-alt"
              onPress={() => {
                console.log('flipping');
              }}
              disabled={!canAct || props.game.state === GameState.Kickoff}
            />

            <GamePlayButton
              bottom={SAFE_AREA_PADDING_BOTTOM + 100}
              left={width / 2 + 30}
              icon="clock"
              onPress={() => {
                console.log('showing time management config');
              }}
              disabled={!canAct || props.game.state === GameState.Kickoff}
            />

            <View
              position="absolute"
              bottom={SAFE_AREA_PADDING_BOTTOM + 44 - 26}
              left={width / 2 - 30 - 60}
              w={60}
              h={52}
              pl={5}
              borderColor="black"
              borderWidth={1}
              borderLeftRadius="circle"
              bg="darkSurface"
              alignItems="flex-start"
              justifyContent="center">
              <CircleIconButton
                disabled={!canAct}
                opaque
                icon="book"
                onPress={() => {
                  pushFadeInScreen({
                    component: (
                      <ModalScreen
                        h={backdropHeight}
                        icon="book"
                        iconColor="playbook"
                        title="PLAY CALL"
                        closeFuncRef={modalWindowCloseFuncRef}
                        onClose={() => {
                          popFadeInScreen();
                        }}>
                        <PlayCallScreen
                          plays={ownerTeam.plays}
                          onSelect={play => {
                            setSelectedPlay(play);
                            if (modalWindowCloseFuncRef.current) {
                              modalWindowCloseFuncRef.current();
                            }
                          }}
                        />
                      </ModalScreen>
                    ),
                  });
                }}
                size={10}
                borderColor="black"
                borderWidth={1}
                bg="oddLayerSurface"
                color={!canAct ? 'disabled' : 'playbook'}
              />
            </View>
            <View
              position="absolute"
              bottom={SAFE_AREA_PADDING_BOTTOM}
              right={width / 2 - 44}
              w={88}
              h={88}
              bg="white"
              borderRadius="circle"
              borderWidth={2}
              borderColor="black"
              alignItems="center"
              justifyContent="center"
              zIndex={9999}>
              <CircleIconButton
                disabled={!canAct}
                opaque
                icon="play"
                onPress={async () => {
                  const currentPossession = last(props.game.possessions);
                  const currentPossessionNumber = props.game.possessions.length;
                  const currentPlayResult = last(
                    currentPossession!.playResults,
                  );
                  const playResultNumber =
                    currentPlayResult!.playResultNumber + (isOnOffense ? 1 : 0);
                  await data.services.games.postPlayCall(
                    new PlayCallDto().init({
                      id: `${props.game.id}-${String(playResultNumber)}-${
                        isOnOffense ? 'offense' : 'defense'
                      }`,
                      sequence: '0',
                      lastUpdateDate: new Date().toISOString(),
                      lastUpdatedBy: data.owner!.id,
                      gameId: props.game.id,
                      possessionNumber: currentPossessionNumber,
                      playResultNumber: playResultNumber,
                      playSnapshotId: selectedPlay?.id, //ownerTeam.plays[0].id,
                      assignments: selectedPlay?.assignments, // ownerTeam.plays[0].assignments,
                    }),
                  );
                  await data.services.games.waitForGameSequenceUpdate(
                    props.game.id,
                    String(Number(props.game.sequence) + 1),
                  );
                }}
                size={20}
                offsetPadding={5}
                bg="white"
                color={!canAct ? 'disabled' : 'primary'}
              />
            </View>
            <View
              position="absolute"
              bottom={SAFE_AREA_PADDING_BOTTOM + 44 - 26}
              left={width / 2 + 30}
              w={60}
              h={52}
              pr={5}
              bg="darkSurface"
              borderColor="black"
              borderWidth={1}
              borderRightRadius="circle"
              alignItems="flex-end"
              justifyContent="center">
              <CircleIconButton
                opaque
                icon="users-cog"
                onPress={() => {
                  pushFadeInScreen({
                    component: (
                      <ModalScreen
                        h={backdropHeight}
                        icon="users-cog"
                        iconColor="primary"
                        title="SUBSTITUTIONS"
                        closeFuncRef={modalWindowCloseFuncRef}
                        onClose={() => {
                          popFadeInScreen();
                        }}>
                        <></>
                      </ModalScreen>
                    ),
                  });
                }}
                size={10}
                borderColor="black"
                borderWidth={1}
                bg="oddLayerSurface"
                color="darkText"
              />
            </View>
            <View
              position="absolute"
              bottom={SAFE_AREA_PADDING_BOTTOM + 48}
              left={width / 2 + 30 + 36}
              w={16}
              h={16}
              alignItems="center"
              justifyContent="center">
              <CircleIconButton
                icon="exclamation"
                onPress={() => {
                  pushFadeInScreen({
                    component: (
                      <ModalScreen
                        h={backdropHeight}
                        icon="users-cog"
                        iconColor="primary"
                        title="SUBSTITUTIONS"
                        closeFuncRef={modalWindowCloseFuncRef}
                        onClose={() => {
                          popFadeInScreen();
                        }}>
                        <></>
                      </ModalScreen>
                    ),
                  });
                }}
                size={4}
                bg="error"
              />
            </View>
            {canAct ? (
              <View
                position="absolute"
                bottom={SAFE_AREA_PADDING_BOTTOM + 145}
                left={0}
                w={width}
                row
                bg="transparent"
                alignItems="center"
                justifyContent="center">
                <Text
                  ml={10}
                  // flex={1}
                  bg="transparentVeryDark"
                  borderRadius={12}
                  borderWidth={1}
                  numberOfLines={1}
                  color="white"
                  typeFace="klavikaCondensedBoldItalic"
                  fontSize={24}
                  text={selectedPlay.name.toUpperCase()}
                  textShadowColor="black"
                  textShadowOffset={{width: 1, height: 1}}
                  textShadowRadius={2}
                  px={10}
                />
              </View>
            ) : (
              <></>
            )}
            {!canAct ? (
              <View
                position="absolute"
                top={50}
                left={0}
                w={width}
                row
                bg="transparent"
                alignItems="center"
                justifyContent="center">
                {/* <Icon icon="clock" color="white" size={14} /> */}
                <Text
                  ml={10}
                  // flex={1}
                  bg="transparentVeryDark"
                  borderRadius={8}
                  borderWidth={1}
                  numberOfLines={1}
                  color="white"
                  typeFace="klavikaCondensedBoldItalic"
                  fontSize={24}
                  text={'Waiting for Opponent'.toUpperCase()}
                  textShadowColor="black"
                  textShadowOffset={{width: 1, height: 1}}
                  textShadowRadius={2}
                  px={10}
                />
              </View>
            ) : (
              <></>
            )}

            {/* <GameControlPanel
              isWaitingForOpponent={!canAct}
              plays={ownerTeam.plays}
              currentPlayCall={new PlayCallDto().init({
                id: `${props.game.id}-${String(
                  Number(props.game.sequence) + 1,
                )}-${isOnOffense ? 'offense' : 'defense'}`,
                sequence: '0',
                lastUpdateDate: new Date().toISOString(),
                lastUpdatedBy: data.owner!.id,
                gameId: props.game.id,
                possessionNumber: props.game.possessions.length,
                playResultNumber: Number(props.game.sequence) + 1,
                playSnapshotId: ownerTeam.plays[0].id,
                assignments: ownerTeam.plays[0].assignments,
              })}
            />
            <PlayerCarousel
              players={
                canAct
                  ? offenseTeam.plays[0].assignments.map(assignment => {
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
                  : ownerTeam.players
              }
            /> */}
          </>
        )}
      </View>
    </>
  );
};
