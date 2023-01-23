import {pick} from 'lodash';
import React from 'react';
import {View as RNView, Animated as RNAnimated} from 'react-native';
import {useTheme} from '../../providers/theme';
import {ChildrenProps, OnLayoutProps} from '../../types/types';
import {
  AnimationProps,
  DebugProps,
  StyleBuilder,
  TransformProps,
  ViewProps,
} from '../../utilities/style-builder';

interface ContainerProps
  extends ChildrenProps,
    OnLayoutProps,
    ViewProps,
    TransformProps,
    AnimationProps {}

export const View: React.FC<ContainerProps> = props => {
  const theme = useTheme();

  const style = React.useMemo(() => {
    const _props: ContainerProps & DebugProps = {
      ...{},
      ...props,
    };
    const builder = new StyleBuilder(theme);
    return {
      static: builder.setViewProps(_props).setDebugProps(_props).build(),
      animated: builder
        .setAnimationProps(_props, _props.animated)
        .buildAnimatedStyles(),
      staticTransform: builder
        .setStaticTransformProps(_props, _props.animated)
        .buildStaticTransformStyles(),
    };
  }, [theme, props]);

  const rest = {...pick(props, ['onLayout'])};

  return props.animated ? (
    <RNAnimated.View
      {...rest}
      style={[
        style.static.ss,
        {transform: style.animated.transform},
        {opacity: style.animated.others.opacity || 1.0},
      ]}>
      {props.children}
    </RNAnimated.View>
  ) : (
    <RNView
      {...rest}
      style={[style.static.ss, {transform: style.staticTransform}]}>
      {props.children}
    </RNView>
  );
};
