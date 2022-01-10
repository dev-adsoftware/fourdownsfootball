import React from 'react';
import {
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';

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

export const colorPalette = {
  'Dark Olive Green': '#606c38',
  'Kombu Green': '#283618',
  Cornsilk: '#fefae0',
  Fawn: '#dda15e',
  'Liver Dogs': '#bc6c25',
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
    primary: colorPalette['Dark Olive Green'],
    background: 'white',
    surface: 'white',
    accent: colorPalette['Liver Dogs'],
    error: 'red',
    text: 'white',
    disabled: 'gray',
    placeholder: 'gray',
    backdrop: 'rgba(0, 0, 0, 0.2)',
    card: colorPalette['Dark Olive Green'],
    border: 'black',
    notification: 'red',
  };
  public fonts: {
    regular: Font;
    bold: Font;
    medium: Font;
    light: Font;
    thin: Font;
  } = {
    regular: {fontFamily: 'System', fontWeight: '400'},
    bold: {fontFamily: 'System', fontWeight: '700'},
    medium: {fontFamily: 'System', fontWeight: '500'},
    light: {fontFamily: 'System', fontWeight: '200'},
    thin: {fontFamily: 'System', fontWeight: '100'},
  };

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

type Properties = {
  children: React.ReactNode;
  initialTheme?: Theme;
};

const ThemeProvider: React.FC<Properties> = ({
  children,
  initialTheme = new Theme(),
}) => {
  const [theme] = React.useState(initialTheme);
  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used with a ThemeProvider');
  }

  return context;
};

export {ThemeProvider, useTheme};
