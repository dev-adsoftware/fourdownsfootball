import React from 'react';
import {StyleSheet, View} from 'react-native';
import {InjectedThemeProps, withTheme} from '../../../hoc/with-styles';

interface Properties extends InjectedThemeProps {
  compact?: boolean;
  children: React.ReactNode;
}

const Component: React.FC<Properties> = props => {
  const {compact = false, children} = props;
  const styles = StyleSheet.create({
    form: {
      width: '100%',
      marginVertical: compact ? 0 : 10,
    },
  });

  return <View style={[styles.form]}>{children}</View>;
};

export const Form = withTheme(Component);
