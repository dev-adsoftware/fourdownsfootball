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
import {useData} from '../../providers/data';
import {useTheme} from '../../providers/theme';
import {GameInvite} from '../../services/game-invites';
import {GameRequest} from '../../services/game-requests';
import {Team} from '../../services/teams';
import {GamesStackParamList} from '../../stacks/games';
import {Button} from '../core/buttons/button';
import {SectionListItemSeparator} from '../core/section-list/sectionlist-item-separator';

type Properties = {
  navigation: NativeStackNavigationProp<GamesStackParamList>;
};

type Game = {
  id: string;
  homeTeam: Team | {id: string};
  awayTeam: Team | {id: string};
  status: string;
};

const GamesList: React.FC<Properties> = ({navigation}) => {
  const [games, setGames] = React.useState<Game[]>([]);
  const theme = useTheme();

  const {gameRequests, gameInvites} = useData();

  const fetchGames = React.useCallback(async () => {
    setGames([
      ...gameRequests.data.items.map((gameRequest: GameRequest) => {
        return {
          id: gameRequest.id,
          homeTeam: {id: gameRequest.teamId},
          awayTeam: {id: gameRequest.invitedOwnerId},
          status: gameRequest.status,
        };
      }),
      ...gameInvites.data.items.map((gameInvite: GameInvite) => {
        return {
          id: gameInvite.id,
          homeTeam: {id: gameInvite.gameRequestId},
          awayTeam: {id: gameInvite.ownerId},
          status: 'Requesting RSVP',
        };
      }),
    ]);
  }, [gameRequests.data.items, gameInvites.data.items]);

  React.useEffect(() => {
    fetchGames();
  }, [fetchGames]);

  const refresh = () => {
    gameRequests.refresh();
    gameInvites.refresh();
  };

  const styles = StyleSheet.create({
    loadingContainer: {marginTop: 20},
    emptyContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
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
      color: theme.colors.secondaryText,
    },
    itemAvatar: {
      borderWidth: 1,
      borderColor: theme.colors.separator,
      width: 30,
      height: 30,
      borderRadius: 15,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 8,
      backgroundColor: theme.colors.green,
    },
    itemAvatarText: {
      color: theme.colors.white,
      ...theme.typography.subheading,
    },
    itemTeamRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 3,
    },
    itemTeamNameText: {
      color: theme.colors.text,
      ...theme.typography.body,
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
              <Pressable
                style={[styles.itemContentRow]}
                onPress={() => {
                  console.log('pressed game');
                }}>
                <View style={[styles.itemTeamsContainer]}>
                  <View style={[styles.itemTeamRow]}>
                    <View style={[styles.itemAvatar]}>
                      <Text style={[styles.itemAvatarText]}>AT</Text>
                    </View>
                    <Text style={[styles.itemTeamNameText]}>Away Team</Text>
                  </View>
                  <View style={[styles.itemTeamRow]}>
                    <View style={[styles.itemAvatar]}>
                      <Text style={[styles.itemAvatarText]}>HT</Text>
                    </View>
                    <Text style={[styles.itemTeamNameText]}>Home Team</Text>
                  </View>
                </View>
                <View style={[styles.itemStatusContainer]}>
                  {groupItem.status === 'Requesting RSVP' ? (
                    <View style={[styles.rsvpButtonContainer]}>
                      <Button
                        text="RSVP"
                        compact
                        // filled={false}
                        iconLeft="caret-right"
                        onPress={() => console.log('accept rsvp')}
                      />
                    </View>
                  ) : (
                    <Text style={[styles.itemStatusText]}>
                      {groupItem.status.toUpperCase()}
                    </Text>
                  )}
                </View>
              </Pressable>
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
        {
          groupHeader: 'PENDING GAME REQUESTS',
          groupItems: [...games, ...games],
        },
        {
          groupHeader: 'INVITATIONS',
          groupItems: [...games],
        },
        {
          groupHeader: 'IN PROGRESS',
          groupItems: [...games, ...games, ...games],
        },
        {
          groupHeader: 'RECENTLY COMPLETED',
          groupItems: [...games, ...games, ...games],
        },
      ]}
      keyExtractor={item => item.groupHeader}
      renderItem={renderItem}
      refreshControl={
        <RefreshControl
          refreshing={gameRequests.data.isLoading || gameInvites.data.isLoading}
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

export {GamesList};
