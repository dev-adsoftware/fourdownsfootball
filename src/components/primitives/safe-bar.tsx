import React from 'react';
import {StyleSheet, ViewProps} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {withTheme, WithThemeStyleProps} from '../../hoc/with-styles';

interface SafeBar extends WithThemeStyleProps, Omit<ViewProps, 'style'> {}

const Component: React.FC<SafeBar> = () => {
  const ss = StyleSheet.create({
    s: {backgroundColor: 'white'},
  });
  return <SafeAreaView edges={['top']} style={ss.s} />;
};

export const SafeBar = withTheme(Component);
