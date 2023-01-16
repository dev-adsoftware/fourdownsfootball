import React from 'react';
import {Animated as RNAnimated} from 'react-native';
import FontAwesome5Icon, {
  FontAwesome5IconProps,
} from 'react-native-vector-icons/FontAwesome5';
import {ThemeColorKey, ThemeIconSizeKey, useTheme} from '../../providers/theme';
import {
  AnimationProps,
  ColorProps,
  IconProps as StyleIconProps,
  StyleBuilder,
} from '../../utilities/style-builder';

export interface IconProps
  extends Pick<FontAwesome5IconProps, 'name'>,
    StyleIconProps,
    ColorProps,
    AnimationProps {}

const _AnimatedIcon = RNAnimated.createAnimatedComponent(FontAwesome5Icon);

export const Icon: React.FC<IconProps> = props => {
  const theme = useTheme();

  const _props = {
    ...{
      color: 'white' as ThemeColorKey,
      size: 'md' as ThemeIconSizeKey,
    },
    ...props,
  };

  const animatedStyle = React.useMemo(() => {
    return new StyleBuilder(theme)
      .setAnimationProps(props)
      .buildAnimatedStyles();
  }, [theme, props]);

  return props.animated ? (
    <_AnimatedIcon
      name={props.name}
      color={theme.colors[_props.color]}
      size={theme.iconSizes[_props.size]}
      style={{
        transform: animatedStyle,
      }}
    />
  ) : (
    <FontAwesome5Icon
      name={props.name}
      color={theme.colors[_props.color]}
      size={theme.iconSizes[_props.size]}
    />
  );
};
