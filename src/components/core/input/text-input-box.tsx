import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useTheme} from '../../../providers/theme';

type Properties = {
  children: React.ReactNode;
};

const Component: React.FC<Properties> = ({children}) => {
  const theme = useTheme();
  const styles = StyleSheet.create({
    inputBox: {
      borderWidth: 1,
      borderColor: theme.colors.separator,
      padding: 10,
      borderRadius: 10,
      backgroundColor: theme.colors.fill,
    },
  });
  return <View style={[styles.inputBox]}>{children}</View>;
};

export {Component as TextInputBox};
