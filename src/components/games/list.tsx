import React from 'react';
import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {useData} from '../../providers/data';
import {useTheme} from '../../providers/theme';
import {GameRequest} from '../../services/game-requests';
import {Button} from '../core/buttons/button';
import {SectionListItemSeparator} from '../core/section-list/sectionlist-item-separator';

type Properties = {
  onPressRequestGame: () => void;
};

const GamesList: React.FC<Properties> = ({onPressRequestGame}) => {
  const theme = useTheme();

  const {gameRequests} = useData();

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
    createButtonText: {
      color: 'white',
      fontWeight: 'bold',
    },
    listContainer: {
      width: '100%',
      backgroundColor: theme.colors.background,
    },
    itemContainer: {
      paddingHorizontal: 10,
      paddingVertical: 20,
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

  const renderItem = ({item}: {item: GameRequest}) => {
    return (
      <Pressable
        style={[styles.itemContainer]}
        onPress={() => {
          console.log('pressed game');
        }}>
        <View>
          <Text style={[styles.itemTeamNameText]}>{item.id}</Text>
        </View>
      </Pressable>
    );
  };

  return gameRequests.data.items.length === 0 ? (
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
          onPressRequestGame();
        }}
      />
    </View>
  ) : (
    <>
      <FlatList
        style={[styles.listContainer]}
        data={gameRequests.data.items}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={SectionListItemSeparator}
        ListFooterComponent={<View style={[styles.footerPadding]} />}
      />
    </>
  );
};

export {GamesList};
