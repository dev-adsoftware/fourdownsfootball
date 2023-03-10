import React from 'react';
import {Spinner} from '../components/activity-indicators/spinner';
import {CircleAbbrAvatar} from '../components/avatars/circle-abbr-avatar';
import {CircleIconButton} from '../components/buttons/circle-icon-button';
import {useFadeInScreen} from '../components/navigation/fade-in-screen';
import {Icon} from '../primitives/icon';
import {ScrollView} from '../primitives/scroll-view';
import {Text} from '../primitives/text';
import {View} from '../primitives/view';
import {useData} from '../providers/data';
import {GamesByOwnerQueryArgsDto} from '../services/dtos';
import {
  GamesByOwnerExtendedGameDto,
  GamesByOwnerExtendedGameRequestDto,
} from '../services/dtos/queries/games-by-owner/games-by-owner-query-response.dto';
import {GameEngine} from '../utilities/game-engine';
import {GameDetailScreen} from './game-detail';

interface FriendliesGamesScreenProps {}

export const FriendliesGamesScreen: React.FC<
  FriendliesGamesScreenProps
> = _props => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [games, setGames] = React.useState<
    (GamesByOwnerExtendedGameRequestDto | GamesByOwnerExtendedGameDto)[]
  >([]);
  const data = useData();
  const {push: pushFadeInScreen} = useFadeInScreen();

  const fetchGameRequestsByOwner = React.useCallback(
    async (showLoadingIndicator?: boolean) => {
      if (data.owner?.id) {
        if (showLoadingIndicator) {
          setIsLoading(true);
        }
        const fetchedGameRequestsByOwner =
          await data.services.games.queryGamesByOwner(
            new GamesByOwnerQueryArgsDto().init({
              id: data.owner.id,
            }),
          );
        setGames(fetchedGameRequestsByOwner);
        setIsLoading(false);
      }
    },
    [data.owner, data.services.games],
  );

  React.useEffect(() => {
    fetchGameRequestsByOwner();
  }, [fetchGameRequestsByOwner]);
  return (
    <>
      <ScrollView flex={1} w="full">
        {isLoading ? (
          <>
            <View flex={1} py={20} alignItems="center">
              <Spinner />
            </View>
          </>
        ) : games.length === 0 ? (
          <>
            <View w="full" py={20} alignItems="center">
              <Icon icon="exclamation-triangle" color="error" size={20} />
              <Text
                py={20}
                text="Oops! No friendly games were found."
                typeFace="sourceSansProRegular"
                fontSize={17}
              />
            </View>
          </>
        ) : (
          <View mt={20}>
            {games.map((game, index) => {
              return (
                <View key={`${game.id}-${index}`} w="full" mt={-1}>
                  <View
                    onPress={() => {
                      pushFadeInScreen({
                        component: <GameDetailScreen gameId={game.id} />,
                      });
                    }}>
                    <View
                      row
                      bg="white"
                      alignItems="center"
                      px={10}
                      py={10}
                      borderHorizontalWidth={1}
                      borderColor="separator">
                      <CircleAbbrAvatar
                        text={
                          game.awayOwner.firstName.slice(0, 1).toUpperCase() ||
                          '?'
                        }
                      />
                      <View
                        flex={1}
                        px={20}
                        borderRightWidth={1}
                        borderRightColor="separator">
                        <View
                          flex={1}
                          row
                          justifyContent="space-between"
                          alignItems="center">
                          <View>
                            <Text
                              text={
                                game.awayTeam
                                  ? `${game.awayTeam.town.name.toUpperCase()} ${game.awayTeam.nickname.toUpperCase()}`
                                  : 'TBD'
                              }
                              typeFace="klavikaCondensedMedium"
                              fontSize={18}
                            />
                            <Text
                              mt={-5}
                              text={`${game.awayOwner.firstName} ${game.awayOwner.lastName}`}
                              typeFace="sourceSansProRegular"
                              fontSize={14}
                            />
                          </View>
                          {!GameEngine.isHomeTeamOnOffense(
                            game as GamesByOwnerExtendedGameDto,
                          ) ? (
                            <View flex={1} pl={10}>
                              <Icon
                                icon="football-ball"
                                color="football"
                                size={10}
                              />
                            </View>
                          ) : (
                            <></>
                          )}
                          <Text
                            text={
                              (game as GamesByOwnerExtendedGameDto)
                                .awayTeamScore
                            }
                            typeFace="klavikaCondensedMedium"
                            fontSize={22}
                          />
                        </View>
                        <View
                          flex={1}
                          row
                          justifyContent="space-between"
                          alignItems="center">
                          <View>
                            <Text
                              mt={3}
                              text={
                                game.homeTeam
                                  ? `${game.homeTeam.town.name.toUpperCase()} ${game.homeTeam.nickname.toUpperCase()}`
                                  : 'N/A'
                              }
                              typeFace="klavikaCondensedMedium"
                              fontSize={18}
                            />
                            <Text
                              mt={-5}
                              text={`${game.homeOwner.firstName} ${game.homeOwner.lastName}`}
                              typeFace="sourceSansProRegular"
                              fontSize={14}
                            />
                          </View>
                          {GameEngine.isHomeTeamOnOffense(
                            game as GamesByOwnerExtendedGameDto,
                          ) ? (
                            <View flex={1} pl={10}>
                              <Icon
                                icon="football-ball"
                                color="football"
                                size={10}
                              />
                            </View>
                          ) : (
                            <></>
                          )}
                          <Text
                            text={
                              (game as GamesByOwnerExtendedGameDto)
                                .homeTeamScore
                            }
                            typeFace="klavikaCondensedMedium"
                            fontSize={22}
                          />
                        </View>
                      </View>
                      <View alignItems="center" w={70}>
                        <CircleIconButton
                          icon={
                            GameEngine.canNudgeOrWithdraw(
                              game,
                              data.owner?.id as string,
                            )
                              ? 'hourglass-half'
                              : GameEngine.canRSVP(
                                  game,
                                  data.owner?.id as string,
                                )
                              ? 'envelope'
                              : GameEngine.canAct(
                                  game as GamesByOwnerExtendedGameDto,
                                  data.owner?.id as string,
                                )
                              ? 'play'
                              : 'clock'
                          }
                          onPress={() => {}}
                          bg="white"
                          color="primary"
                          size={10}
                        />
                        {GameEngine.isInProgress(game) ? (
                          <Text
                            textAlign="center"
                            text={`${GameEngine.getPeriodName(
                              (game as GamesByOwnerExtendedGameDto).period,
                            )} - ${GameEngine.formatGameTime(
                              (game as GamesByOwnerExtendedGameDto)
                                .timeRemaining,
                            )}`}
                            typeFace="klavikaCondensedRegular"
                            fontSize={12}
                          />
                        ) : (
                          <></>
                        )}
                      </View>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        )}
      </ScrollView>
    </>
  );
};
