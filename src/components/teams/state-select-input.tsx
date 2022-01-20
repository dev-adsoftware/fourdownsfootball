import React from 'react';
import {SectionList, StyleSheet, Text, Pressable, View} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {useTheme} from '../../providers/theme';
import {State, StatesService} from '../../services/states';
import {SectionListItemSeparator} from '../core/section-list/sectionlist-item-separator';
import {SectionListSectionSeparator} from '../core/section-list/sectionlist-section-separator';

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
  const [sections, setSections] = React.useState<
    {title: string; data: Option[]}[]
  >([]);
  const [newlySelectedState, setNewlySelectedState] = React.useState<
    State | undefined
  >(selectedState);

  const fetchStates = React.useCallback(async () => {
    const states = (await new StatesService().listByNation(nationId)).items;
    setSections([
      {
        title: 'STATES',
        data: states.map((state: State) => {
          return {
            state: {
              id: state.id,
              name: state.name,
              abbr: state.abbr,
              nationId: state.nationId,
            },
          };
        }),
      },
    ]);
  }, [nationId]);

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

  return (
    <SectionList
      style={[styles.listContainer]}
      sections={sections}
      keyExtractor={item => item.state.id}
      renderItem={renderItem}
      renderSectionHeader={({section: {title}}) => (
        <Text style={[styles.listSectionHeader]}>{title}</Text>
      )}
      ItemSeparatorComponent={SectionListItemSeparator}
      SectionSeparatorComponent={SectionListSectionSeparator}
    />
  );
};

export {Component as StateSelectInput};
