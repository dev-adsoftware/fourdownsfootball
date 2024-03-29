import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {InjectedThemeProps, withTheme} from '../../hoc/with-theme';
import {
  OwnerDashboardExtendedTeamDto,
  OwnerDashboardExtendedTeamRequestDto,
} from '../../services/dtos/queries/owner-dashboard/owner-dashboard-query-response.dto';
import {TeamsStackParamList} from '../../stacks/teams';
import {TeamAvatar} from '../core/avatars/team-avatar';
import {Button} from '../core/buttons/button';
import {Card} from '../core/cards/card';
import {SectionListItemSeparator} from '../core/section-list/sectionlist-item-separator';

interface Properties extends InjectedThemeProps {
  teams: OwnerDashboardExtendedTeamDto[];
  teamRequests: OwnerDashboardExtendedTeamRequestDto[];
  isLoading?: boolean;
  onRefresh: () => Promise<void>;
  navigation: NativeStackNavigationProp<TeamsStackParamList>;
}

const Component: React.FC<Properties> = props => {
  const {
    teams,
    teamRequests,
    isLoading = true,
    onRefresh,
    navigation,
    theme,
  } = props;

  const styles = StyleSheet.create({
    loadingContainer: {
      marginTop: 20,
    },
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
    itemContentRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    itemTeamIdentifier: {
      height: 50,
      justifyContent: 'center',
    },
    itemTeamIdentifierBorder: {
      borderRightWidth: 1,
      borderRightColor: theme.colors.separator,
      paddingRight: 10,
      marginRight: 10,
      width: 180,
    },
    itemTeamNameText: {
      ...theme.typography.body,
      color: theme.colors.text,
    },
    itemLeagueText: {
      ...theme.typography.caption1,
      color: theme.colors.secondaryText,
    },
    itemTeamStatusContainer: {
      flex: 1,
    },
    itemStatusText: {
      ...theme.typography.footnote,
      color: theme.colors.text,
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
    item: {
      groupHeader: string;
      groupItems: (OwnerDashboardExtendedTeamDto & {status?: string})[];
    };
  }) => {
    return (
      <Card heading={item.groupHeader}>
        {item.groupItems.map(
          (
            groupItem: OwnerDashboardExtendedTeamDto & {status?: string},
            index: number,
          ) => {
            return (
              <View key={`${item.groupHeader}-${groupItem.id}-${index}`}>
                <Pressable
                  style={[styles.itemContentRow]}
                  onPress={() => {
                    navigation.navigate('Team Detail Stack', {team: groupItem});
                  }}>
                  <TeamAvatar
                    town={groupItem.town}
                    team={groupItem}
                    size={50}
                  />
                  <View
                    style={[
                      styles.itemTeamIdentifier,
                      groupItem.status
                        ? styles.itemTeamIdentifierBorder
                        : undefined,
                    ]}>
                    <Text style={[styles.itemTeamNameText]}>
                      {groupItem.town.name} {groupItem.nickname}
                    </Text>
                    <Text style={[styles.itemLeagueText]}>
                      {groupItem.league?.name || 'Awaiting league assignment'}
                    </Text>
                  </View>
                  {groupItem.status ? (
                    <View style={[styles.itemTeamStatusContainer]}>
                      <Text style={[styles.itemStatusText]}>
                        {groupItem.status || 'Awaiting league assignment'}
                      </Text>
                    </View>
                  ) : (
                    <></>
                  )}
                </Pressable>
                {index < item.groupItems.length - 1 ? (
                  <SectionListItemSeparator />
                ) : (
                  <></>
                )}
              </View>
            );
          },
        )}
      </Card>
    );
  };

  return (
    <FlatList
      style={[styles.listContainer]}
      data={[
        ...(teamRequests.length > 0
          ? [
              {
                groupHeader: 'TEAM REQUESTS IN PROGRESS',
                groupItems: teamRequests.map(
                  (
                    teamRequest: OwnerDashboardExtendedTeamRequestDto,
                  ): OwnerDashboardExtendedTeamDto & {status?: string} => {
                    const teamDto =
                      new OwnerDashboardExtendedTeamDto() as OwnerDashboardExtendedTeamDto & {
                        status?: string;
                      };
                    teamDto.id = teamRequest.id;
                    teamDto.ownerId = teamRequest.ownerId;
                    teamDto.nickname = teamRequest.nickname;
                    teamDto.primaryColor = teamRequest.primaryColor;
                    teamDto.town = teamRequest.town;
                    teamDto.status = teamRequest.status || 'Processing';
                    teamDto.leagueId = 'Awaiting league assignment';
                    return teamDto;
                  },
                ),
              },
            ]
          : []),
        ...(teams.length > 0
          ? [{groupHeader: 'ACTIVE', groupItems: teams}]
          : []),
      ]}
      keyExtractor={item => item.groupHeader}
      renderItem={renderItem}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
      }
      ListEmptyComponent={
        <View style={[styles.emptyContainer]}>
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <>
              <View style={[styles.oopsCircle]}>
                <FontAwesome5Icon
                  style={[styles.oopsIcon]}
                  name="exclamation"
                  color={theme.colors.error}
                  size={24}
                />
              </View>
              <Text style={[styles.oopsText]}>
                Oops! You don't own any teams.
              </Text>
              <Button
                text="Request Team"
                iconLeft="plus"
                onPress={() => {
                  navigation.navigate('Team Request', {});
                }}
              />
            </>
          )}
        </View>
      }
      ListFooterComponent={<View style={[styles.footerPadding]} />}
    />
  );
};

export const TeamsList = withTheme(Component);
