import React from 'react';
import {ColorSchemeName, Dimensions, useColorScheme} from 'react-native';
import {noop, times} from 'lodash';
import TinyColor from 'tinycolor2';
import {BASE_SCREEN_WIDTH, ColorPalette} from '../constants';
import {RangeObject} from '../types';

const {width} = Dimensions.get('window');
const fontScale = width / BASE_SCREEN_WIDTH;

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

    white: ColorPalette.WHITE,
    black: ColorPalette.BLACK,

    darkText: ColorPalette.GRAY_800,
    placeholderText: ColorPalette.GRAY_700,

    inputBorder: ColorPalette.GRAY_700,
    separator: ColorPalette.GRAY_300,

    grayLink: ColorPalette.GRAY_700,

    grayButton: ColorPalette.GRAY_400,
    lightGrayButton: ColorPalette.GRAY_300,

    navSurface: ColorPalette.WHITE,
    oddLayerSurface: ColorPalette.GRAY_100,
    evenLayerSurface: ColorPalette.GRAY_300,
    darkSurface: ColorPalette.GRAY_800,

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

  public fontSizes: RangeObject<35, number> = {
    ...times(35, index => {
      return index * fontScale;
    }).reduce((prev, curr, index) => {
      return {
        ...prev,
        [index]: curr,
      };
    }, {} as RangeObject<35, number>),
    // caption2: 11 * fontScale,
    // caption1: 12 * fontScale,
    // footnote: 13 * fontScale,
    // subhead: 15 * fontScale,
    // callout: 16 * fontScale,
    // body: 17 * fontScale,
    // headline: 18 * fontScale,
    // title3: 20 * fontScale,
    // title2: 22 * fontScale,
    // title1: 28 * fontScale,
    // largeTitle: 34 * fontScale,
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

  public iconSizes: RangeObject<25, number> = {
    ...times(25, index => {
      return index * 2;
    }).reduce((prev, curr, index) => {
      return {
        ...prev,
        [index]: curr,
      };
    }, {} as RangeObject<25, number>),
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

  public getColor = (
    themeColor: ThemeColorKey | undefined,
  ): string | undefined => {
    if (themeColor) {
      return this.colors[themeColor];
    }
    return undefined;
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
