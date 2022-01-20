import React from 'react';
import {
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';
import {ColorSchemeName, PlatformColor, useColorScheme} from 'react-native';
import {resolveColorSync} from '@klarna/platform-colors';

export class Theme {
  public colorScheme: ColorSchemeName;
  public colors: {
    background: string;
    secondaryBackground: string;
    fill: string;
    separator: string;
    text: string;
    secondaryText: string;
    placeholderText: string;
    link: string;
    error: string;
    blue: string;
    green: string;
    white: string;
  };

  constructor(colorScheme: ColorSchemeName) {
    this.colorScheme = colorScheme;
    this.colors = {
      background: resolveColorSync(PlatformColor('systemBackground')),
      secondaryBackground: resolveColorSync(
        PlatformColor('secondarySystemBackground'),
      ),
      fill: resolveColorSync(PlatformColor('systemFill')),
      separator: resolveColorSync(PlatformColor('separator')),
      text: resolveColorSync(PlatformColor('label')),
      secondaryText: resolveColorSync(PlatformColor('secondaryLabel')),
      placeholderText: resolveColorSync(PlatformColor('placeholderText')),
      link: resolveColorSync(PlatformColor('link')),
      error: resolveColorSync(PlatformColor('systemRed')),
      blue: resolveColorSync(PlatformColor('systemBlue')),
      green: resolveColorSync(PlatformColor('systemGreen')),
      white: 'white',
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
        background: this.colors.background,
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
