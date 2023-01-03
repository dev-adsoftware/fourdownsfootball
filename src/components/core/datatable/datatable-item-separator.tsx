import React from 'react';
import {StyleSheet, View} from 'react-native';
import {withTheme, InjectedThemeProps} from '../../../hoc/with-styles';

interface Properties extends InjectedThemeProps {}

const Component: React.FC<Properties> = props => {
  const {theme} = props;
  const styles = StyleSheet.create({
    separator: {
      height: 1,
      backgroundColor: theme.colors.separator,
    },
  });
  return <View style={[styles.separator]} />;
};

export const DataTableItemSeparator = withTheme(Component);
