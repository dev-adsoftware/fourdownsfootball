import React from 'react';
import {StyleSheet, View} from 'react-native';
import {InjectedThemeProps, withTheme} from '../../../hoc/with-theme';

interface Properties extends InjectedThemeProps {}

const Component: React.FC<Properties> = props => {
  const {theme} = props;
  const styles = StyleSheet.create({
    separator: {
      height: '100%',
      width: 1,
      backgroundColor: theme.colors.black,
    },
  });

  return <View style={[styles.separator]} />;
};

export const FullHeightDarkSeparator = withTheme(Component);