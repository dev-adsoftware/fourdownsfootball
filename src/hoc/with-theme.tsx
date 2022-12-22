import {isArray, omit} from 'lodash';
import React from 'react';
import {
  Animated,
  PressableStateCallbackType,
  TextStyle,
  ViewStyle,
} from 'react-native';
import {Theme, ThemeStyles, useTheme} from '../providers/theme';

export interface InjectedThemeProps {
  theme: Theme;
}

export type Style =
  | (keyof ThemeStyles | ViewStyle | TextStyle | undefined)[]
  | (keyof ThemeStyles | ViewStyle | TextStyle | undefined);

export const mergeStyles = (
  a: Style | undefined,
  b: Style | undefined,
): Style => {
  if (!a && b) {
    return b;
  }

  if (!b && a) {
    return a;
  }

  if (a && b) {
    const styleA: Style = isArray(a) ? a : [a];
    const styleB: Style = isArray(b) ? b : [b];
    return styleA.concat(styleB);
  }

  return [];
};

export interface WithThemeStyleProps extends InjectedThemeProps {
  styles?: Style;
  transforms?: (
    | {translateX: Animated.AnimatedInterpolation<string | number>}
    | {translateY: Animated.AnimatedInterpolation<string | number>}
    | {scale: Animated.AnimatedInterpolation<string | number>}
    | {rotate: Animated.AnimatedInterpolation<string | number>}
  )[];
  pressable?: boolean;
}

export type ThemeFC<T> = React.FC<Omit<T, 'theme'>>;

export const withTheme = <P extends WithThemeStyleProps>(
  Component: React.ComponentType<P>,
  pressable?: boolean,
): React.FC<Omit<P, keyof InjectedThemeProps>> => {
  return ({...props}: Omit<P, keyof InjectedThemeProps>) => {
    const theme = useTheme();
    const styles = [
      props.styles ? theme.sx(props.styles) : [],
      {transform: props.transforms},
    ];
    return (
      <Component
        style={
          pressable
            ? ({pressed}: {pressed: PressableStateCallbackType}) => [
                ...styles,
                {opacity: pressed ? 0.5 : 1.0},
              ]
            : styles
        }
        {...(omit(props, ['theme', 'style']) as P)}
        theme={theme}
      />
    );
  };
};
