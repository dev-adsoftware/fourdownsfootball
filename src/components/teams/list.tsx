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
import {TeamRequest} from '../../services/team-requests';
import {Team} from '../../services/teams';
import {TeamsStackParamList} from '../../stacks/teams';
import {Button} from '../core/buttons/button';
import {SectionListItemSeparator} from '../core/section-list/sectionlist-item-separator';

type Properties = {
  navigation: NativeStackNavigationProp<TeamsStackParamList>;
};

const TeamsList: React.FC<Properties> = ({navigation}) => {
  const theme = useTheme();

  const {teams, teamRequests} = useData();

  const styles = StyleSheet.create({
    loadingContainer: {
      marginTop: 20,
    },
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
    itemAvatar: {
      borderWidth: 1,
      borderColor: theme.colors.black,
      width: 50,
      height: 50,
      borderRadius: 25,
      alignItems: 'center',
      paddingTop: 14,
      marginRight: 10,
    },
    itemAvatarText: {
      color: theme.colors.white,
      ...theme.typography.body,
    },
    itemTeamNameText: {
      color: theme.colors.text,
      ...theme.typography.body,
    },
    itemLeagueText: {
      color: theme.colors.secondaryText,
      ...theme.typography.caption1,
    },
    footerPadding: {
      backgroundColor: theme.colors.secondaryBackground,
      height: 1,
      marginTop: 10,
    },
  });

  const getAvatarAbbreviation = (team: Team) => {
    return `${team.town.name.slice(0, 1)}${team.nickname.slice(0, 1)}`;
  };

  const renderItem = ({
    item,
  }: {
    item: {groupHeader: string; groupItems: Team[]};
  }) => {
    return (
      <View style={[styles.groupContainer]}>
        <View style={[styles.groupHeader]}>
          <Text style={[styles.groupHeaderText]}>{item.groupHeader}</Text>
        </View>
        {item.groupItems.map((groupItem: Team, index: number) => {
          return (
            <View key={`${item.groupHeader}-${groupItem.id}-${index}`}>
              <Pressable
                style={[styles.itemContentRow]}
                onPress={() => {
                  navigation.navigate('Team Detail Stack', {team: groupItem});
                }}>
                <View
                  style={[
                    styles.itemAvatar,
                    {
                      backgroundColor: (theme.colors as {[x: string]: string})[
                        groupItem.primaryColor.toLowerCase()
                      ],
                    },
                  ]}>
                  <Text style={[styles.itemAvatarText]}>
                    {getAvatarAbbreviation(groupItem)}
                  </Text>
                </View>
                <View>
                  <Text style={[styles.itemTeamNameText]}>
                    {groupItem.town.name} {groupItem.nickname}
                  </Text>
                  <Text style={[styles.itemLeagueText]}>I.1</Text>
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

  console.log(teamRequests.data.items);
  console.log(teams.data.items);

  return (
    <FlatList
      style={[styles.listContainer]}
      data={[
        {groupHeader: 'ACTIVE', groupItems: teams.data.items},
        {
          groupHeader: 'TEAM REQUESTS IN PROGRESS',
          groupItems: teamRequests.data.items.map(
            (teamRequest: TeamRequest): Team => {
              console.log(teamRequest);
              return {
                id: teamRequest.id,
                ownerId: teamRequest.ownerId,
                nickname: teamRequest.nickname,
                primaryColor: teamRequest.primaryColor,
                town: teamRequest.town,
                name: `${teamRequest.town.name} ${teamRequest.nickname}`,
              };
            },
          ),
        },
      ]}
      keyExtractor={item => item.groupHeader}
      renderItem={renderItem}
      refreshControl={
        <RefreshControl
          refreshing={teams.data.isLoading || teamRequests.data.isLoading}
          onRefresh={() => {
            teams.refresh();
            teamRequests.refresh();
          }}
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
          <Text style={[styles.oopsText]}>Oops! You don't own any teams.</Text>
          <Button
            text="Request Team"
            iconLeft="plus"
            onPress={() => {
              navigation.navigate('Team Request', {});
            }}
          />
        </View>
      }
      ListFooterComponent={<View style={[styles.footerPadding]} />}
    />
  );
};

export {TeamsList};
