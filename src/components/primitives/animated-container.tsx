import React from 'react';
import {Animated} from 'react-native';
import {useTheme} from '../../providers/theme';
import {ChildrenProps, OnLayoutProps} from '../../types/types';
import {
  AnimationProps,
  DebugProps,
  DimensionProps,
  MarginProps,
  OverflowProps,
  PositionProps,
  StyleBuilder,
} from '../../utilities/style-builder';

interface ContainerProps
  extends ChildrenProps,
    OnLayoutProps,
    PositionProps,
    DimensionProps,
    MarginProps,
    AnimationProps {}

export const AnimatedContainer: React.FC<ContainerProps> = props => {
  const theme = useTheme();

  const style = React.useMemo(() => {
    const _props: ContainerProps & OverflowProps & DebugProps = {
      ...{
        overflow: 'hidden',
      },
      ...props,
    };
    const builder = new StyleBuilder(theme);
    return {
      static: builder
        .setPositionProps(_props)
        .setDimensionProps(_props)
        .setMarginProps(_props)
        .setOverflowProps(_props)
        .setBackgroundProps(_props)
        .build(),
      animated: builder.setAnimationProps(props).buildAnimatedStyles(),
    };
  }, [theme, props]);

  return (
    <Animated.View
      style={[style.static.ss, {transform: style.animated}]}
      onLayout={props.onLayout}>
      {props.children}
    </Animated.View>
  );
};
