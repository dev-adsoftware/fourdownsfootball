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
        row: StyleProp<ViewStyle>;
      };
    }
  }
}

export const CombinedDefaultTheme = merge(
  NavigationDefaultTheme,
  PaperDefaultTheme,
);

const theme: ReactNativePaper.Theme = {
  ...CombinedDefaultTheme,

  // Specify custom properties
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    row: {
      marginVertical: 10,
    },
  },
};

export default theme;
