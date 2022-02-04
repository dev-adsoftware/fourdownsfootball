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
import {useData} from '../../providers/data';
import {useTheme} from '../../providers/theme';
import {Team} from '../../services/teams';
import {Button} from '../core/buttons/button';
import {SectionListItemSeparator} from '../core/section-list/sectionlist-item-separator';

type Properties = {
  onPressTeam: (team: Team) => void;
  onPressCreateTeam: () => void;
};

const TeamsList: React.FC<Properties> = ({onPressTeam, onPressCreateTeam}) => {
  const theme = useTheme();

  const {teams} = useData();

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
    createButtonText: {
      color: 'white',
      fontWeight: 'bold',
    },
    listContainer: {
      backgroundColor: theme.colors.background,
    },
    itemContainer: {
      paddingHorizontal: 10,
      paddingVertical: 10,
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
      fontWeight: 'bold',
      fontSize: 16,
    },
    itemTeamNameText: {
      color: theme.colors.text,
      fontSize: 16,
      fontWeight: '500',
    },
    itemLeagueText: {
      color: theme.colors.secondaryText,
      fontSize: 12,
    },
    footerPadding: {
      height: 100,
      backgroundColor: theme.colors.background,
    },
  });

  const getAvatarAbbreviation = (team: Team) => {
    return `${team.town.name.slice(0, 1)}${team.nickname.slice(0, 1)}`;
  };

  const renderItem = ({item}: {item: Team}) => {
    return (
      <Pressable
        style={[styles.itemContainer]}
        onPress={() => {
          onPressTeam(item);
        }}>
        <View
          style={[
            styles.itemAvatar,
            {
              backgroundColor: (theme.colors as {[x: string]: string})[
                item.primaryColor.toLowerCase()
              ],
            },
          ]}>
          <Text style={[styles.itemAvatarText]}>
            {getAvatarAbbreviation(item)}
          </Text>
        </View>
        <View>
          <Text style={[styles.itemTeamNameText]}>
            {item.town.name} {item.nickname}
          </Text>
          <Text style={[styles.itemLeagueText]}>I.1</Text>
        </View>
      </Pressable>
    );
  };

  return teams.data.isLoading ? (
    <ActivityIndicator style={[styles.loadingContainer]} />
  ) : teams.data.items.length === 0 ? (
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
        text="Create New"
        iconLeft="plus"
        onPress={() => {
          onPressCreateTeam();
        }}
      />
    </View>
  ) : (
    <>
      <FlatList
        style={[styles.listContainer]}
        data={teams.data.items}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl
            refreshing={teams.data.isLoading}
            onRefresh={teams.refresh}
          />
        }
        ItemSeparatorComponent={SectionListItemSeparator}
        ListFooterComponent={<View style={[styles.footerPadding]} />}
      />
    </>
  );
};

export {TeamsList};
