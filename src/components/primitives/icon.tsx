import React from 'react';
import FontAwesome5Icon, {
  FontAwesome5IconProps,
} from 'react-native-vector-icons/FontAwesome5';
import {withTheme, WithThemeStyleProps} from '../../hoc/with-theme';

export interface IconProperties
  extends WithThemeStyleProps,
    Omit<FontAwesome5IconProps, 'style' | 'size'> {
  variant: 'primary' | 'disabled' | 'primary-contrast';
  size: 'sm' | 'md' | 'lg';
}

const Component: React.FC<IconProperties> = props => {
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

  return <FontAwesome5Icon name={name} color={color} size={size} />;
};

export const Icon = withTheme(Component);
