import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {InjectedThemeProps, withTheme} from '../../../hoc/with-theme';

interface Properties extends InjectedThemeProps {
  label: string;
  value?: string;
  required?: boolean;
  hideValue?: boolean;
  disabled?: boolean;
  onSelect: () => void;
}

const Component: React.FC<Properties> = props => {
  const {
    label,
    value,
    required = false,
    hideValue = false,
    disabled = false,
    onSelect,
    theme,
  } = props;

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
      flex: 1,
      color: theme.colors.text,
      ...theme.typography.body,
    },
    itemGridDisabled: {
      color: theme.colors.secondaryText,
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
      ...theme.typography.body,
    },
  });

  return (
    <Pressable disabled={disabled} onPress={onSelect} style={[styles.itemRow]}>
      <Text style={[styles.itemGrid, disabled ? styles.itemGridDisabled : {}]}>
        {label}
      </Text>
      <View style={[styles.itemGrid, styles.itemGridRight]}>
        <View style={[styles.itemSelectContainer]}>
          {hideValue ? (
            <></>
          ) : (
            <Text style={[styles.itemSelectText]}>
              {value || (required ? 'Required' : 'Optional')}
            </Text>
          )}
          <FontAwesome5Icon
            name="chevron-right"
            color={theme.colors.secondaryText}
          />
        </View>
      </View>
    </Pressable>
  );
};

export const SelectTrigger = withTheme(Component);
