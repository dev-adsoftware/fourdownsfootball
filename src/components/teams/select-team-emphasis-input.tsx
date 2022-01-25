import React from 'react';
import {StyleSheet, Text, Pressable, View, FlatList} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {useTheme} from '../../providers/theme';
import {SectionListItemSeparator} from '../core/section-list/sectionlist-item-separator';

type Properties = {
  selectedEmphasis?: string;
  onPressOption: (selectedEmphasis: string) => void;
};

export type Option = {
  emphasis: string;
};

const Component: React.FC<Properties> = ({selectedEmphasis, onPressOption}) => {
  const [items, setItems] = React.useState<Option[]>([]);

  const [newlySelectedEmphasis, setNewlySelectedEmphasis] = React.useState<
    string | undefined
  >(selectedEmphasis);

  const theme = useTheme();

  React.useEffect(() => {
    setItems([
      {emphasis: 'Balanced'},
      {emphasis: 'Defense'},
      {emphasis: 'Offense'},
    ]);
  }, []);

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
  });

  const renderItem = ({
    item,
  }: {
    item: {
      emphasis: string;
      selected?: boolean;
    };
  }) => {
    return (
      <Pressable
        onPress={() => {
          setNewlySelectedEmphasis(item.emphasis);
          setTimeout(() => onPressOption(item.emphasis), 200);
        }}
        style={[styles.itemRow]}>
        <Text style={[styles.itemGrid]}>{item.emphasis}</Text>
        <View style={[styles.itemGrid, styles.itemGridRight]}>
          <View style={[styles.itemSelectContainer]}>
            {item.emphasis === newlySelectedEmphasis ? (
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
    <FlatList
      style={[styles.listContainer]}
      data={items}
      keyExtractor={item => item.emphasis}
      renderItem={renderItem}
      ItemSeparatorComponent={SectionListItemSeparator}
      ListFooterComponent={<View style={[styles.footerPadding]} />}
    />
  );
};

export {Component as TeamEmphasisSelectInput};
