import React from 'react';
import {Link} from '../components/buttons/link';
import {useFadeInScreen} from '../components/navigation/fade-in-screen';
import {Icon} from '../primitives/icon';
import {Text} from '../primitives/text';
import {View} from '../primitives/view';
import {PlayerCarousel} from '../components/scrollables/player-carousel';
import {useData} from '../providers/data';
import {
  GameDetailQueryResponseDto,
  PlayCallDto,
  PlayerSnapshotDto,
} from '../services/dtos';
import {GameState} from '../services/dtos/types/game-state';
import {GameEngine} from '../utilities/game-engine';
import {GameField} from '../components/game-play/game-field';
import {SelectRSVPTeamScreen} from './select-rsvp-team';
import {GameControlPanel} from '../components/game-play/game-control-panel';
import {Alignment} from '../services/dtos/types/alignment';
import {OpponentToolbar} from '../components/game-play/opponent-toolbar';
import {OwnerToolbar} from '../components/game-play/owner-toolbar';

interface GamePlayScreenProps {
  game: GameDetailQueryResponseDto;
}

export const GamePlayScreen: React.FC<GamePlayScreenProps> = props => {
  const [isOpposingTeamCarouselVisible, setIsOpposingTeamCarouselVisible] =
    React.useState(false);

  const {push} = useFadeInScreen();
  const data = useData();

  const gameFieldAnimateFuncRef =
    React.useRef<(onAnimationFinished: () => void) => void>();

  React.useEffect(() => {
    if (gameFieldAnimateFuncRef.current) {
      gameFieldAnimateFuncRef.current(() => {});
    }
  }, [props.game]);

  const ownerTeam = React.useMemo(
    () => GameEngine.getOwnerTeam(props.game, data.owner!.id),
    [props.game, data.owner],
  );

  const opposingTeam = React.useMemo(
    () => GameEngine.getOpposingTeam(props.game, data.owner!.id),
    [props.game, data.owner],
  );

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
                <Icon icon="hourglass-half" color="primary" size={20} />
              </View>
              <Text
                text={`Awaiting RSVP from ${
                  props.game.awayTeamId === undefined
                    ? props.game.awayOwner.firstName
                    : props.game.homeOwner.firstName
                }`}
                fontSize={17}
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
                  fontSize={20}
                  color="white"
                  mr={10}
                />
                <Icon icon="hand-point-right" color="white" size={20} />
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
                  <Icon icon="envelope" color="primary" size={24} />
                </View>
                <Text
                  textAlign="center"
                  text={`${
                    props.game.awayTeamId === undefined
                      ? props.game.homeOwner.firstName
                      : props.game.awayOwner.firstName
                  } invited you to play a game.\nRSVP to start the game.`}
                  fontSize={17}
                  typeFace="sourceSansProRegular"
                />
                <View
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
                      fontSize={20}
                      color="white"
                      mr={10}
                    />
                    <Icon icon="reply" color="white" size={12} />
                  </View>
                </View>
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
              fontSize={17}
            />
          </>
        ) : (
          <>
            <OpponentToolbar
              timeRemaining={props.game.homeTeamTimeRemaining}
              onPressHuddleButton={() => {
                setIsOpposingTeamCarouselVisible(
                  !isOpposingTeamCarouselVisible,
                );
              }}
            />
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
            />
            <OwnerToolbar
              timeRemaining={props.game.awayTeamTimeRemaining}
              momentum={props.game.momentum}
            />
          </>
        )}
      </View>
    </>
  );
};
