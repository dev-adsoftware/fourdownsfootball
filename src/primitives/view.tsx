import {pick} from 'lodash';
import React from 'react';
import {
  View as RNView,
  Animated as RNAnimated,
  Pressable as RNPressable,
} from 'react-native';
import {useTheme} from '../providers/theme';
import {ChildrenProps, OnLayoutProps, PressableProps} from '../types';
import {
  AnimationProps,
  DebugProps,
  OverflowProps,
  StyleBuilder,
  TransformProps,
  ViewProps as RNViewProps,
} from '../utilities/style-builder';

interface ViewProps
  extends ChildrenProps,
    OnLayoutProps,
    RNViewProps,
    PressableProps,
    OverflowProps,
    TransformProps,
    AnimationProps {}

export const View: React.FC<ViewProps> = props => {
  const theme = useTheme();

  if (props.animated && props.onPress) {
    throw Error('View cannot be pressable and animated');
  }

  const style = React.useMemo(() => {
    const _props: ViewProps & DebugProps = {
      ...{},
      ...props,
    };
    const builder = new StyleBuilder(theme);
    return {
      static: builder
        .setViewProps(_props)
        .setOverflowProps(_props)
        .setDebugProps(_props)
        .build(),
      animated: builder
        .setAnimationProps(_props, _props.animated)
        .buildAnimatedStyles(),
      staticTransform: builder
        .setStaticTransformProps(_props, _props.animated)
        .buildStaticTransformStyles(),
    };
  }, [theme, props]);

  const rest = {...pick(props, ['onLayout'])};

  const RNViewComponent = props.onPress ? RNPressable : RNView;

  return props.animated ? (
    <RNAnimated.View
      {...rest}
      style={[
        style.static.ss,
        {transform: style.animated.transform},
        {opacity: style.animated.others.opacity || 1.0},
        {height: style.animated.others.height || style.static.ss.height},
        {width: style.animated.others.width || style.static.ss.width},
      ]}>
      {props.children}
    </RNAnimated.View>
  ) : props.onPress ? (
    <RNPressable
      onPress={props.onPress}
      disabled={props.disabled}
      style={({pressed}) => [
        style.static.ss,
        {transform: style.staticTransform},
        !props.opaque && pressed && {opacity: 0.9},
      ]}>
      {props.children}
    </RNPressable>
  ) : (
    <RNViewComponent
      {...rest}
      style={[style.static.ss, {transform: style.staticTransform}]}>
      {props.children}
    </RNViewComponent>
  );
};
