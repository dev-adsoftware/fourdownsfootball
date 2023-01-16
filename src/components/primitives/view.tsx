import {pick} from 'lodash';
import React from 'react';
import {View as RNView, Animated as RNAnimated} from 'react-native';
import {useTheme} from '../../providers/theme';
import {ChildrenProps, OnLayoutProps} from '../../types/types';
import {
  AnimationProps,
  BackgroundProps,
  BorderProps,
  BorderRadiusProps,
  DebugProps,
  DimensionProps,
  FlexProps,
  MarginProps,
  PaddingProps,
  PositionProps,
  StyleBuilder,
} from '../../utilities/style-builder';

interface ContainerProps
  extends ChildrenProps,
    OnLayoutProps,
    FlexProps,
    DimensionProps,
    PositionProps,
    PaddingProps,
    MarginProps,
    BackgroundProps,
    BorderProps,
    BorderRadiusProps,
    AnimationProps {}

export const View: React.FC<ContainerProps> = props => {
  const theme = useTheme();

  const style = React.useMemo(() => {
    const _props: ContainerProps & DebugProps = {
      ...{
        flex: 1,
        w: 'full',
      },
      ...props,
    };
    const builder = new StyleBuilder(theme);
    return {
      static: builder
        .setFlexProps(_props)
        .setDimensionProps(_props)
        .setPositionProps(_props)
        .setPaddingProps(_props)
        .setMarginProps(_props)
        .setBackgroundProps(_props)
        .setBorderProps(_props)
        .setBorderRadiusProps(_props)
        .setAnimationProps(_props)
        .setDebugProps(_props)
        .build(),
      animated: builder.setAnimationProps(props).buildAnimatedStyles(),
    };
  }, [theme, props]);

  const rest = {...pick(props, ['onLayout'])};

  return props.animated ? (
    <RNAnimated.View
      {...rest}
      style={[style.static.ss, {transform: style.animated}]}>
      {props.children}
    </RNAnimated.View>
  ) : (
    <RNView {...rest} style={[style.static.ss]}>
      {props.children}
    </RNView>
  );
};
