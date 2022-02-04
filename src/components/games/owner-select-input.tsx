import React from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  TextInput,
  FlatList,
} from 'react-native';
import {useAuth} from '../../providers/auth';
import {useTheme} from '../../providers/theme';
import {Owner, OwnersService} from '../../services/owners';
import {TextInputBox} from '../core/input/text-input-box';
import {SectionListItemSeparator} from '../core/section-list/sectionlist-item-separator';
import {SelectOption} from '../core/select/option';

type Properties = {
  selectedOwner?: Owner;
  onPressOption: (owner: Owner) => void;
};

export type Option = {
  owner: Owner;
};

const Component: React.FC<Properties> = ({selectedOwner, onPressOption}) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [searchText, setSearchText] = React.useState('');
  const [filter, setFilter] = React.useState('');

  const [items, setItems] = React.useState<Option[]>([]);
  const [filteredItems, setFilteredItems] = React.useState<Option[]>([]);

  const [newlySelectedOwner, setNewlySelectedOwner] = React.useState<
    Owner | undefined
  >(selectedOwner);

  const auth = useAuth();

  const fetchOwners = React.useCallback(async () => {
    setIsLoading(true);
    const owners = (await new OwnersService().list()).items;
    setItems(
      owners.map((owner: Owner) => {
        return {owner};
      }),
    );
    setIsLoading(false);
  }, []);

  React.useEffect(() => {
    setFilteredItems(
      items.filter((item: Option) => {
        return (
          item.owner.id !== auth.owner?.id &&
          (filter.length < 3 ||
            item.owner.name.toLowerCase().indexOf(filter.toLowerCase()) > -1)
        );
      }),
    );
  }, [items, filter, auth.owner]);

  React.useEffect(() => {
    fetchOwners();
  }, [fetchOwners]);

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
      owner: Owner;
      selected?: boolean;
    };
  }) => {
    return (
      <SelectOption
        label={item.owner.name}
        isSelected={item.owner.id === newlySelectedOwner?.id}
        onSelect={() => {
          setNewlySelectedOwner(item.owner);
          setTimeout(() => onPressOption(item.owner), 200);
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
      keyExtractor={item => item.owner.id}
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
              placeholder={'Search Owners'}
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

export {Component as OwnerSelectInput};
