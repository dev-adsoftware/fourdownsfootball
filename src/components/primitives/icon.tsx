import React from 'react';
import FontAwesome5Icon, {
  FontAwesome5IconProps,
} from 'react-native-vector-icons/FontAwesome5';
import {ThemeColorKey, ThemeIconSizeKey, useTheme} from '../../providers/theme';
import {
  ColorProps,
  IconProps as StyleIconProps,
} from '../../utilities/style-builder';

export interface IconProps
  extends Pick<FontAwesome5IconProps, 'name'>,
    StyleIconProps,
    ColorProps {}

export const Icon: React.FC<IconProps> = props => {
  const theme = useTheme();

  const _props = {
    ...{
      color: 'white' as ThemeColorKey,
      size: 'md' as ThemeIconSizeKey,
    },
    ...props,
  };

  return (
    <FontAwesome5Icon
      name={props.name}
      color={theme.colors[_props.color]}
      size={theme.iconSizes[_props.size]}
    />
  );
};
