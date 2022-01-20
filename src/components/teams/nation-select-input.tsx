import React from 'react';
import {SectionList, StyleSheet, Text, Pressable, View} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {useTheme} from '../../providers/theme';
import {Nation} from '../../services/nations';
import {SectionListItemSeparator} from '../core/section-list/sectionlist-item-separator';
import {SectionListSectionSeparator} from '../core/section-list/sectionlist-section-separator';

type Properties = {
  selectedNation?: Nation;
  onPressOption: (nation: Nation) => void;
};

export type Option = {
  nation: Nation;
  selected?: boolean;
};

const Component: React.FC<Properties> = ({selectedNation, onPressOption}) => {
  const [sections, setSections] = React.useState<
    {title: string; data: Option[]}[]
  >([]);
  const [newlySelectedNation, setNewlySelectedNation] = React.useState<
    Nation | undefined
  >(selectedNation);

  React.useEffect(() => {
    setSections([
      {
        title: 'COUNTRIES',
        data: [
          {
            nation: {id: '1', name: 'United States', abbr: 'US'},
            selected: newlySelectedNation?.id === '1',
          },
        ],
      },
    ]);
  }, [newlySelectedNation]);

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
        <Text style={[styles.itemGrid]}>{item.nation.name}</Text>
        <View style={[styles.itemGrid, styles.itemGridRight]}>
          <View style={[styles.itemSelectContainer]}>
            {item.selected ? (
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
      keyExtractor={item => item.nation.id}
      renderItem={renderItem}
      renderSectionHeader={({section: {title}}) => (
        <Text style={[styles.listSectionHeader]}>{title}</Text>
      )}
      ItemSeparatorComponent={SectionListItemSeparator}
      SectionSeparatorComponent={SectionListSectionSeparator}
    />
  );
};

export {Component as NationSelectInput};
