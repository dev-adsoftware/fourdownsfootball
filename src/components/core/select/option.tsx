import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {useTheme} from '../../../providers/theme';

type Properties = {
  label: string;
  isSelected?: boolean;
  labelIconComponent?: React.ReactNode;
  onSelect: () => void;
};

const Component: React.FC<Properties> = ({
  label,
  isSelected = false,
  labelIconComponent,
  onSelect,
}) => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    itemRow: {
      backgroundColor: theme.colors.background,
      paddingLeft: 10,
      paddingVertical: 10,
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 0,
    },
    itemGrid: {
      flex: labelIconComponent ? 14 : 5,
      color: theme.colors.text,
      ...theme.typography.body,
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

  return (
    <Pressable onPress={onSelect} style={[styles.itemRow]}>
      {labelIconComponent ? labelIconComponent : <></>}
      <Text style={[styles.itemGrid]}>{label}</Text>
      <View style={[styles.itemGrid, styles.itemGridRight]}>
        <View style={[styles.itemSelectContainer]}>
          {isSelected ? (
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

export {Component as SelectOption};
