import React from 'react';
import {Animated as RNAnimated} from 'react-native';
import FontAwesome5Icon, {
  FontAwesome5IconProps,
} from 'react-native-vector-icons/FontAwesome5';
import {useTheme} from '../../providers/theme';
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
    ...{},
    ...props,
  };

  const animatedStyle = React.useMemo(() => {
    return new StyleBuilder(theme)
      .setAnimationProps(props, props.animated)
      .buildAnimatedStyles();
  }, [theme, props]);

  return props.animated ? (
    <_AnimatedIcon
      name={props.name}
      color={_props.color && theme.colors[_props.color]}
      size={_props.size && theme.iconSizes[_props.size]}
      style={{
        transform: animatedStyle.transform,
      }}
    />
  ) : (
    <FontAwesome5Icon
      name={props.name}
      color={_props.color && theme.colors[_props.color]}
      size={_props.size && theme.iconSizes[_props.size]}
    />
  );
};
