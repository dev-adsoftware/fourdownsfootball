import React from 'react';
import {
  StyleSheet,
  Text,
  Pressable,
  View,
  ActivityIndicator,
  TextInput,
  FlatList,
} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {useTheme} from '../../providers/theme';
import {Nation, NationsService} from '../../services/nations';
import {EmojiDecoder} from '../../utilities/emoji-decoder';
import {TextInputBox} from '../core/input/text-input-box';
import {SectionListItemSeparator} from '../core/section-list/sectionlist-item-separator';

type Properties = {
  selectedNation?: Nation;
  onPressOption: (nation: Nation) => void;
};

export type Option = {
  nation: Nation;
};

const Component: React.FC<Properties> = ({selectedNation, onPressOption}) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [searchText, setSearchText] = React.useState('');
  const [filter, setFilter] = React.useState('');

  const [items, setItems] = React.useState<Option[]>([]);
  const [filteredItems, setFilteredItems] = React.useState<Option[]>([]);

  const [newlySelectedNation, setNewlySelectedNation] = React.useState<
    Nation | undefined
  >(selectedNation);

  const fetchNations = React.useCallback(async () => {
    setIsLoading(true);
    const nations = (await new NationsService().list()).items;
    setItems(
      nations.map((nation: Nation) => {
        return {nation};
      }),
    );
    setIsLoading(false);
  }, []);

  React.useEffect(() => {
    setFilteredItems(
      items.filter((item: Option) => {
        return (
          filter.length < 3 ||
          item.nation.name.toLowerCase().indexOf(filter.toLowerCase()) > -1
        );
      }),
    );
  }, [items, filter]);

  React.useEffect(() => {
    fetchNations();
  }, [fetchNations]);

  const theme = useTheme();

  const styles = StyleSheet.create({
    listContainer: {
      width: '100%',
      backgroundColor: theme.colors.background,
      borderTopWidth: 1,
      borderTopColor: theme.colors.separator,
    },
    loadingContainer: {
      marginTop: 20,
    },
    footerPadding: {
      height: 100,
      backgroundColor: theme.colors.background,
    },
    itemRow: {
      backgroundColor: theme.colors.background,
      paddingLeft: 10,
      paddingVertical: 10,
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 0,
    },
    itemGrid: {
      flex: 1,
      color: theme.colors.text,
    },
    itemGridRight: {
      alignItems: 'flex-end',
      marginRight: 15,
    },
    itemSelectContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    itemSelectText: {
      marginRight: 20,
      color: theme.colors.secondaryText,
    },
    listSectionHeader: {
      backgroundColor: theme.colors.secondaryBackground,
      color: theme.colors.secondaryText,
      fontSize: 12,
      paddingLeft: 10,
      marginTop: 0,
      marginBottom: 0,
      paddingTop: 10,
      paddingBottom: 3,
      textAlignVertical: 'bottom',
    },
    searchBarContainer: {
      padding: 5,
    },
    textInput: {
      color: theme.colors.text,
    },
  });

  const renderItem = ({
    item,
  }: {
    item: {
      nation: Nation;
      selected?: boolean;
    };
  }) => {
    return (
      <Pressable
        onPress={() => {
          setNewlySelectedNation(item.nation);
          setTimeout(() => onPressOption(item.nation), 200);
        }}
        style={[styles.itemRow]}>
        <Text style={[styles.itemGrid]}>
          {EmojiDecoder.decode(item.nation.flagEmojiUnicode)}
          {'  '}
          {item.nation.name}
        </Text>
        <View style={[styles.itemGrid, styles.itemGridRight]}>
          <View style={[styles.itemSelectContainer]}>
            {item.nation.id === newlySelectedNation?.id ? (
              <FontAwesome5Icon
                name="check"
                size={12}
                color={theme.colors.secondaryText}
              />
            ) : (
              <></>
            )}
          </View>
        </View>
      </Pressable>
    );
  };

  return isLoading ? (
    <ActivityIndicator style={[styles.loadingContainer]} />
  ) : (
    <FlatList
      style={[styles.listContainer]}
      data={filteredItems}
      extraData={filter}
      keyExtractor={item => item.nation.id}
      renderItem={renderItem}
      ItemSeparatorComponent={SectionListItemSeparator}
      ListHeaderComponent={
        <View style={[styles.searchBarContainer]}>
          <TextInputBox>
            <TextInput
              style={[styles.textInput]}
              textAlign="left"
              autoCapitalize="none"
              autoCorrect={false}
              selectTextOnFocus
              returnKeyType="search"
              placeholder={'Search Countries'}
              value={searchText}
              onChangeText={setSearchText}
              onSubmitEditing={({nativeEvent}) => {
                setFilter(nativeEvent.text);
              }}
            />
          </TextInputBox>
        </View>
      }
      ListFooterComponent={<View style={[styles.footerPadding]} />}
    />
  );
};

export {Component as NationSelectInput};
