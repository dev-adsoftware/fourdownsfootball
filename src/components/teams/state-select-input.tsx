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
import {State, StatesService} from '../../services/states';
import {TextInputBox} from '../core/input/text-input-box';
import {SectionListItemSeparator} from '../core/section-list/sectionlist-item-separator';

type Properties = {
  nationId: string;
  selectedState?: State;
  onPressOption: (state: State) => void;
};

export type Option = {
  state: State;
};

const Component: React.FC<Properties> = ({
  nationId,
  selectedState,
  onPressOption,
}) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [searchText, setSearchText] = React.useState('');
  const [filter, setFilter] = React.useState('');

  const [items, setItems] = React.useState<Option[]>([]);
  const [filteredItems, setFilteredItems] = React.useState<Option[]>([]);

  const [newlySelectedState, setNewlySelectedState] = React.useState<
    State | undefined
  >(selectedState);

  const fetchStates = React.useCallback(async () => {
    setIsLoading(true);
    const states = (
      await new StatesService().listByNation(nationId)
    ).items.sort((a: State, b: State) => {
      return a.name > b.name ? 1 : -1;
    });
    setItems(
      states.map((state: State) => {
        return {
          state: {
            id: state.id,
            name: state.name,
            abbr: state.abbr,
            nationId: state.nationId,
          },
        };
      }),
    );
    setIsLoading(false);
  }, [nationId]);

  React.useEffect(() => {
    setFilteredItems(
      items.filter((item: Option) => {
        return (
          filter.length < 3 ||
          item.state.name.toLowerCase().indexOf(filter.toLowerCase()) > -1
        );
      }),
    );
  }, [items, filter]);

  React.useEffect(() => {
    fetchStates();
  }, [fetchStates]);

  const theme = useTheme();

  const styles = StyleSheet.create({
    listContainer: {
      width: '100%',
      backgroundColor: theme.colors.background,
      // borderTopWidth: 3,
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
      flex: 5,
      color: theme.colors.text,
      // backgroundColor: 'green',
    },
    itemGridRight: {
      alignItems: 'flex-end',
      marginRight: 15,
      flex: 1,
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
      marginTop: -1,
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
      state: State;
      selected?: boolean;
    };
  }) => {
    return (
      <Pressable
        onPress={() => {
          setNewlySelectedState(item.state);
          setTimeout(() => onPressOption(item.state), 200);
        }}
        style={[styles.itemRow]}>
        <Text style={[styles.itemGrid]}>{item.state.name}</Text>
        <View style={[styles.itemGrid, styles.itemGridRight]}>
          <View style={[styles.itemSelectContainer]}>
            {item.state.id === newlySelectedState?.id ? (
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
      keyExtractor={item => item.state.id}
      renderItem={renderItem}
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
      ItemSeparatorComponent={SectionListItemSeparator}
      ListFooterComponent={<View style={[styles.footerPadding]} />}
    />
  );
};

export {Component as StateSelectInput};
