import React from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  TextInput,
  FlatList,
} from 'react-native';
import {InjectedThemeProps, withTheme} from '../../../hoc/with-styles';
import {TextInputBox} from '../input/text-input-box';
import {SelectListItemSeparator} from './item-separator';
import {SelectOption} from './option';

export interface SelectListOption {
  id: string;
  label: string;
  filter: string;
}

interface Properties extends InjectedThemeProps {
  options: SelectListOption[];
  selectedOptionId?: string;
  isLoading?: boolean;
  searchPlaceholder?: string;
  onSelect: (optionId: string) => void;
}

const Component: React.FC<Properties> = props => {
  const {
    options,
    isLoading = false,
    selectedOptionId,
    searchPlaceholder,
    onSelect,
    theme,
  } = props;

  const [searchText, setSearchText] = React.useState('');
  const [filter, setFilter] = React.useState('');
  const [filteredItems, setFilteredItems] = React.useState<SelectListOption[]>(
    [],
  );

  const [newlySelectedOptionId, setNewlySelectedOptionId] =
    React.useState(selectedOptionId);

  React.useEffect(() => {
    setFilteredItems(
      options.filter((option: SelectListOption) => {
        return (
          filter.length < 3 ||
          option.filter.toLowerCase().indexOf(filter.toLowerCase()) > -1
        );
      }),
    );
  }, [options, filter]);

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

  const renderItem = ({item}: {item: SelectListOption}) => {
    return (
      <SelectOption
        label={item.label}
        isSelected={item.id === newlySelectedOptionId}
        onSelect={() => {
          setNewlySelectedOptionId(item.id);
          setTimeout(() => onSelect(item.id), 200);
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
      keyExtractor={item => item.id as string}
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
};

export const SelectList = withTheme(Component);
