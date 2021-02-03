import * as React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { DefaultTheme as PaperDefaultTheme } from 'react-native-paper';
import { DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';
import merge from 'deepmerge';

declare global {
  namespace ReactNativePaper {
    interface ThemeColors {
      card: string;
      border: string;
    }
    interface Theme {
      container: StyleProp<ViewStyle>;
      form: {
        rowCenter: StyleProp<ViewStyle>;
        rowRight: StyleProp<ViewStyle>;
      };
    }
  }
}

export const CombinedDefaultTheme = merge(
  NavigationDefaultTheme,
  PaperDefaultTheme,
);

const formRowDefaults: StyleProp<ViewStyle> = {
  marginVertical: 10,
  width: '100%',
  flexDirection: 'row',
};

const theme: ReactNativePaper.Theme = {
  ...CombinedDefaultTheme,
  // Specify custom properties
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    rowCenter: {
      ...formRowDefaults,
      alignItems: 'center',
      justifyContent: 'center',
    },
    rowRight: {
      ...formRowDefaults,
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
  },
};

export default theme;
