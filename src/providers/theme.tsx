import React from 'react';
import {
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';
import {
  ColorSchemeName,
  PlatformColor,
  TextStyle,
  useColorScheme,
} from 'react-native';
import {resolveColorSync} from '@klarna/platform-colors';

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
    indigo: string;
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
      background: resolveColorSync(PlatformColor('systemBackground')),
      secondaryBackground: resolveColorSync(
        PlatformColor('secondarySystemBackground'),
      ),
      tertiaryBackground: resolveColorSync(
        PlatformColor('tertiarySystemBackground'),
      ),
      fill: resolveColorSync(PlatformColor('systemFill')),
      separator: resolveColorSync(PlatformColor('separator')),
      text: resolveColorSync(PlatformColor('label')),
      secondaryText: resolveColorSync(PlatformColor('secondaryLabel')),
      tertiaryText: resolveColorSync(PlatformColor('tertiaryLabel')),
      quaternaryText: resolveColorSync(PlatformColor('quaternaryLabel')),
      placeholderText: resolveColorSync(PlatformColor('placeholderText')),
      link: resolveColorSync(PlatformColor('link')),
      error: resolveColorSync(PlatformColor('systemRed')),
      blue: resolveColorSync(PlatformColor('systemBlue')),
      brown: resolveColorSync(PlatformColor('systemBrown')),
      green: resolveColorSync(PlatformColor('systemGreen')),
      indigo: resolveColorSync(PlatformColor('systemIndigo')),
      orange: resolveColorSync(PlatformColor('systemOrange')),
      pink: resolveColorSync(PlatformColor('systemPink')),
      purple: resolveColorSync(PlatformColor('systemPurple')),
      red: resolveColorSync(PlatformColor('systemRed')),
      teal: resolveColorSync(PlatformColor('systemTeal')),
      yellow: resolveColorSync(PlatformColor('systemYellow')),
      gray: resolveColorSync(PlatformColor('systemGray')),
      black: 'black',
      white: 'white',
      silver: 'silver',
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
