import React from 'react';
import {Animated as RNAnimated} from 'react-native';
import FontAwesome5Icon, {
  FontAwesome5IconProps,
} from 'react-native-vector-icons/FontAwesome5';
import {withTheme, WithThemeStyleProps} from '../../hoc/with-styles';

export interface AnimatedIconProperties
  extends WithThemeStyleProps,
    Omit<FontAwesome5IconProps, 'style' | 'size'> {
  variant: 'primary' | 'disabled' | 'primary-contrast';
  size: 'sm' | 'md' | 'lg';
  transforms?: (
    | {translateX: RNAnimated.AnimatedInterpolation<string | number>}
    | {translateY: RNAnimated.AnimatedInterpolation<string | number>}
    | {scale: RNAnimated.AnimatedInterpolation<string | number>}
    | {rotate: RNAnimated.AnimatedInterpolation<string | number>}
  )[];
}

const _AnimatedIcon = RNAnimated.createAnimatedComponent(FontAwesome5Icon);

const Component: React.FC<AnimatedIconProperties> = props => {
  const {name, variant, size: propsSize, theme} = props;
  let color = theme.colors.primary;
  if (variant === 'disabled') {
    color = theme.colors.disabled;
  } else if (variant === 'primary-contrast') {
    color = theme.getContrastTextColor(theme.colors.primary);
  }

  let size = 17;
  if (propsSize === 'sm') {
    size = 15;
  } else if (propsSize === 'lg') {
    size = 20;
  }

  return <_AnimatedIcon {...props} name={name} color={color} size={size} />;
};

export const AnimatedIcon = withTheme(Component);
