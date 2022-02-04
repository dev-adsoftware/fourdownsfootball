import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useTheme} from '../../../providers/theme';

type Properties = {};

const Component: React.FC<Properties> = ({}) => {
  const theme = useTheme();
  const styles = StyleSheet.create({
    separator: {
      height: 1,
      backgroundColor: theme.colors.separator,
      marginLeft: 10,
    },
  });
  return <View style={[styles.separator]} />;
};

export {Component as SelectListItemSeparator};
