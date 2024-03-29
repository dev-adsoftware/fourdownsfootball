import React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {InjectedThemeProps, withTheme} from '../../hoc/with-theme';
import {SectionListItemSeparator} from '../core/section-list/sectionlist-item-separator';
import {SelectOption} from '../core/select/option';

interface Properties extends InjectedThemeProps {
  allowNone?: boolean;
  selectedColor?: Color;
  onPressOption: (color: Color) => void;
}

export type Color = {name: string; value: string};

export type Option = {
  color: Color;
};

const Component: React.FC<Properties> = props => {
  const {allowNone, selectedColor, onPressOption, theme} = props;

  const [items, setItems] = React.useState<Option[]>([]);

  const [newlySelectedColor, setNewlySelectedColor] = React.useState<
    Color | undefined
  >(selectedColor);

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
    itemSwatchGrid: {
      flex: 1,
      borderWidth: 1,
      width: 20,
      height: 10,
      borderColor: theme.colors.separator,
      marginRight: 10,
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
      <SelectOption
        label={item.color.name}
        labelIconComponent={
          <View
            style={[styles.itemSwatchGrid, {backgroundColor: item.color.value}]}
          />
        }
        onSelect={() => {
          setNewlySelectedColor(item.color);
          setTimeout(() => onPressOption(item.color), 200);
        }}
        isSelected={item.color.name === newlySelectedColor?.name}
      />
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

export const ColorSelectInput = withTheme(Component);
