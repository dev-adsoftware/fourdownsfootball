import React from 'react';
import {IconButton} from '../components/buttons/icon-button';
import {Link} from '../components/buttons/link';
import {useFadeInScreen} from '../components/navigation/fade-in-screen';
import {Icon} from '../components/primitives/icon';
import {Pressable} from '../components/primitives/pressable';
import {Text} from '../components/primitives/text';
import {View} from '../components/primitives/view';
import {ProgressBar} from '../components/progress-indicators/progress-bar';
import {PlayerCarousel} from '../components/scrollables/player-carousel';
import {useData} from '../providers/data';
import {useTheme} from '../providers/theme';
import {GameDetailQueryResponseDto, PlayerSnapshotDto} from '../services/dtos';
import {GameState} from '../services/dtos/types/game-state';
import {GameEngine} from '../utilities/game-engine';
import {GameField} from '../components/game-play/game-field';
import {SelectRSVPTeamScreen} from './select-rsvp-team';
import {GameControlPanel} from '../components/game-play/game-control-panel';
import {Alignment} from '../services/dtos/types/alignment';

interface GamePlayScreenProps {
  game: GameDetailQueryResponseDto;
}

export const GamePlayScreen: React.FC<GamePlayScreenProps> = props => {
  const [isOpposingTeamCarouselVisible, setIsOpposingTeamCarouselVisible] =
    React.useState(false);

  const {push} = useFadeInScreen();
  const data = useData();
  const theme = useTheme();

  const gameFieldAnimateFuncRef =
    React.useRef<(onAnimationFinished: () => void) => void>();

  React.useEffect(() => {
    if (gameFieldAnimateFuncRef.current) {
      gameFieldAnimateFuncRef.current(() => {});
    }
  }, [props.game]);

  const formatTime = React.useCallback((seconds: number): string => {
    return `${seconds / (24 * 3600)} days, ${
      (seconds % (24 * 3600)) / 3600
    } hours, ${((seconds % (24 * 3600)) % 3600) / 60} min, ${seconds % 60} sec`;
  }, []);

  const ownerTeam = React.useMemo(
    () => GameEngine.getOwnerTeam(props.game, data.owner!.id),
    [props.game, data.owner],
  );

  const opposingTeam = React.useMemo(
    () => GameEngine.getOpposingTeam(props.game, data.owner!.id),
    [props.game, data.owner],
  );

  const actingTeam = React.useMemo(
    () => GameEngine.getActingTeam(props.game),
    [props.game],
  );

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

  const isOnOffense = React.useMemo(
    () => GameEngine.isOnOffense(props.game, data.owner?.id),
    [props.game, data.owner],
  );

  return (
    <>
      <View w="full" flex={1} bg="oddLayerSurface" pt={0} alignItems="center">
        {GameEngine.canNudgeOrWithdraw(props.game, data.owner?.id as string) ? (
          <View flex={1} alignItems="center" justifyContent="space-between">
            <View alignItems="center">
              <View py={20}>
                <Icon name="hourglass-half" color="primary" size="3xl" />
              </View>
              <Text
                text={`Awaiting RSVP from ${
                  props.game.awayTeamId === undefined
                    ? props.game.awayOwner.firstName
                    : props.game.homeOwner.firstName
                }`}
                fontSize="body"
                typeFace="sourceSansProRegular"
              />
              <View
                row
                alignItems="center"
                bg="primary"
                borderRadius="circle"
                px={20}
                py={5}
                m={20}>
                <Text
                  text="NUDGE"
                  typeFace="klavikaCondensedBoldItalic"
                  fontSize="title3"
                  color="white"
                  mr={10}
                />
                <Icon name="hand-point-right" color="white" size="xl" />
              </View>
            </View>
            <View pb={30}>
              <Link text="REVOKE INVITATION" onPress={() => {}} />
            </View>
          </View>
        ) : GameEngine.canRSVP(props.game, data.owner?.id as string) ? (
          <>
            <View flex={1} alignItems="center" justifyContent="space-between">
              <View alignItems="center">
                <View py={20}>
                  <Icon name="envelope" color="primary" size="3xl" />
                </View>
                <Text
                  textAlign="center"
                  text={`${
                    props.game.awayTeamId === undefined
                      ? props.game.homeOwner.firstName
                      : props.game.awayOwner.firstName
                  } invited you to play a game.\nRSVP to start the game.`}
                  fontSize="body"
                  typeFace="sourceSansProRegular"
                />
                <Pressable
                  onPress={() => {
                    push({
                      component: <SelectRSVPTeamScreen game={props.game} />,
                    });
                  }}>
                  <View
                    row
                    alignItems="center"
                    bg="primary"
                    borderRadius="circle"
                    px={20}
                    py={5}
                    m={20}>
                    <Text
                      text="RSVP"
                      typeFace="klavikaCondensedBoldItalic"
                      fontSize="title3"
                      color="white"
                      mr={10}
                    />
                    <Icon name="reply" color="white" size="xs" />
                  </View>
                </Pressable>
              </View>
              <View pb={30}>
                <Link text="REJECT INVITATION" onPress={() => {}} />
              </View>
            </View>
          </>
        ) : props.game.state === GameState.Loading ? (
          <>
            <Text
              text="loading screen"
              typeFace="sourceSansProRegular"
              fontSize="body"
            />
          </>
        ) : (
          <>
            <View
              row
              alignItems="center"
              justifyContent="space-between"
              py={5}
              w="full"
              bg="oddLayerSurface"
              borderBottomColor="separator"
              borderBottomWidth={1}>
              <View row alignItems="center" pl={15}>
                <Icon name="stopwatch" color="primaryText" size="2xs" />
                <Text
                  pl={5}
                  text={formatTime(props.game.homeTeamTimeRemaining)}
                  typeFace="sourceSansProRegular"
                  fontSize="caption2"
                />
              </View>
              <View flex={1} bg="evenLayerSurface" />
              <View
                row
                justifyContent="space-between"
                w={50}
                mr={15}
                bg="primary"
                px={8}
                py={3}
                borderRadius={5}>
                <IconButton
                  icon="users"
                  color="white"
                  size="2xs"
                  onPress={() => {
                    setIsOpposingTeamCarouselVisible(
                      !isOpposingTeamCarouselVisible,
                    );
                  }}
                />
                <IconButton
                  icon="caret-down"
                  color="white"
                  size="2xs"
                  onPress={() => {}}
                />
              </View>
            </View>
            <View flex={1} w="full" bg="grass">
              <View
                position="absolute"
                zIndex={1000}
                opacity={isOpposingTeamCarouselVisible ? 1 : 0}>
                <PlayerCarousel players={opposingTeam.players} />
              </View>
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
            <GameControlPanel
              isWaitingForOpponent={!canAct}
              plays={ownerTeam.plays}
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
            />
            <View
              row
              alignItems="center"
              justifyContent="space-between"
              py={5}
              w="full"
              bg="oddLayerSurface"
              borderTopColor="separator"
              borderTopWidth={1}>
              <View row alignItems="center" pl={15}>
                <Icon name="stopwatch" color="primaryText" size="2xs" />
                <Text
                  pl={5}
                  text={formatTime(props.game.awayTeamTimeRemaining)}
                  typeFace="sourceSansProRegular"
                  fontSize="caption2"
                />
              </View>
              <View flex={1} bg="evenLayerSurface" />
              <View>
                <IconButton
                  icon="tachometer-alt"
                  color="primaryText"
                  size="2xs"
                  onPress={() => {}}
                />
              </View>
              <View pl={5} pr={15}>
                <ProgressBar
                  unfilledColor="black"
                  filledColor={theme.getRedGreenGradient(props.game.momentum)}
                  percentComplete={props.game.momentum}
                  height={12}
                />
              </View>
            </View>
          </>
        )}
      </View>
    </>
  );
};
