import {pick} from 'lodash';
import React from 'react';
import {
  Text as RNText,
  TextProps as RNTextProps,
  Animated as RNAnimated,
} from 'react-native';
import {DEFAULT_FONT_SIZE} from '../constants';
import {useTheme} from '../providers/theme';
import {OnLayoutProps, PressableProps} from '../types';
import {
  ColorProps,
  TextProps as SBTextProps,
  StyleBuilder,
  DebugProps,
  OpacityProps,
  AnimationProps,
  TransformProps,
  ViewProps,
} from '../utilities/style-builder';

export interface TextProps
  extends Pick<RNTextProps, 'numberOfLines'>,
    ViewProps,
    ColorProps,
    OpacityProps,
    SBTextProps,
    OnLayoutProps,
    PressableProps,
    AnimationProps,
    TransformProps {
  text: string | number;
}

export const Text: React.FC<TextProps> = props => {
  const theme = useTheme();

  const style = React.useMemo(() => {
    const _props: TextProps & DebugProps = {
      ...{
        color: 'darkText',
        typeFace: 'sourceSansProRegular',
        fontSize: DEFAULT_FONT_SIZE,
      },
      ...props,
    };
    const builder = new StyleBuilder(theme);
    return {
      static: builder
        .setViewProps(_props)
        .setColorProps(_props)
        .setOpacityProps(_props)
        .setTextProps(_props)
        .setAnimationProps(_props, _props.animated)
        .setDebugProps(_props)
        .build(),
      animated: builder.setAnimationProps(props).buildAnimatedStyles(),
      staticTransform: builder
        .setStaticTransformProps(props)
        .buildStaticTransformStyles(),
    };
  }, [theme, props]);

  const rest = {...pick(props, ['onLayout', 'onPress', 'numberOfLines'])};

  return props.animated ? (
    <RNAnimated.Text
      {...rest}
      style={[
        style.static.ss,
        {transform: style.animated.transform},
        {opacity: style.animated.others.opacity || 1.0},
      ]}>
      {props.text}
    </RNAnimated.Text>
  ) : (
    <RNText
      {...rest}
      style={[style.static.ss, {transform: style.staticTransform}]}>
      {props.text}
    </RNText>
  );
};
