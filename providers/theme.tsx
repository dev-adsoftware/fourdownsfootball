import React from 'react';
import {
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';
import {ColorSchemeName, TextStyle, useColorScheme} from 'react-native';

export class Theme {
  public colorScheme: ColorSchemeName;
  public colors: {
    background: string;
    secondaryBackground: string;
    tertiaryBackground: string;
    fill: string;
    separator: string;
    text: string;
    secondaryText: string;
    tertiaryText: string;
    quaternaryText: string;
    placeholderText: string;
    link: string;
    error: string;
    blue: string;
    brown: string;
    green: string;
    orange: string;
    pink: string;
    purple: string;
    red: string;
    teal: string;
    yellow: string;
    gray: string;
    black: string;
    white: string;
    silver: string;
    grass: string;
    chalk: string;
    pieChartDarkRed: string;
    pieChartRed: string;
    pieChartGreen: string;
    pieChartLightGreen: string;
  };
  public typography: {
    largeTitle: TextStyle;
    title1: TextStyle;
    title2: TextStyle;
    title3: TextStyle;
    body: TextStyle;
    headline: TextStyle;
    subheading: TextStyle;
    footnote: TextStyle;
    caption1: TextStyle;
    caption2: TextStyle;
  };

  constructor(colorScheme: ColorSchemeName) {
    this.colorScheme = colorScheme;
    this.colors = {
      background: '#FFF',
      secondaryBackground: '#CCC',
      tertiaryBackground: '#888',
      fill: '#333',
      separator: '#000',
      text: '#000',
      secondaryText: '#000',
      tertiaryText: '#000',
      quaternaryText: '#000',
      placeholderText: '#000',
      link: '#000',
      error: 'red',
      blue: 'blue',
      brown: 'brown',
      green: 'green',
      orange: 'orange',
      pink: 'pink',
      purple: 'purple',
      red: 'red',
      teal: 'teal',
      yellow: 'yellow',
      gray: 'gray',
      black: 'black',
      white: 'white',
      silver: 'silver',
      grass: '#59A608',
      chalk: 'rgba(255,255,255,0.9)',
      pieChartDarkRed: '#AA0000',
      pieChartRed: '#FF0000',
      pieChartGreen: '#00BB00',
      pieChartLightGreen: '#00EE00',
    };
    this.typography = {
      largeTitle: {fontSize: 34, color: this.colors.text},
      title1: {fontSize: 28, color: this.colors.text},
      title2: {fontSize: 22, color: this.colors.text},
      title3: {fontSize: 20, color: this.colors.text},
      body: {
        fontSize: 17,
        color: this.colors.text,
      },
      headline: {
        fontSize: 17,
        fontWeight: '500',
        color: this.colors.text,
      },
      subheading: {fontSize: 15, color: this.colors.text},
      footnote: {fontSize: 13, color: this.colors.text},
      caption1: {fontSize: 12, color: this.colors.text},
      caption2: {fontSize: 11, color: this.colors.text},
    };
    // console.log(this.colors);
  }

  public mapToNavigation(
    colorScheme: ColorSchemeName,
  ): typeof NavigationDefaultTheme {
    return {
      ...NavigationDefaultTheme,
      dark: colorScheme === 'dark',
      colors: {
        ...(colorScheme === 'dark'
          ? NavigationDarkTheme.colors
          : NavigationDefaultTheme.colors),
        // primary: 'red',
        background: this.colors.tertiaryBackground,
        // card: 'red',
        // text: 'red',
        // border: this.colors.border,
        // notification: this.colors.notification,
      },
    };
  }
}

const ThemeContext = React.createContext<Theme | undefined>(undefined);

type Properties = {
  children: React.ReactNode;
  initialTheme?: Theme;
};

const ThemeProvider: React.FC<Properties> = ({children}) => {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = React.useState<Theme>(new Theme(colorScheme));

  React.useEffect(() => {
    setTheme(new Theme(colorScheme));
  }, [colorScheme]);

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
