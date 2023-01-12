import React from 'react';
import {
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';
import {ColorSchemeName, useColorScheme} from 'react-native';
import {noop} from 'lodash';
import TinyColor from 'tinycolor2';
import {
  COLOR_PALETETE_TRANSPARENT,
  COLOR_PALETTE_BLACK,
  COLOR_PALETTE_BLUE_500,
  COLOR_PALETTE_BLUE_800,
  COLOR_PALETTE_BLUE_900,
  COLOR_PALETTE_GRAY_100,
  COLOR_PALETTE_GRAY_200,
  COLOR_PALETTE_GRAY_300,
  COLOR_PALETTE_GRAY_500,
  COLOR_PALETTE_GRAY_700,
  COLOR_PALETTE_GREEN_700,
  COLOR_PALETTE_ORANGE_700,
  COLOR_PALETTE_RED_500,
  COLOR_PALETTE_RED_700,
  COLOR_PALETTE_RED_900,
  COLOR_PALETTE_WHITE,
} from '../constants/color-palette';
import {TAB_BAR_HEIGHT} from '../constants/tab-bar';

export type ThemeSpacingKey = keyof Theme['spacing'];
export type ThemeColorKey = keyof Theme['colors'];
export type ThemeBorderWidthKey = keyof Theme['borderWidths'];
export type ThemeBorderRadiiKey = keyof Theme['borderRadii'];
export type ThemeIconSizeKey = keyof Theme['iconSizes'];
export type ThemeFontSizeKey = keyof Theme['fontSizes'];
export type ThemeTypeFacesKey = keyof Theme['typeFaces'];
export class Theme {
  public colors = {
    primary: COLOR_PALETTE_BLUE_800,
    primaryLight: COLOR_PALETTE_BLUE_500,
    primaryDark: COLOR_PALETTE_BLUE_900,
    secondary: COLOR_PALETTE_RED_700,
    secondaryLight: COLOR_PALETTE_RED_500,
    secondaryDark: COLOR_PALETTE_RED_900,
    error: COLOR_PALETTE_RED_500,
    warning: COLOR_PALETTE_ORANGE_700,
    success: COLOR_PALETTE_GREEN_700,
    disabled: COLOR_PALETTE_GRAY_500,
    navSurface: COLOR_PALETTE_WHITE,
    separator: COLOR_PALETTE_GRAY_300,
    white: COLOR_PALETTE_WHITE,
    black: COLOR_PALETTE_BLACK,
    transparent: COLOR_PALETETE_TRANSPARENT,
    placeholder: COLOR_PALETTE_GRAY_500,
    inputBorder: COLOR_PALETTE_GRAY_500,
    grayLink: COLOR_PALETTE_GRAY_700,
    oddLayerSurface: COLOR_PALETTE_GRAY_100,
    evenLayerSurface: COLOR_PALETTE_GRAY_200,
  };

  public spacing = {
    none: 0,
    '3xs': 1,
    '2xs': 2,
    xs: 4,
    sm: 6,
    md: 8,
    lg: 10,
    xl: 16,
    '2xl': 20,
    '3xl': 40,
    safe: 40,
    tabBarHeight: -TAB_BAR_HEIGHT,
  };

  public borderRadii = {
    none: 0,
    '2xs': 1,
    xs: 2,
    sm: 4,
    md: 6,
    lg: 8,
    xl: 12,
    '2xl': 16,
    full: 99999,
  };

  public borderWidths = {
    none: 0,
    '2xs': 1,
    xs: 2,
    sm: 4,
    md: 6,
    lg: 8,
    xl: 12,
    '2xl': 16,
  };

  public fontSizes = {
    '4xs': 11,
    '3xs': 12,
    '2xs': 13,
    xs: 15,
    sm: 16,
    md: 17,
    lg: 22,
    xl: 28,
    '2xl': 34,
  };

  public typeFaces = {
    klavikaCondensedBoldItalic: {
      fontFamily: 'KlavikaCondensed-BoldItalic',
      letterSpacing: 0.64,
    },
    proximaNovaRegular: {
      fontFamily: 'ProximaNova-Regular',
      letterSpacing: 0.1,
    },
    sourceSansProRegular: {
      fontFamily: 'SourceSansPro-Regular',
    },
    // SourceSansPro-Regular
    // SourceSansPro-It
    // SourceSansPro-ExtraLight
    // SourceSansPro-ExtraLightIt
    // SourceSansPro-Light
    // SourceSansPro-LightIt
    // SourceSansPro-Semibold
    // SourceSansPro-SemiboldIt
    // SourceSansPro-Bold
    // SourceSansPro-BoldIt
    // SourceSansPro-Black
    // SourceSansPro-BlackIt
  };

  public iconSizes = {
    xs: 10,
    sm: 15,
    md: 20,
    lg: 25,
    xl: 30,
    '2xl': 35,
    '3xl': 40,
    '4xl': 45,
    '5xl': 50,
  };

  constructor(colorScheme: ColorSchemeName) {
    noop(colorScheme);
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
        // primary: this.colors.primary,
        // background: this.colors.layer1,
        // card: 'green',
        // text: 'red',
        // border: 'orange',
        // notification: 'purple',
        // primary: 'red',
      },
    };
  }

  public getContrastRatio(foreground: string, background: string): number {
    const lumA = TinyColor(foreground).getLuminance();
    const lumB = TinyColor(background).getLuminance();
    return (Math.max(lumA, lumB) + 0.05) / (Math.min(lumA, lumB) + 0.05);
  }

  public getContrastTextColor(
    background: keyof this['colors'],
    preferredTextColor?: keyof this['colors'],
  ): string {
    const contrastThreshold = 7;

    const colorsRecordType = this.colors as Record<
      keyof this['colors'],
      string
    >;

    if (preferredTextColor) {
      const preferredColorContrast = this.getContrastRatio(
        colorsRecordType[preferredTextColor],
        colorsRecordType[background],
      );
      if (preferredColorContrast >= contrastThreshold) {
        return colorsRecordType[preferredTextColor];
      }
    }

    const whiteContrast = this.getContrastRatio(
      this.colors.white,
      colorsRecordType[background],
    );
    const blackContrast = this.getContrastRatio(
      this.colors.black,
      colorsRecordType[background],
    );
    if (whiteContrast >= blackContrast) {
      return this.colors.white;
    }

    return this.colors.black;
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
