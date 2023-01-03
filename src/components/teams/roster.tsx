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
import {InjectedThemeProps, withTheme} from '../../hoc/with-styles';
import {PlayerDto} from '../../services/dtos';
import {TeamsStackParamList} from '../../stacks/teams';
import {DataTableItemSeparator} from '../core/datatable/datatable-item-separator';

interface Properties extends InjectedThemeProps {
  players: PlayerDto[];
  isLoading: boolean;
  // onPressPlayer: (player: PlayerDto) => void;
  onRefresh: () => Promise<void>;
  navigation: NativeStackNavigationProp<TeamsStackParamList>;
}

const Component: React.FC<Properties> = props => {
  const {isLoading, players, onRefresh, navigation, theme} = props;

  const styles = StyleSheet.create({
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
      width: '100%',
      backgroundColor: theme.colors.background,
    },
    itemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    itemContainerEven: {
      backgroundColor: theme.colors.secondaryBackground,
    },
    itemColumn0: {
      flex: 1,
      paddingLeft: 10,
      marginBottom: -6,
    },
    itemColumn1: {
      flex: 6,
      borderRightWidth: 1,
      borderRightColor: theme.colors.separator,
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 10,
      paddingHorizontal: 10,
    },
    itemPlayerImage: {
      marginRight: 10,
    },
    itemPlayerNameText: {
      color: theme.colors.link,
      ...theme.typography.footnote,
    },
    itemPlayerJerseyText: {
      color: theme.colors.secondaryText,
      ...theme.typography.footnote,
      marginLeft: 5,
    },
    itemColumn2: {
      flex: 1,
      paddingHorizontal: 10,
      alignItems: 'center',
    },
    itemColumn3: {
      flex: 1,
      paddingHorizontal: 10,
      alignItems: 'center',
    },
    itemPlayerRatingText: {
      color: theme.colors.secondaryText,
      ...theme.typography.footnote,
      alignItems: 'center',
    },
    headerContainer: {
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.separator,
      flexDirection: 'row',
      alignItems: 'center',
    },
    headerLabelText: {
      color: theme.colors.text,
      ...theme.typography.footnote,
      alignItems: 'center',
    },
    footerPadding: {
      height: 100,
      backgroundColor: theme.colors.background,
    },
  });

  const renderItem = ({item, index}: {item: PlayerDto; index: number}) => {
    return (
      <Pressable
        style={[
          styles.itemContainer,
          index % 2 !== 0 ? styles.itemContainerEven : {},
        ]}
        onPress={() => {
          navigation.navigate('Team Player Detail', {player: item});
        }}>
        <View style={[styles.itemColumn0]}>
          <FontAwesome5Icon
            style={[styles.itemPlayerImage]}
            name="user"
            solid
            size={28}
            color={theme.colors.fill}
          />
        </View>
        <View style={[styles.itemColumn1]}>
          <View>
            <Text style={[styles.itemPlayerNameText]}>
              {item.firstName} {item.lastName}
            </Text>
          </View>
          <View>
            <Text style={[styles.itemPlayerJerseyText]}>
              #{item.jerseyNumber}
            </Text>
          </View>
        </View>
        <View style={[styles.itemColumn2]}>
          <View>
            <Text style={[styles.itemPlayerRatingText]}>
              {item.position.toUpperCase()}
            </Text>
          </View>
        </View>
        <View style={[styles.itemColumn3]}>
          <View>
            <Text style={[styles.itemPlayerRatingText]}>23</Text>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <>
      <FlatList
        style={[styles.listContainer]}
        data={players}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
        }
        ItemSeparatorComponent={DataTableItemSeparator}
        ListHeaderComponent={
          <View style={[styles.headerContainer]}>
            <View style={[styles.itemColumn0]}>
              {/* <Text style={[styles.headerLabelText]}> </Text> */}
            </View>
            <View style={[styles.itemColumn1]}>
              <Text style={[styles.headerLabelText]}>NAME</Text>
            </View>
            <View style={[styles.itemColumn2]}>
              <Text style={[styles.headerLabelText]}>POS</Text>
            </View>
            <View style={[styles.itemColumn3]}>
              <Text style={[styles.headerLabelText]}>OVR</Text>
            </View>
          </View>
        }
        ListFooterComponent={<View style={[styles.footerPadding]} />}
      />
    </>
  );
};

export const TeamsRosterList = withTheme(Component);
