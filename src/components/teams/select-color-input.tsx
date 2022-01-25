import React from 'react';
import {StyleSheet, Text, Pressable, View, FlatList} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {useTheme} from '../../providers/theme';
import {SectionListItemSeparator} from '../core/section-list/sectionlist-item-separator';

type Properties = {
  allowNone?: boolean;
  selectedColor?: Color;
  onPressOption: (color: Color) => void;
};

export type Color = {name: string; value: string};

export type Option = {
  color: Color;
};

const Component: React.FC<Properties> = ({
  allowNone,
  selectedColor,
  onPressOption,
}) => {
  const [items, setItems] = React.useState<Option[]>([]);

  const [newlySelectedColor, setNewlySelectedColor] = React.useState<
    Color | undefined
  >(selectedColor);

  const theme = useTheme();

  React.useEffect(() => {
    setItems([
      ...(allowNone ? [{color: {name: 'None', value: ''}}] : []),
      {color: {name: 'Blue', value: theme.colors.blue}},
      {color: {name: 'Brown', value: theme.colors.brown}},
      {color: {name: 'Green', value: theme.colors.green}},
      {color: {name: 'Indigo', value: theme.colors.indigo}},
      {color: {name: 'Orange', value: theme.colors.orange}},
      {color: {name: 'Pink', value: theme.colors.pink}},
      {color: {name: 'Purple', value: theme.colors.purple}},
      {color: {name: 'Red', value: theme.colors.red}},
      {color: {name: 'Teal', value: theme.colors.teal}},
      {color: {name: 'Yellow', value: theme.colors.yellow}},
      {color: {name: 'Gray', value: theme.colors.gray}},
      {color: {name: 'Black', value: theme.colors.black}},
      {color: {name: 'White', value: theme.colors.white}},
    ]);
  }, [allowNone, theme.colors]);

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
    itemSwatchGrid: {
      flex: 1,
      borderWidth: 1,
      width: 20,
      height: 10,
      borderColor: theme.colors.separator,
      marginRight: 10,
    },
    itemGrid: {
      flex: 14,
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
      color: Color;
      selected?: boolean;
    };
  }) => {
    return (
      <Pressable
        onPress={() => {
          setNewlySelectedColor(item.color);
          setTimeout(() => onPressOption(item.color), 200);
        }}
        style={[styles.itemRow]}>
        <View
          style={[styles.itemSwatchGrid, {backgroundColor: item.color.value}]}
        />
        <Text style={[styles.itemGrid]}>{item.color.name}</Text>
        <View style={[styles.itemGrid, styles.itemGridRight]}>
          <View style={[styles.itemSelectContainer]}>
            {item.color.name === newlySelectedColor?.name ? (
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
      keyExtractor={item => item.color.name}
      renderItem={renderItem}
      ItemSeparatorComponent={SectionListItemSeparator}
      ListFooterComponent={<View style={[styles.footerPadding]} />}
    />
  );
};

export {Component as ColorSelectInput};
