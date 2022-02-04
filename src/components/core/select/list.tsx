import React from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  TextInput,
  FlatList,
} from 'react-native';
import {useTheme} from '../../../providers/theme';
import {TextInputBox} from '../input/text-input-box';
import {SelectListItemSeparator} from './item-separator';
import {SelectOption} from './option';

type Properties<T extends {id: string; name: string}> = {
  options: T[];
  labelKey?: keyof T;
  labelFn?: (option: T) => string;
  filterKeys?: (keyof T)[];
  filterFn?: (option: T, filter: string) => boolean;
  selectedOption?: T;
  isLoading?: boolean;
  searchPlaceholder?: string;
  onSelect: (option: T) => void;
};

function Component<T extends {id: string; name: string}>({
  options,
  labelKey = 'name',
  labelFn,
  filterKeys,
  filterFn,
  isLoading = false,
  selectedOption,
  searchPlaceholder,
  onSelect,
}: Properties<T>) {
  const [searchText, setSearchText] = React.useState('');
  const [filter, setFilter] = React.useState('');
  const [filteredItems, setFilteredItems] = React.useState<T[]>([]);

  const [newlySelectedOption, setNewlySelectedOption] = React.useState<
    T | undefined
  >(selectedOption);

  React.useEffect(() => {
    setFilteredItems(
      options.filter((option: T) => {
        return (
          filter.length < 3 ||
          (filterFn
            ? filterFn(option, filter)
            : (filterKeys || ['name'])
                .map((key: keyof T) => {
                  return option[key];
                })
                .join('')
                .toLowerCase()
                .indexOf(filter.toLowerCase()) > -1)
        );
      }),
    );
  }, [options, filterFn, filterKeys, filter]);

  const theme = useTheme();

  const styles = StyleSheet.create({
    listContainer: {
      backgroundColor: theme.colors.background,
    },
    loadingContainer: {
      marginTop: 20,
    },
    footerPadding: {
      height: 100,
      backgroundColor: theme.colors.background,
    },
    searchBarContainer: {
      marginTop: 5,
      padding: 5,
    },
    textInput: {
      color: theme.colors.text,
    },
  });

  const renderItem = ({item}: {item: T}) => {
    return (
      <SelectOption
        label={labelFn ? labelFn(item) : (item[labelKey] as unknown as string)}
        isSelected={item.id === newlySelectedOption?.id}
        onSelect={() => {
          setNewlySelectedOption(item);
          setTimeout(() => onSelect(item), 200);
        }}
      />
    );
  };

  return isLoading ? (
    <ActivityIndicator style={[styles.loadingContainer]} />
  ) : (
    <FlatList
      style={[styles.listContainer]}
      data={filteredItems}
      extraData={filter}
      keyExtractor={item => item.id}
      renderItem={renderItem}
      ItemSeparatorComponent={SelectListItemSeparator}
      ListHeaderComponent={
        searchPlaceholder ? (
          <View style={[styles.searchBarContainer]}>
            <TextInputBox>
              <TextInput
                style={[styles.textInput]}
                textAlign="left"
                autoCapitalize="none"
                autoCorrect={false}
                selectTextOnFocus
                returnKeyType="search"
                placeholder={searchPlaceholder}
                value={searchText}
                onChangeText={setSearchText}
                onSubmitEditing={({nativeEvent}) => {
                  setFilter(nativeEvent.text);
                }}
              />
            </TextInputBox>
          </View>
        ) : (
          <></>
        )
      }
      ListFooterComponent={<View style={[styles.footerPadding]} />}
    />
  );
}

export {Component as SelectList};
