import React from 'react';
import {StyleSheet, View} from 'react-native';
import {InjectedThemeProps, withTheme} from '../../../hoc/with-theme';

interface Properties extends InjectedThemeProps {
  compact?: boolean;
  children: React.ReactNode;
}

const Component: React.FC<Properties> = props => {
  const {compact = false, children} = props;
  const styles = StyleSheet.create({
    row: {marginVertical: compact ? 3 : 5},
  });

  return <View style={[styles.row]}>{children}</View>;
};

export const FormRow = withTheme(Component);
