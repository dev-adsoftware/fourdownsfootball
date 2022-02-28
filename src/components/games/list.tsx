import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {InjectedThemeProps, withTheme} from '../../hoc/with-theme';
import {DataSetSegment} from '../../providers/data';
import {GameInvite} from '../../services/game-invites';
import {GameParticipant} from '../../services/game-participants';
import {GameRequest} from '../../services/game-requests';
import {Game, createGameShell} from '../../services/games';
import {Team} from '../../services/teams';
import {GamesStackParamList} from '../../stacks/games';
import {Button} from '../core/buttons/button';
import {SectionListItemSeparator} from '../core/section-list/sectionlist-item-separator';

interface Properties extends InjectedThemeProps {
  gameRequests: DataSetSegment<GameRequest>;
  gameInvites: DataSetSegment<GameInvite>;
  gameParticipants: DataSetSegment<GameParticipant>;
  navigation: NativeStackNavigationProp<GamesStackParamList>;
}

const Component: React.FC<Properties> = props => {
  const {gameRequests, gameInvites, gameParticipants, navigation, theme} =
    props;

  const refresh = () => {
    gameRequests.refresh();
    gameInvites.refresh();
    gameParticipants.refresh();
  };

  const styles = StyleSheet.create({
    loadingContainer: {marginTop: 20},
    emptyContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 100,
    },
    oopsCircle: {
      borderWidth: 2,
      borderColor: theme.colors.error,
      width: 50,
      height: 50,
      borderRadius: 25,
      alignItems: 'center',
      marginVertical: 10,
    },
    oopsIcon: {marginTop: 12},
    oopsText: {color: theme.colors.text, marginBottom: 20},
    createButton: {
      backgroundColor: theme.colors.blue,
      marginVertical: 30,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    createButtonIcon: {
      marginRight: 10,
    },
    listContainer: {
      backgroundColor: theme.colors.secondaryBackground,
    },
    groupContainer: {
      backgroundColor: theme.colors.background,
      marginTop: 5,
      marginHorizontal: 3,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: theme.colors.separator,
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowRadius: 3,
      shadowOffset: {width: 0, height: 3},
      elevation: 3,
      padding: 15,
    },
    groupHeader: {
      paddingBottom: 10,
      marginBottom: 10,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.separator,
    },
    groupHeaderText: {
      ...theme.typography.footnote,
      color: theme.colors.text,
      fontWeight: 'bold',
      letterSpacing: 1,
    },
    itemContentRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    itemTeamsContainer: {
      flex: 4,
      borderRightWidth: 1,
      borderRightColor: theme.colors.separator,
    },
    itemStatusContainer: {flex: 2, marginLeft: 10},
    itemStatusText: {
      ...theme.typography.footnote,
      color: theme.colors.text,
    },
    itemAvatar: {
      borderWidth: 1,
      borderColor: theme.colors.separator,
      width: 24,
      height: 24,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 8,
      backgroundColor: theme.colors.green,
    },
    itemAvatarText: {
      ...theme.typography.caption2,
      color: theme.colors.white,
    },
    itemPlayIcon: {
      width: 15,
    },
    itemPossessionIcon: {
      marginLeft: 5,
    },
    itemTeamRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 3,
    },
    itemTeamRowInProgress: {
      flex: 9,
      flexDirection: 'row',
      alignItems: 'center',
    },
    itemTeamRowInProgressScoreContainer: {
      flex: 1,
      marginRight: 5,
    },
    itemTeamRowInProgressScoreText: {
      ...theme.typography.footnote,
      textAlign: 'right',
    },
    itemTeamNameText: {
      ...theme.typography.body,
      color: theme.colors.text,
    },
    itemTeamRowWinningTeamNameText: {
      fontWeight: '500',
    },
    itemTeamRowWinningTeamScoreText: {
      fontWeight: '700',
    },
    rsvpButtonContainer: {
      flex: 1,
      width: '75%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    footerPadding: {
      backgroundColor: theme.colors.secondaryBackground,
      height: 1,
      marginTop: 10,
    },
  });

  const getAvatarAbbreviation = (team?: Team) => {
    if (!team) {
      return '?';
    }

    return `${team.town.name.slice(0, 1).toUpperCase()}${team.nickname
      .slice(0, 1)
      .toUpperCase()}`;
  };

  const renderGameRequest = (game: Game) => {
    return (
      <Pressable style={[styles.itemContentRow]} onPress={() => {}}>
        <View style={[styles.itemTeamsContainer]}>
          <View style={[styles.itemTeamRow]}>
            <View style={[styles.itemAvatar]}>
              <Text style={[styles.itemAvatarText]}>
                {getAvatarAbbreviation(game.awayTeam)}
              </Text>
            </View>
            <Text style={[styles.itemTeamNameText]}>
              {game.awayTeam?.name || 'TBD'}
            </Text>
          </View>
          <View style={[styles.itemTeamRow]}>
            <View style={[styles.itemAvatar]}>
              <Text style={[styles.itemAvatarText]}>
                {getAvatarAbbreviation(game.homeTeam)}
              </Text>
            </View>
            <Text style={[styles.itemTeamNameText]}>
              {game.homeTeam?.name || 'TBD'}
            </Text>
          </View>
        </View>
        <View style={[styles.itemStatusContainer]}>
          <Text style={[styles.itemStatusText]}>{game.state}</Text>
        </View>
      </Pressable>
    );
  };

  const renderGameInvite = (game: Game) => {
    return (
      <Pressable style={[styles.itemContentRow]} onPress={() => {}}>
        <View style={[styles.itemTeamsContainer]}>
          <View style={[styles.itemTeamRow]}>
            <View style={[styles.itemAvatar]}>
              <Text style={[styles.itemAvatarText]}>
                {getAvatarAbbreviation(game.awayTeam)}
              </Text>
            </View>
            <Text style={[styles.itemTeamNameText]}>
              {game.awayTeam?.name || 'TBD'}
            </Text>
          </View>
          <View style={[styles.itemTeamRow]}>
            <View style={[styles.itemAvatar]}>
              <Text style={[styles.itemAvatarText]}>
                {getAvatarAbbreviation(game.homeTeam)}
              </Text>
            </View>
            <Text style={[styles.itemTeamNameText]}>
              {game.homeTeam?.name || 'TBD'}
            </Text>
          </View>
        </View>
        <View style={[styles.itemStatusContainer]}>
          {game.state === 'Sent' ? (
            <View style={[styles.rsvpButtonContainer]}>
              <Button
                text="RSVP"
                compact
                filled={false}
                iconLeft="caret-right"
                onPress={() => {
                  navigation.navigate('Game RSVP', {
                    gameInvite: gameInvites.items.filter(
                      (gameInvite: GameInvite) => {
                        return gameInvite.id === game.id;
                      },
                    )[0],
                  });
                }}
              />
            </View>
          ) : (
            <Text style={[styles.itemStatusText]}>{game.state}</Text>
          )}
        </View>
      </Pressable>
    );
  };

  const renderGameInProgress = (game: Game) => {
    return (
      <Pressable
        style={[styles.itemContentRow]}
        onPress={() => {
          navigation.navigate('Game Detail Stack', {game});
        }}>
        <View style={[styles.itemTeamsContainer]}>
          <View style={[styles.itemTeamRow]}>
            <View style={[styles.itemTeamRowInProgress]}>
              <View style={[styles.itemAvatar]}>
                <Text style={[styles.itemAvatarText]}>
                  {getAvatarAbbreviation(game.awayTeam)}
                </Text>
              </View>
              {game.actingTeamId === game.awayTeamId ? (
                <FontAwesome5Icon
                  style={[styles.itemPlayIcon]}
                  name="play"
                  size={10}
                  color={theme.colors.text}
                />
              ) : (
                <View style={[styles.itemPlayIcon]} />
              )}
              <Text
                style={[
                  styles.itemTeamNameText,
                  game.awayTeamScore >= game.homeTeamScore
                    ? styles.itemTeamRowWinningTeamNameText
                    : {},
                ]}>
                {game.awayTeam?.nickname || 'TBD'}
              </Text>
              {game.offenseTeamId === game.awayTeamId ? (
                <FontAwesome5Icon
                  style={[styles.itemPossessionIcon]}
                  name="football-ball"
                  size={12}
                  color={theme.colors.brown}
                />
              ) : (
                <></>
              )}
            </View>
            <View style={[styles.itemTeamRowInProgressScoreContainer]}>
              <Text
                style={[
                  styles.itemTeamRowInProgressScoreText,
                  game.awayTeamScore >= game.homeTeamScore
                    ? styles.itemTeamRowWinningTeamScoreText
                    : {},
                ]}>
                {game.awayTeamScore}
              </Text>
            </View>
          </View>
          <View style={[styles.itemTeamRow]}>
            <View style={[styles.itemAvatar]}>
              <Text style={[styles.itemAvatarText]}>
                {getAvatarAbbreviation(game.homeTeam)}
              </Text>
            </View>
            {game.actingTeamId === game.homeTeamId ? (
              <FontAwesome5Icon
                style={[styles.itemPlayIcon]}
                name="play"
                size={10}
                color={theme.colors.text}
              />
            ) : (
              <View style={[styles.itemPlayIcon]} />
            )}
            <Text
              style={[
                styles.itemTeamNameText,
                game.homeTeamScore >= game.awayTeamScore
                  ? styles.itemTeamRowWinningTeamNameText
                  : {},
              ]}>
              {game.homeTeam?.nickname || 'TBD'}
            </Text>
            {game.offenseTeamId === game.homeTeamId ? (
              <FontAwesome5Icon
                style={[styles.itemPossessionIcon]}
                name="football-ball"
                size={12}
                color={theme.colors.brown}
              />
            ) : (
              <></>
            )}
            <View style={[styles.itemTeamRowInProgressScoreContainer]}>
              <Text
                style={[
                  styles.itemTeamRowInProgressScoreText,
                  game.homeTeamScore >= game.awayTeamScore
                    ? styles.itemTeamRowWinningTeamScoreText
                    : {},
                ]}>
                {game.homeTeamScore}
              </Text>
            </View>
          </View>
        </View>
        <View style={[styles.itemStatusContainer]}>
          <Text style={[styles.itemStatusText]}>{game.state}</Text>
        </View>
      </Pressable>
    );
  };

  const renderItem = ({
    item,
  }: {
    item: {groupHeader: string; groupItems: Game[]};
  }) => {
    return (
      <View style={[styles.groupContainer]}>
        <View style={[styles.groupHeader]}>
          <Text style={[styles.groupHeaderText]}>{item.groupHeader}</Text>
        </View>
        {item.groupItems.map((groupItem: Game, index: number) => {
          return (
            <View key={`${item.groupHeader}-${groupItem.id}-${index}`}>
              {item.groupHeader === 'PENDING GAME REQUESTS' ? (
                renderGameRequest(groupItem)
              ) : (
                <></>
              )}
              {item.groupHeader === 'INVITATIONS' ? (
                renderGameInvite(groupItem)
              ) : (
                <></>
              )}
              {item.groupHeader === 'IN PROGRESS' ? (
                renderGameInProgress(groupItem)
              ) : (
                <></>
              )}

              {index < item.groupItems.length - 1 ? (
                <SectionListItemSeparator />
              ) : (
                <></>
              )}
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <FlatList
      style={[styles.listContainer]}
      data={[
        ...(gameRequests.items.length > 0
          ? [
              {
                groupHeader: 'PENDING GAME REQUESTS',
                groupItems: gameRequests.items.map(
                  (gameRequest: GameRequest): Game => {
                    return {
                      ...createGameShell(),
                      id: gameRequest.id,
                      homeTeam: gameRequest.team,
                      state: gameRequest.status,
                    };
                  },
                ),
              },
            ]
          : []),
        ...(gameInvites.items.length > 0
          ? [
              {
                groupHeader: 'INVITATIONS',
                groupItems: gameInvites.items.map(
                  (gameInvite: GameInvite): Game => {
                    return {
                      ...createGameShell(),
                      id: gameInvite.id,
                      homeTeam: gameInvite.gameRequest?.team,
                      awayTeam: gameInvite.team,
                      state: gameInvite.status,
                    };
                  },
                ),
              },
            ]
          : []),
        ...(gameParticipants.items.length > 0
          ? [
              {
                groupHeader: 'IN PROGRESS',
                groupItems: gameParticipants.items.map(
                  (gameParticipant: GameParticipant): Game => {
                    return gameParticipant?.game || createGameShell();
                  },
                ),
              },
            ]
          : []),
      ]}
      keyExtractor={item => item.groupHeader}
      renderItem={renderItem}
      refreshControl={
        <RefreshControl
          refreshing={gameRequests.isLoading || gameInvites.isLoading}
          onRefresh={refresh}
        />
      }
      ListEmptyComponent={
        <View style={[styles.emptyContainer]}>
          <View style={[styles.oopsCircle]}>
            <FontAwesome5Icon
              style={[styles.oopsIcon]}
              name="exclamation"
              color={theme.colors.error}
              size={24}
            />
          </View>
          <Text style={[styles.oopsText]}>
            Oops! You don't have any games in progress.
          </Text>
          <Button
            text="Request Game"
            iconLeft="plus"
            onPress={() => {
              navigation.navigate('Game Request', {});
            }}
          />
        </View>
      }
      ListFooterComponent={<View style={[styles.footerPadding]} />}
    />
  );
};

export const GamesList = withTheme(Component);
