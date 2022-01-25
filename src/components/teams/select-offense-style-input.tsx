import React from 'react';
import {StyleSheet, Text, Pressable, View, FlatList} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {useTheme} from '../../providers/theme';
import {SectionListItemSeparator} from '../core/section-list/sectionlist-item-separator';

type Properties = {
  selectedStyle?: string;
  onPressOption: (selectedStyle: string) => void;
};

export type Option = {
  style: string;
};

const Component: React.FC<Properties> = ({selectedStyle, onPressOption}) => {
  const [items, setItems] = React.useState<Option[]>([]);

  const [newlySelectedStyle, setNewlySelectedStyle] = React.useState<
    string | undefined
  >(selectedStyle);

  const theme = useTheme();

  React.useEffect(() => {
    setItems([
      {style: 'Balanced'},
      {style: 'Balanced Passing'},
      {style: 'Deep Passing'},
      {style: 'Short Passing'},
      {style: 'Rushing'},
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
      style: string;
      selected?: boolean;
    };
  }) => {
    return (
      <Pressable
        onPress={() => {
          setNewlySelectedStyle(item.style);
          setTimeout(() => onPressOption(item.style), 200);
        }}
        style={[styles.itemRow]}>
        <Text style={[styles.itemGrid]}>{item.style}</Text>
        <View style={[styles.itemGrid, styles.itemGridRight]}>
          <View style={[styles.itemSelectContainer]}>
            {item.style === newlySelectedStyle ? (
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
      keyExtractor={item => item.style}
      renderItem={renderItem}
      ItemSeparatorComponent={SectionListItemSeparator}
      ListFooterComponent={<View style={[styles.footerPadding]} />}
    />
  );
};

export {Component as OffenseStyleSelectInput};
