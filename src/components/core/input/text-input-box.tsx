import React from 'react';
import {StyleSheet, View} from 'react-native';
import {InjectedThemeProps, withTheme} from '../../../hoc/with-styles';

interface Properties extends InjectedThemeProps {
  children: React.ReactNode;
}

const Component: React.FC<Properties> = props => {
  const {children, theme} = props;
  const styles = StyleSheet.create({
    inputBox: {
      borderWidth: 1,
      borderColor: theme.colors.separator,
      paddingHorizontal: 10,
      paddingVertical: 7,
      borderRadius: 10,
      backgroundColor: theme.colors.secondaryBackground,
    },
  });
  return <View style={[styles.inputBox]}>{children}</View>;
};

export const TextInputBox = withTheme(Component);
