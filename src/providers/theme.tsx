import React from 'react';
import {ColorSchemeName, useColorScheme} from 'react-native';
import {noop} from 'lodash';
import TinyColor from 'tinycolor2';
import {ColorPalette} from '../constants/color-palette';

export type ThemeColorKey = keyof Theme['colors'];
export type ThemeIconSizeKey = keyof Theme['iconSizes'];
export type ThemeFontSizeKey = keyof Theme['fontSizes'];
export type ThemeTypeFacesKey = keyof Theme['typeFaces'];
export class Theme {
  public colors = {
    primary: ColorPalette.BLUE_800,
    primaryLight: ColorPalette.BLUE_500,
    primaryDark: ColorPalette.BLUE_900,
    secondary: ColorPalette.RED_700,
    secondaryLight: ColorPalette.RED_500,
    secondaryDark: ColorPalette.RED_900,
    error: ColorPalette.RED_500,
    warning: ColorPalette.ORANGE_700,
    success: ColorPalette.GREEN_700,
    disabled: ColorPalette.GRAY_500,
    navSurface: ColorPalette.WHITE,
    separator: ColorPalette.GRAY_300,
    white: ColorPalette.WHITE,
    black: ColorPalette.BLACK,
    primaryText: ColorPalette.GRAY_800,
    placeholder: ColorPalette.GRAY_700,
    inputBorder: ColorPalette.GRAY_700,
    grayLink: ColorPalette.GRAY_700,
    grayButton: ColorPalette.GRAY_400,
    lightGrayButton: ColorPalette.GRAY_300,
    oddLayerSurface: ColorPalette.GRAY_100,
    evenLayerSurface: ColorPalette.GRAY_300,
    transparentVeryDark: ColorPalette.TRANSPARENT_800,
    transparentDark: ColorPalette.TRANSPARENT_700,
    transparentMedium: ColorPalette.TRANSPARENT_500,
    transparentLight: ColorPalette.TRANSPARENT_300,
    transparent: ColorPalette.TRANSPARENT_FULL,

    football: ColorPalette.BROWN_500,
    grass: '#71A92C',

    playbook: ColorPalette.BROWN_700,
    actionButton: ColorPalette.AMBER_500,

    portraitSurface: ColorPalette.LIGHT_BLUE_100,
    skinTone: ColorPalette.BROWN_400,
  };

  public teamColors: {[key: string]: ColorPalette} = {
    red: ColorPalette.RED_500,
    black: ColorPalette.BLACK,
  };

  public fontSizes = {
    caption2: 11,
    caption1: 12,
    footnote: 13,
    subhead: 15,
    callout: 16,
    body: 17,
    headline: 18,
    title3: 20,
    title2: 22,
    title1: 28,
    largeTitle: 34,
  };

  public typeFaces = {
    klavikaCondensedBoldItalic: {
      fontFamily: 'KlavikaCondensed-BoldItalic',
      letterSpacing: 0.64,
    },
    klavikaCondensedBold: {
      fontFamily: 'KlavikaCondensed-Bold',
      letterSpacing: 0.64,
    },
    klavikaCondensedRegularItalic: {
      fontFamily: 'KlavikaCondensed-Italic',
      letterSpacing: 0.64,
    },
    klavikaCondensedRegular: {
      fontFamily: 'KlavikaCondensed-Regular',
      letterSpacing: 0.64,
    },
    klavikaCondensedMediumItalic: {
      fontFamily: 'KlavikaCondensed-MediumItalic',
      letterSpacing: 0.64,
    },
    klavikaCondensedMedium: {
      fontFamily: 'KlavikaCondensed-Medium',
      letterSpacing: 0.64,
    },
    sourceSansProRegular: {
      fontFamily: 'SourceSansPro-Regular',
    },
    sourceSansProSemibold: {
      fontFamily: 'SourceSansPro-Semibold',
    },
    sourceSansProBold: {
      fontFamily: 'SourceSansPro-Bold',
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
    '3xs': 14,
    '2xs': 16,
    xs: 18,
    sm: 20,
    md: 22,
    lg: 24,
    xl: 26,
    '2xl': 28,
    '3xl': 30,
    '4xl': 50,
  };

  constructor(colorScheme: ColorSchemeName) {
    noop(colorScheme);
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

  public getRedGreenGradient = (percent: number): string => {
    if (percent <= 50) {
      return `rgba(255,${0 + ((percent * 2) / 100) * 255},0,1)`;
    }
    return `rgba(${255 - (((percent - 50) * 2) / 100) * 255},255,0,1)`;
  };
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
