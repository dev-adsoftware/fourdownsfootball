import React from 'react';
import {StyleSheet, View, TextInput, FlatList} from 'react-native';
import {useAuth} from '../../providers/auth';
import {useData} from '../../providers/data';
import {useTheme} from '../../providers/theme';
import {Team} from '../../services/teams';
import {TextInputBox} from '../core/input/text-input-box';
import {SectionListItemSeparator} from '../core/section-list/sectionlist-item-separator';
import {SelectOption} from '../core/select/option';

type Properties = {
  selectedTeam?: Team;
  onPressOption: (owner: Team) => void;
};

export type Option = {
  team: Team;
};

const Component: React.FC<Properties> = ({selectedTeam, onPressOption}) => {
  const [searchText, setSearchText] = React.useState('');
  const [filter, setFilter] = React.useState('');

  const [filteredItems, setFilteredItems] = React.useState<Option[]>([]);

  const [newlySelectedTeam, setNewlySelectedTeam] = React.useState<
    Team | undefined
  >(selectedTeam);

  const auth = useAuth();
  const {teams} = useData();

  React.useEffect(() => {
    setFilteredItems(
      teams.data.items
        .filter((item: Team) => {
          return (
            filter.length < 3 ||
            item.nickname.toLowerCase().indexOf(filter.toLowerCase()) > -1
          );
        })
        .map((team: Team) => {
          return {team};
        }),
    );
  }, [teams, filter, auth.owner]);

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
      team: Team;
      selected?: boolean;
    };
  }) => {
    return (
      <SelectOption
        label={item.team.nickname}
        isSelected={item.team.id === newlySelectedTeam?.id}
        onSelect={() => {
          setNewlySelectedTeam(item.team);
          setTimeout(() => onPressOption(item.team), 200);
        }}
      />
    );
  };

  return (
    <FlatList
      style={[styles.listContainer]}
      data={filteredItems}
      extraData={filter}
      keyExtractor={item => item.team.id}
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
              placeholder={'Search Teams'}
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

export {Component as TeamSelectInput};
