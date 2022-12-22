import React from 'react';
import {
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';
import {
  ColorSchemeName,
  StyleSheet,
  TextStyle,
  useColorScheme,
  ViewStyle,
} from 'react-native';
import {get, isArray, isObject, noop} from 'lodash';
import TinyColor from 'tinycolor2';

interface IColorHues {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
}

type Color = string | IColorHues;

interface IColorPalette {
  transparent: Color;
  white: Color;
  black: Color;
  rose: Color;
  pink: Color;
  fuchsia: Color;
  purple: Color;
  violet: Color;
  indigo: Color;
  blue: Color;
  lightBlue: Color;
  darkBlue: Color;
  cyan: Color;
  teal: Color;
  emerald: Color;
  green: Color;
  lime: Color;
  yellow: Color;
  amber: Color;
  orange: Color;
  red: Color;
  warmGray: Color;
  trueGray: Color;
  gray: Color;
  coolGray: Color;
  blueGray: Color;
}

const ColorPalette: IColorPalette = {
  transparent: 'transparent',
  white: '#FFFFFF',
  black: '#000000',
  rose: {
    50: '#fff1f2',
    100: '#ffe4e6',
    200: '#fecdd3',
    300: '#fda4af',
    400: '#fb7185',
    500: '#f43f5e',
    600: '#e11d48',
    700: '#be123c',
    800: '#9f1239',
    900: '#881337',
  },
  pink: {
    50: '#fdf2f8',
    100: '#fce7f3',
    200: '#fbcfe8',
    300: '#f9a8d4',
    400: '#f472b6',
    500: '#ec4899',
    600: '#db2777',
    700: '#be185d',
    800: '#9d174d',
    900: '#831843',
  },
  fuchsia: {
    50: '#fdf4ff',
    100: '#fae8ff',
    200: '#f5d0fe',
    300: '#f0abfc',
    400: '#e879f9',
    500: '#d946ef',
    600: '#c026d3',
    700: '#a21caf',
    800: '#86198f',
    900: '#701a75',
  },
  purple: {
    50: '#faf5ff',
    100: '#f3e8ff',
    200: '#e9d5ff',
    300: '#d8b4fe',
    400: '#c084fc',
    500: '#a855f7',
    600: '#9333ea',
    700: '#7e22ce',
    800: '#6b21a8',
    900: '#581c87',
  },
  violet: {
    50: '#f5f3ff',
    100: '#ede9fe',
    200: '#ddd6fe',
    300: '#c4b5fd',
    400: '#a78bfa',
    500: '#8b5cf6',
    600: '#7c3aed',
    700: '#6d28d9',
    800: '#5b21b6',
    900: '#4c1d95',
  },
  indigo: {
    50: '#eef2ff',
    100: '#e0e7ff',
    200: '#c7d2fe',
    300: '#a5b4fc',
    400: '#818cf8',
    500: '#6366f1',
    600: '#4f46e5',
    700: '#4338ca',
    800: '#3730a3',
    900: '#312e81',
  },
  blue: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },
  lightBlue: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9',
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
  },
  darkBlue: {
    50: '#dbf4ff',
    100: '#addbff',
    200: '#7cc2ff',
    300: '#4aa9ff',
    400: '#1a91ff',
    500: '#0077e6',
    600: '#005db4',
    700: '#004282',
    800: '#002851',
    900: '#000e21',
  },
  cyan: {
    50: '#ecfeff',
    100: '#cffafe',
    200: '#a5f3fc',
    300: '#67e8f9',
    400: '#22d3ee',
    500: '#06b6d4',
    600: '#0891b2',
    700: '#0e7490',
    800: '#155e75',
    900: '#164e63',
  },
  teal: {
    50: '#f0fdfa',
    100: '#ccfbf1',
    200: '#99f6e4',
    300: '#5eead4',
    400: '#2dd4bf',
    500: '#14b8a6',
    600: '#0d9488',
    700: '#0f766e',
    800: '#115e59',
    900: '#134e4a',
  },
  emerald: {
    50: '#ecfdf5',
    100: '#d1fae5',
    200: '#a7f3d0',
    300: '#6ee7b7',
    400: '#34d399',
    500: '#10b981',
    600: '#059669',
    700: '#047857',
    800: '#065f46',
    900: '#064e3b',
  },
  green: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },
  lime: {
    50: '#f7fee7',
    100: '#ecfccb',
    200: '#d9f99d',
    300: '#bef264',
    400: '#a3e635',
    500: '#84cc16',
    600: '#65a30d',
    700: '#4d7c0f',
    800: '#3f6212',
    900: '#365314',
  },
  yellow: {
    50: '#fefce8',
    100: '#fef9c3',
    200: '#fef08a',
    300: '#fde047',
    400: '#facc15',
    500: '#eab308',
    600: '#ca8a04',
    700: '#a16207',
    800: '#854d0e',
    900: '#713f12',
  },
  amber: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },
  orange: {
    50: '#fff7ed',
    100: '#ffedd5',
    200: '#fed7aa',
    300: '#fdba74',
    400: '#fb923c',
    500: '#f97316',
    600: '#ea580c',
    700: '#c2410c',
    800: '#9a3412',
    900: '#7c2d12',
  },
  red: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  },
  warmGray: {
    50: '#fafaf9',
    100: '#f5f5f4',
    200: '#e7e5e4',
    300: '#d6d3d1',
    400: '#a8a29e',
    500: '#78716c',
    600: '#57534e',
    700: '#44403c',
    800: '#292524',
    900: '#1c1917',
  },
  trueGray: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
  },
  gray: {
    50: '#fafafa',
    100: '#f4f4f5',
    200: '#e4e4e7',
    300: '#d4d4d8',
    400: '#a1a1aa',
    500: '#71717a',
    600: '#52525b',
    700: '#3f3f46',
    800: '#27272a',
    900: '#18181b',
  },
  coolGray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
  blueGray: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },
};

type RNStyleSheet = {s: TextStyle | ViewStyle};
export type ThemeStyles = {
  'c-contrast': RNStyleSheet;
  'c-primary': RNStyleSheet;
  'c-primary-lt': RNStyleSheet;
  'c-primary-dk': RNStyleSheet;
  'c-secondary': RNStyleSheet;
  'c-secondary-lt': RNStyleSheet;
  'c-secondary-dk': RNStyleSheet;
  'c-error': RNStyleSheet;
  'c-warning': RNStyleSheet;
  'c-success': RNStyleSheet;
  'c-gray': RNStyleSheet;
  'bg-primary': RNStyleSheet;
  'bg-primary-lt': RNStyleSheet;
  'bg-primary-dk': RNStyleSheet;
  'bg-secondary': RNStyleSheet;
  'bg-secondary-lt': RNStyleSheet;
  'bg-secondary-dk': RNStyleSheet;
  'bg-error': RNStyleSheet;
  'bg-warning': RNStyleSheet;
  'bg-success': RNStyleSheet;
  'input-border': RNStyleSheet;
  'input-border-error': RNStyleSheet;
  'input-label': RNStyleSheet;
  input: RNStyleSheet;
  'opaque-100': RNStyleSheet;
  'opaque-0': RNStyleSheet;
  link: RNStyleSheet;
  'circle-primary-outlined-sm': RNStyleSheet;
  'circle-primary-outlined-md': RNStyleSheet;
  'circle-primary-outlined-lg': RNStyleSheet;
  'circle-primary-solid-sm': RNStyleSheet;
  'circle-primary-solid-md': RNStyleSheet;
  'circle-primary-solid-lg': RNStyleSheet;
  'circle-invisible-sm': RNStyleSheet;
  'circle-invisible-md': RNStyleSheet;
  'circle-invisible-lg': RNStyleSheet;
  't-body': RNStyleSheet;
  't-title': RNStyleSheet;
  'a-start': RNStyleSheet;
  'a-center': RNStyleSheet;
  'a-end': RNStyleSheet;
  'p-xxxs': RNStyleSheet;
  'p-xxs': RNStyleSheet;
  'p-xs': RNStyleSheet;
  'p-sm': RNStyleSheet;
  'p-md': RNStyleSheet;
  'p-lg': RNStyleSheet;
  'p-xl': RNStyleSheet;
  'p-xxl': RNStyleSheet;
  'p-top-xxxs': RNStyleSheet;
  'p-top-xxs': RNStyleSheet;
  'p-top-xs': RNStyleSheet;
  'p-top-sm': RNStyleSheet;
  'p-top-md': RNStyleSheet;
  'p-top-lg': RNStyleSheet;
  'p-top-xl': RNStyleSheet;
  'p-top-xxl': RNStyleSheet;
  'p-btm-xxxs': RNStyleSheet;
  'p-btm-xxs': RNStyleSheet;
  'p-btm-xs': RNStyleSheet;
  'p-btm-sm': RNStyleSheet;
  'p-btm-md': RNStyleSheet;
  'p-btm-lg': RNStyleSheet;
  'p-btm-xl': RNStyleSheet;
  'p-btm-xxl': RNStyleSheet;
  'p-right-xxxs': RNStyleSheet;
  'p-right-xxs': RNStyleSheet;
  'p-right-xs': RNStyleSheet;
  'p-right-sm': RNStyleSheet;
  'p-right-md': RNStyleSheet;
  'p-right-lg': RNStyleSheet;
  'p-right-xl': RNStyleSheet;
  'p-right-xxl': RNStyleSheet;
  'p-left-xxxs': RNStyleSheet;
  'p-left-xxs': RNStyleSheet;
  'p-left-xs': RNStyleSheet;
  'p-left-sm': RNStyleSheet;
  'p-left-md': RNStyleSheet;
  'p-left-lg': RNStyleSheet;
  'p-left-xl': RNStyleSheet;
  'p-left-xxl': RNStyleSheet;
  'p-x-xxxs': RNStyleSheet;
  'p-x-xxs': RNStyleSheet;
  'p-x-xs': RNStyleSheet;
  'p-x-sm': RNStyleSheet;
  'p-x-md': RNStyleSheet;
  'p-x-lg': RNStyleSheet;
  'p-x-xl': RNStyleSheet;
  'p-x-xxl': RNStyleSheet;
  'p-y-xxxs': RNStyleSheet;
  'p-y-xxs': RNStyleSheet;
  'p-y-xs': RNStyleSheet;
  'p-y-sm': RNStyleSheet;
  'p-y-md': RNStyleSheet;
  'p-y-lg': RNStyleSheet;
  'p-y-xl': RNStyleSheet;
  'p-y-xxl': RNStyleSheet;
  'm-xxxs': RNStyleSheet;
  'm-xxs': RNStyleSheet;
  'm-xs': RNStyleSheet;
  'm-sm': RNStyleSheet;
  'm-md': RNStyleSheet;
  'm-lg': RNStyleSheet;
  'm-xl': RNStyleSheet;
  'm-xxl': RNStyleSheet;
  'm-top-xxxs': RNStyleSheet;
  'm-top-xxs': RNStyleSheet;
  'm-top-xs': RNStyleSheet;
  'm-top-sm': RNStyleSheet;
  'm-top-md': RNStyleSheet;
  'm-top-lg': RNStyleSheet;
  'm-top-xl': RNStyleSheet;
  'm-top-xxl': RNStyleSheet;
  'm-btm-xxxs': RNStyleSheet;
  'm-btm-xxs': RNStyleSheet;
  'm-btm-xs': RNStyleSheet;
  'm-btm-sm': RNStyleSheet;
  'm-btm-md': RNStyleSheet;
  'm-btm-lg': RNStyleSheet;
  'm-btm-xl': RNStyleSheet;
  'm-btm-xxl': RNStyleSheet;
  'm-right-xxxs': RNStyleSheet;
  'm-right-xxs': RNStyleSheet;
  'm-right-xs': RNStyleSheet;
  'm-right-sm': RNStyleSheet;
  'm-right-md': RNStyleSheet;
  'm-right-lg': RNStyleSheet;
  'm-right-xl': RNStyleSheet;
  'm-right-xxl': RNStyleSheet;
  'm-left-xxxs': RNStyleSheet;
  'm-left-xxs': RNStyleSheet;
  'm-left-xs': RNStyleSheet;
  'm-left-sm': RNStyleSheet;
  'm-left-md': RNStyleSheet;
  'm-left-lg': RNStyleSheet;
  'm-left-xl': RNStyleSheet;
  'm-left-xxl': RNStyleSheet;
  'm-x-xxxs': RNStyleSheet;
  'm-x-xxs': RNStyleSheet;
  'm-x-xs': RNStyleSheet;
  'm-x-sm': RNStyleSheet;
  'm-x-md': RNStyleSheet;
  'm-x-lg': RNStyleSheet;
  'm-x-xl': RNStyleSheet;
  'm-x-xxl': RNStyleSheet;
  'm-y-xxxs': RNStyleSheet;
  'm-y-xxs': RNStyleSheet;
  'm-y-xs': RNStyleSheet;
  'm-y-sm': RNStyleSheet;
  'm-y-md': RNStyleSheet;
  'm-y-lg': RNStyleSheet;
  'm-y-xl': RNStyleSheet;
  'm-y-xxl': RNStyleSheet;
  'w-full': RNStyleSheet;
  'w-1/2': RNStyleSheet;
  'w-1/3': RNStyleSheet;
  'w-2/3': RNStyleSheet;
  'w-1/4': RNStyleSheet;
  'w-3/4': RNStyleSheet;
  'w-1/5': RNStyleSheet;
  'w-2/5': RNStyleSheet;
  'w-3/5': RNStyleSheet;
  'w-4/5': RNStyleSheet;
  'w-1/6': RNStyleSheet;
  'w-5/6': RNStyleSheet;
  'w-1/8': RNStyleSheet;
  'w-3/8': RNStyleSheet;
  'w-5/8': RNStyleSheet;
  'w-7/8': RNStyleSheet;
  'w-1/10': RNStyleSheet;
  'w-3/10': RNStyleSheet;
  'w-7/10': RNStyleSheet;
  'w-9/10': RNStyleSheet;
  'w-1/12': RNStyleSheet;
  'w-5/12': RNStyleSheet;
  'w-7/12': RNStyleSheet;
  'w-11/12': RNStyleSheet;
};
export class Theme {
  public ss: ThemeStyles;

  public colors = {
    primary: ColorPalette.blue[700],
    primaryLight: ColorPalette.blue[500],
    primaryDark: ColorPalette.blue[900],
    secondary: ColorPalette.red[700],
    secondaryLight: ColorPalette.red[500],
    secondaryDark: ColorPalette.red[900],
    error: ColorPalette.red[500],
    warning: ColorPalette.orange[700],
    success: ColorPalette.green[700],
    disabled: ColorPalette.gray[700],
  };

  public circles = {
    outlined: StyleSheet.create({
      s: {
        borderWidth: 2,
        borderRadius: 9999,
        alignItems: 'center',
        justifyContent: 'center',
      },
    }),
    solid: StyleSheet.create({
      s: {
        borderRadius: 9999,
        alignItems: 'center',
        justifyContent: 'center',
      },
    }),
  };

  public boxes = {
    'rnd-outlined': StyleSheet.create({
      s: {
        borderWidth: 1,
        borderRadius: 8,
      },
    }),
    'rnd-solid': StyleSheet.create({
      s: {
        borderRadius: 8,
      },
    }),
  };

  constructor(colorScheme: ColorSchemeName) {
    noop(colorScheme);
    // this.colors = {
    //   ...ColorPresets,
    //   danger: ColorPresets.rose,
    //   error: ColorPresets.red,
    //   success: ColorPresets.green,
    //   warning: ColorPresets.orange,
    //   muted: ColorPresets.trueGray,
    //   primary: ColorPresets.cyan,
    //   secondary: ColorPresets.pink,
    //   tertiary: ColorPresets.emerald,
    //   info: ColorPresets.lightBlue,
    //   light: ColorPresets.warmGray,
    //   text: ColorPresets.trueGray,
    // };
    // this.spacings = {...SpacingPresets};
    // this.sizes = {...SizePresets};
    // this.borderWidths = {...BorderWidthPresets};
    // this.radii = {...RadiiPresets};
    // this.shadows = {...ShadowPresets};
    // this.fontFamilies = {...FontFamilyPresets};
    // this.typographies = {...TypographyPresets};

    this.ss = {
      // color
      'c-contrast': StyleSheet.create({s: {}}),
      'c-primary': StyleSheet.create({s: {color: this.colors.primary}}),
      'c-primary-lt': StyleSheet.create({s: {color: this.colors.primaryLight}}),
      'c-primary-dk': StyleSheet.create({s: {color: this.colors.primaryDark}}),
      'c-secondary': StyleSheet.create({s: {color: this.colors.secondary}}),
      'c-secondary-lt': StyleSheet.create({
        s: {color: this.colors.secondaryLight},
      }),
      'c-secondary-dk': StyleSheet.create({
        s: {color: this.colors.secondaryDark},
      }),
      'c-error': StyleSheet.create({
        s: {color: this.colors.error},
      }),
      'c-warning': StyleSheet.create({
        s: {color: this.colors.warning},
      }),
      'c-success': StyleSheet.create({
        s: {color: this.colors.success},
      }),
      'c-gray': StyleSheet.create({s: {color: ColorPalette.gray[700]}}),
      // background colors
      'bg-primary': StyleSheet.create({
        s: {backgroundColor: this.colors.primary},
      }),
      'bg-primary-lt': StyleSheet.create({
        s: {backgroundColor: this.colors.primaryLight},
      }),
      'bg-primary-dk': StyleSheet.create({
        s: {backgroundColor: this.colors.primaryDark},
      }),
      'bg-secondary': StyleSheet.create({
        s: {backgroundColor: this.colors.secondary},
      }),
      'bg-secondary-lt': StyleSheet.create({
        s: {backgroundColor: this.colors.secondaryLight},
      }),
      'bg-secondary-dk': StyleSheet.create({
        s: {backgroundColor: this.colors.secondaryDark},
      }),
      'bg-error': StyleSheet.create({
        s: {backgroundColor: this.colors.error},
      }),
      'bg-warning': StyleSheet.create({
        s: {backgroundColor: this.colors.warning},
      }),
      'bg-success': StyleSheet.create({
        s: {backgroundColor: this.colors.success},
      }),
      // inputs
      'input-border': StyleSheet.create({
        s: {
          ...this.boxes['rnd-outlined'].s,
          borderColor: ColorPalette.gray[500],
          height: 50,
        },
      }),
      'input-border-error': StyleSheet.create({
        s: {borderColor: this.colors.error},
      }),
      'input-label': StyleSheet.create({
        s: {
          ...this.boxes['rnd-solid'].s,
          position: 'absolute',
          color: ColorPalette.gray[500],
        },
      }),
      input: StyleSheet.create({
        s: {
          ...this.boxes['rnd-solid'].s,
          backgroundColor: 'white',
          position: 'absolute',
          bottom: 8,
          width: '100%',
        },
      }),
      // opacity
      'opaque-100': StyleSheet.create({s: {opacity: 1}}),
      'opaque-0': StyleSheet.create({s: {opacity: 0}}),
      // links and buttons
      link: StyleSheet.create({
        s: {
          fontSize: 18,
          fontFamily: 'KlavikaCondensed-BoldItalic',
          letterSpacing: 0.64,
          // fontStyle: 'italic',
          // fontWeight: 'bold',
          // letterSpacing: -0.1,
        },
      }),
      // circles
      'circle-primary-outlined-sm': StyleSheet.create({
        s: {
          ...this.circles.outlined.s,
          borderColor: this.colors.primary,
          width: 20,
          height: 20,
        },
      }),
      'circle-primary-outlined-md': StyleSheet.create({
        s: {
          ...this.circles.outlined.s,
          borderColor: this.colors.primary,
          width: 40,
          height: 40,
        },
      }),
      'circle-primary-outlined-lg': StyleSheet.create({
        s: {
          ...this.circles.outlined.s,
          borderColor: this.colors.primary,
          width: 60,
          height: 60,
        },
      }),
      'circle-primary-solid-sm': StyleSheet.create({
        s: {
          ...this.circles.solid.s,
          backgroundColor: this.colors.primary,
          width: 20,
          height: 20,
        },
      }),
      'circle-primary-solid-md': StyleSheet.create({
        s: {
          ...this.circles.solid.s,
          backgroundColor: this.colors.primary,
          width: 40,
          height: 40,
        },
      }),
      'circle-primary-solid-lg': StyleSheet.create({
        s: {
          ...this.circles.solid.s,
          backgroundColor: this.colors.primary,
          width: 60,
          height: 60,
        },
      }),
      'circle-invisible-sm': StyleSheet.create({
        s: {
          ...this.circles.solid.s,
          width: 20,
          height: 20,
        },
      }),
      'circle-invisible-md': StyleSheet.create({
        s: {
          ...this.circles.solid.s,
          width: 40,
          height: 40,
        },
      }),
      'circle-invisible-lg': StyleSheet.create({
        s: {
          ...this.circles.solid.s,
          width: 60,
          height: 60,
        },
      }),
      // typography
      't-body': StyleSheet.create({
        s: {
          fontSize: 14,
          fontFamily: 'ProximaNova-Regular',
          color: ColorPalette.gray[700],
          letterSpacing: 0.1,
        },
      }),
      't-title': StyleSheet.create({
        s: {
          fontSize: 24,
          fontFamily: 'KlavikaCondensed-BoldItalic',
          letterSpacing: 0.64,
        },
      }),
      // alignment
      'a-start': StyleSheet.create({s: {alignItems: 'flex-start'}}),
      'a-center': StyleSheet.create({s: {alignItems: 'center'}}),
      'a-end': StyleSheet.create({s: {alignItems: 'flex-end'}}),
      // padding
      'p-xxxs': StyleSheet.create({s: {padding: 2}}),
      'p-xxs': StyleSheet.create({s: {padding: 4}}),
      'p-xs': StyleSheet.create({s: {padding: 8}}),
      'p-sm': StyleSheet.create({s: {padding: 12}}),
      'p-md': StyleSheet.create({s: {padding: 16}}),
      'p-lg': StyleSheet.create({s: {padding: 24}}),
      'p-xl': StyleSheet.create({s: {padding: 32}}),
      'p-xxl': StyleSheet.create({s: {padding: 48}}),
      'p-top-xxxs': StyleSheet.create({s: {paddingTop: 2}}),
      'p-top-xxs': StyleSheet.create({s: {paddingTop: 4}}),
      'p-top-xs': StyleSheet.create({s: {paddingTop: 8}}),
      'p-top-sm': StyleSheet.create({s: {paddingTop: 12}}),
      'p-top-md': StyleSheet.create({s: {paddingTop: 16}}),
      'p-top-lg': StyleSheet.create({s: {paddingTop: 24}}),
      'p-top-xl': StyleSheet.create({s: {paddingTop: 32}}),
      'p-top-xxl': StyleSheet.create({s: {paddingTop: 48}}),
      'p-btm-xxxs': StyleSheet.create({s: {paddingBottom: 2}}),
      'p-btm-xxs': StyleSheet.create({s: {paddingBottom: 4}}),
      'p-btm-xs': StyleSheet.create({s: {paddingBottom: 8}}),
      'p-btm-sm': StyleSheet.create({s: {paddingBottom: 12}}),
      'p-btm-md': StyleSheet.create({s: {paddingBottom: 16}}),
      'p-btm-lg': StyleSheet.create({s: {paddingBottom: 24}}),
      'p-btm-xl': StyleSheet.create({s: {paddingBottom: 32}}),
      'p-btm-xxl': StyleSheet.create({s: {paddingBottom: 48}}),
      'p-right-xxxs': StyleSheet.create({s: {paddingRight: 2}}),
      'p-right-xxs': StyleSheet.create({s: {paddingRight: 4}}),
      'p-right-xs': StyleSheet.create({s: {paddingRight: 8}}),
      'p-right-sm': StyleSheet.create({s: {paddingRight: 12}}),
      'p-right-md': StyleSheet.create({s: {paddingRight: 16}}),
      'p-right-lg': StyleSheet.create({s: {paddingRight: 24}}),
      'p-right-xl': StyleSheet.create({s: {paddingRight: 32}}),
      'p-right-xxl': StyleSheet.create({s: {paddingRight: 48}}),
      'p-left-xxxs': StyleSheet.create({s: {paddingLeft: 2}}),
      'p-left-xxs': StyleSheet.create({s: {paddingLeft: 4}}),
      'p-left-xs': StyleSheet.create({s: {paddingLeft: 8}}),
      'p-left-sm': StyleSheet.create({s: {paddingLeft: 12}}),
      'p-left-md': StyleSheet.create({s: {paddingLeft: 16}}),
      'p-left-lg': StyleSheet.create({s: {paddingLeft: 24}}),
      'p-left-xl': StyleSheet.create({s: {paddingLeft: 32}}),
      'p-left-xxl': StyleSheet.create({s: {paddingLeft: 48}}),
      'p-x-xxxs': StyleSheet.create({s: {paddingHorizontal: 2}}),
      'p-x-xxs': StyleSheet.create({s: {paddingHorizontal: 4}}),
      'p-x-xs': StyleSheet.create({s: {paddingHorizontal: 8}}),
      'p-x-sm': StyleSheet.create({s: {paddingHorizontal: 12}}),
      'p-x-md': StyleSheet.create({s: {paddingHorizontal: 16}}),
      'p-x-lg': StyleSheet.create({s: {paddingHorizontal: 24}}),
      'p-x-xl': StyleSheet.create({s: {paddingHorizontal: 32}}),
      'p-x-xxl': StyleSheet.create({s: {paddingHorizontal: 48}}),
      'p-y-xxxs': StyleSheet.create({s: {paddingVertical: 2}}),
      'p-y-xxs': StyleSheet.create({s: {paddingVertical: 4}}),
      'p-y-xs': StyleSheet.create({s: {paddingVertical: 8}}),
      'p-y-sm': StyleSheet.create({s: {paddingVertical: 12}}),
      'p-y-md': StyleSheet.create({s: {paddingVertical: 16}}),
      'p-y-lg': StyleSheet.create({s: {paddingVertical: 24}}),
      'p-y-xl': StyleSheet.create({s: {paddingVertical: 32}}),
      'p-y-xxl': StyleSheet.create({s: {paddingVertical: 48}}),

      // margin
      'm-xxxs': StyleSheet.create({s: {margin: 2}}),
      'm-xxs': StyleSheet.create({s: {margin: 4}}),
      'm-xs': StyleSheet.create({s: {margin: 8}}),
      'm-sm': StyleSheet.create({s: {margin: 12}}),
      'm-md': StyleSheet.create({s: {margin: 16}}),
      'm-lg': StyleSheet.create({s: {margin: 24}}),
      'm-xl': StyleSheet.create({s: {margin: 32}}),
      'm-xxl': StyleSheet.create({s: {margin: 48}}),
      'm-top-xxxs': StyleSheet.create({s: {marginTop: 2}}),
      'm-top-xxs': StyleSheet.create({s: {marginTop: 4}}),
      'm-top-xs': StyleSheet.create({s: {marginTop: 8}}),
      'm-top-sm': StyleSheet.create({s: {marginTop: 12}}),
      'm-top-md': StyleSheet.create({s: {marginTop: 16}}),
      'm-top-lg': StyleSheet.create({s: {marginTop: 24}}),
      'm-top-xl': StyleSheet.create({s: {marginTop: 32}}),
      'm-top-xxl': StyleSheet.create({s: {marginTop: 48}}),
      'm-btm-xxxs': StyleSheet.create({s: {marginBottom: 2}}),
      'm-btm-xxs': StyleSheet.create({s: {marginBottom: 4}}),
      'm-btm-xs': StyleSheet.create({s: {marginBottom: 8}}),
      'm-btm-sm': StyleSheet.create({s: {marginBottom: 12}}),
      'm-btm-md': StyleSheet.create({s: {marginBottom: 16}}),
      'm-btm-lg': StyleSheet.create({s: {marginBottom: 24}}),
      'm-btm-xl': StyleSheet.create({s: {marginBottom: 32}}),
      'm-btm-xxl': StyleSheet.create({s: {marginBottom: 48}}),
      'm-right-xxxs': StyleSheet.create({s: {marginRight: 2}}),
      'm-right-xxs': StyleSheet.create({s: {marginRight: 4}}),
      'm-right-xs': StyleSheet.create({s: {marginRight: 8}}),
      'm-right-sm': StyleSheet.create({s: {marginRight: 12}}),
      'm-right-md': StyleSheet.create({s: {marginRight: 16}}),
      'm-right-lg': StyleSheet.create({s: {marginRight: 24}}),
      'm-right-xl': StyleSheet.create({s: {marginRight: 32}}),
      'm-right-xxl': StyleSheet.create({s: {marginRight: 48}}),
      'm-left-xxxs': StyleSheet.create({s: {marginLeft: 2}}),
      'm-left-xxs': StyleSheet.create({s: {marginLeft: 4}}),
      'm-left-xs': StyleSheet.create({s: {marginLeft: 8}}),
      'm-left-sm': StyleSheet.create({s: {marginLeft: 12}}),
      'm-left-md': StyleSheet.create({s: {marginLeft: 16}}),
      'm-left-lg': StyleSheet.create({s: {marginLeft: 24}}),
      'm-left-xl': StyleSheet.create({s: {marginLeft: 32}}),
      'm-left-xxl': StyleSheet.create({s: {marginLeft: 48}}),
      'm-x-xxxs': StyleSheet.create({s: {marginHorizontal: 2}}),
      'm-x-xxs': StyleSheet.create({s: {marginHorizontal: 4}}),
      'm-x-xs': StyleSheet.create({s: {marginHorizontal: 8}}),
      'm-x-sm': StyleSheet.create({s: {marginHorizontal: 12}}),
      'm-x-md': StyleSheet.create({s: {marginHorizontal: 16}}),
      'm-x-lg': StyleSheet.create({s: {marginHorizontal: 24}}),
      'm-x-xl': StyleSheet.create({s: {marginHorizontal: 32}}),
      'm-x-xxl': StyleSheet.create({s: {marginHorizontal: 48}}),
      'm-y-xxxs': StyleSheet.create({s: {marginVertical: 2}}),
      'm-y-xxs': StyleSheet.create({s: {marginVertical: 4}}),
      'm-y-xs': StyleSheet.create({s: {marginVertical: 8}}),
      'm-y-sm': StyleSheet.create({s: {marginVertical: 12}}),
      'm-y-md': StyleSheet.create({s: {marginVertical: 16}}),
      'm-y-lg': StyleSheet.create({s: {marginVertical: 24}}),
      'm-y-xl': StyleSheet.create({s: {marginVertical: 32}}),
      'm-y-xxl': StyleSheet.create({s: {marginVertical: 48}}),

      // width
      'w-full': StyleSheet.create({s: {width: '100%'}}),
      'w-1/2': StyleSheet.create({s: {width: '50%'}}),
      'w-1/3': StyleSheet.create({s: {width: '33.3%'}}),
      'w-2/3': StyleSheet.create({s: {width: '66.7%'}}),
      'w-1/4': StyleSheet.create({s: {width: '25%'}}),
      'w-3/4': StyleSheet.create({s: {width: '75%'}}),
      'w-1/5': StyleSheet.create({s: {width: '20%'}}),
      'w-2/5': StyleSheet.create({s: {width: '40%'}}),
      'w-3/5': StyleSheet.create({s: {width: '60%'}}),
      'w-4/5': StyleSheet.create({s: {width: '80%'}}),
      'w-1/6': StyleSheet.create({s: {width: '16.7%'}}),
      'w-5/6': StyleSheet.create({s: {width: '83.3%'}}),
      'w-1/8': StyleSheet.create({s: {width: '12.5%'}}),
      'w-3/8': StyleSheet.create({s: {width: '37.5%'}}),
      'w-5/8': StyleSheet.create({s: {width: '62.5%'}}),
      'w-7/8': StyleSheet.create({s: {width: '87.5%'}}),
      'w-1/10': StyleSheet.create({s: {width: '10%'}}),
      'w-3/10': StyleSheet.create({s: {width: '30%'}}),
      'w-7/10': StyleSheet.create({s: {width: '70%'}}),
      'w-9/10': StyleSheet.create({s: {width: '90%'}}),
      'w-1/12': StyleSheet.create({s: {width: '8.3%'}}),
      'w-5/12': StyleSheet.create({s: {width: '41.7%'}}),
      'w-7/12': StyleSheet.create({s: {width: '58.3%'}}),
      'w-11/12': StyleSheet.create({s: {width: '91.7%'}}),
    };
  }

  public sx(
    tag:
      | (keyof typeof this.ss | ViewStyle | TextStyle | undefined)[]
      | (keyof typeof this.ss | ViewStyle | TextStyle | undefined),
  ): ViewStyle | TextStyle {
    if (isArray(tag)) {
      return tag.reduce(
        (previous, current) => {
          let newStyle: RNStyleSheet;
          if (isObject(current)) {
            newStyle = StyleSheet.create({s: current});
          } else if (current === 'c-contrast') {
            const currentBackgroundColor = get(
              previous.s,
              'backgroundColor',
              'white',
            );
            newStyle = StyleSheet.create({
              s: {
                color: this.getContrastTextColor(currentBackgroundColor),
              },
            });
          } else if (current) {
            newStyle = this.ss[current];
          } else {
            newStyle = {s: {}};
          }
          return {
            s: {
              ...previous.s,
              ...newStyle.s,
            },
          };
        },
        {s: {}},
      ).s;
    }

    if (isObject(tag)) {
      return tag;
    }

    if (tag) {
      return this.ss[tag].s;
    }

    return {};
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
        primary: ColorPalette.cyan[500],
        background: ColorPalette.white as string,
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
    background: string,
    preferredTextColor?: 'white' | 'black',
  ): 'white' | 'black' {
    const contrastThreshold = 7;

    const whiteContrast = this.getContrastRatio('white', background);
    if (preferredTextColor === 'white' && whiteContrast >= contrastThreshold) {
      return 'white';
    }

    const blackContrast = this.getContrastRatio('black' as string, background);
    if (preferredTextColor === 'black' && blackContrast >= contrastThreshold) {
      return 'black';
    }

    if (whiteContrast >= blackContrast) {
      return 'white';
    }

    return 'black';
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
