import React from 'react';
import { DefaultTheme as PaperDefaultTheme } from 'react-native-paper';
import {
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';
import { StyleProp, View, ViewStyle, TextStyle } from 'react-native';

type Font = {
  fontFamily: string;
  fontWeight?:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900';
};

export class Theme {
  public dark: boolean = false;
  public colors: {
    primary: string;
    background: string;
    surface: string;
    accent: string;
    error: string;
    text: string;
    disabled: string;
    placeholder: string;
    backdrop: string;
    card: string;
    border: string;
    notification: string;
  } = {
    primary: 'blue',
    background: '#f0f0f0',
    surface: 'white',
    accent: 'teal',
    error: 'red',
    text: 'black',
    disabled: 'gray',
    placeholder: 'gray',
    backdrop: 'yellow',
    card: 'white',
    border: 'black',
    notification: 'lightblue',
  };
  public fonts: {
    regular: Font;
    bold: Font;
    medium: Font;
    light: Font;
    thin: Font;
  } = {
    regular: { fontFamily: 'Roboto-Regular', fontWeight: 'normal' },
    bold: { fontFamily: 'Roboto-Bold', fontWeight: 'bold' },
    medium: { fontFamily: 'Roboto-Medium', fontWeight: 'normal' },
    light: { fontFamily: 'Roboto-Light', fontWeight: 'normal' },
    thin: { fontFamily: 'Roboto-Thin', fontWeight: 'normal' },
  };
  public layout: {
    container: StyleProp<ViewStyle>;
    form: { row: StyleProp<ViewStyle> };
    center: StyleProp<ViewStyle>;
    right: StyleProp<ViewStyle>;
    flatList: {
      container: StyleProp<ViewStyle>;
      item: StyleProp<ViewStyle>;
      itemLeft: StyleProp<TextStyle>;
      itemRight: StyleProp<TextStyle>;
      separator: StyleProp<ViewStyle>;
    };
  } = {
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    form: {
      row: { marginVertical: 10, width: '100%', flexDirection: 'row' },
    },
    center: { alignItems: 'center', justifyContent: 'center' },
    right: { alignItems: 'center', justifyContent: 'flex-end' },
    flatList: {
      container: {
        width: '100%',
        paddingLeft: 5,
      },
      item: {
        flex: 1,
        flexDirection: 'row',
        padding: 5,
      },
      itemLeft: {
        flex: 5,
        padding: 5,
        ...this.fonts.bold,
      },
      itemRight: {
        flex: 1,
        textAlign: 'right',
        padding: 5,
      },
      separator: {
        height: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
      },
    },
  };

  public mapToPaper(): typeof PaperDefaultTheme {
    return {
      ...PaperDefaultTheme,
      dark: this.dark,
      colors: {
        ...PaperDefaultTheme.colors,
        primary: this.colors.primary,
        background: this.colors.background,
        surface: this.colors.surface,
        accent: this.colors.accent,
        error: this.colors.error,
        text: this.colors.text,
        disabled: this.colors.disabled,
        placeholder: this.colors.placeholder,
        backdrop: this.colors.backdrop,
        notification: this.colors.notification,
      },
      fonts: {
        ...PaperDefaultTheme.fonts,
        regular: this.fonts.regular,
        medium: this.fonts.medium,
        light: this.fonts.light,
        thin: this.fonts.thin,
      },
    };
  }

  public mapToNavigation(): typeof NavigationDefaultTheme {
    return {
      ...NavigationDefaultTheme,
      dark: this.dark,
      colors: {
        ...(this.dark
          ? NavigationDarkTheme.colors
          : NavigationDefaultTheme.colors),
        primary: this.colors.primary,
        background: this.colors.background,
        card: this.colors.card,
        text: this.colors.text,
        border: this.colors.border,
        notification: this.colors.notification,
      },
    };
  }
}

const ThemeContext = React.createContext<Theme | undefined>(undefined);

type ThemeProviderProps = {
  children: React.ReactNode;
  initialTheme?: Theme;
};

function ThemeProvider({
  children,
  initialTheme = new Theme(),
}: ThemeProviderProps) {
  const [theme] = React.useState(initialTheme);
  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
}

function useTheme() {
  const context = React.useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used with a ThemeProvider');
  }

  return context;
}

export { ThemeProvider, useTheme };
