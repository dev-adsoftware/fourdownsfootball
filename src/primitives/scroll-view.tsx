import {pick} from 'lodash';
import React from 'react';
import {
  ScrollView as RNScrollView,
  ScrollViewProps as RNScrollViewProps,
  Animated as RNAnimated,
} from 'react-native';
import {useTheme} from '../providers/theme';
import {ChildrenProps, OnLayoutProps} from '../types';
import {
  AnimationProps,
  DebugProps,
  StyleBuilder,
  ViewProps,
} from '../utilities/style-builder';

interface ScrollViewProps
  extends RNScrollViewProps,
    ChildrenProps,
    OnLayoutProps,
    ViewProps,
    AnimationProps {
  contentProps?: ViewProps;
}

export const ScrollView = React.forwardRef<RNScrollView, ScrollViewProps>(
  (props: ScrollViewProps, ref) => {
    const theme = useTheme();

    const style = React.useMemo(() => {
      const _props: ScrollViewProps & DebugProps = {
        ...{},
        ...props,
        contentProps: {
          ...{},
          ...props.contentProps,
        },
      };
      const builder = new StyleBuilder(theme);
      return {
        static: builder
          .setViewProps(_props)
          .setAnimationProps(_props)
          .setDebugProps(_props)
          .build(),
        animated: builder.setAnimationProps(props).buildAnimatedStyles(),
        content: new StyleBuilder(theme)
          .setDimensionProps(_props.contentProps || {})
          .build(),
      };
    }, [theme, props]);

    const rest = {
      ...pick(props, ['horizontal', 'showsHorizontalScrollIndicator']),
    };

    return props.animated ? (
      <RNAnimated.ScrollView
        {...rest}
        ref={ref}
        style={[
          style.static.ss,
          {transform: style.animated.transform},
          {opacity: style.animated.others.opacity || 1.0},
        ]}>
        {props.children}
      </RNAnimated.ScrollView>
    ) : (
      <RNScrollView
        {...rest}
        ref={ref}
        style={[style.static.ss]}
        contentContainerStyle={[style.content.ss]}>
        {props.children}
      </RNScrollView>
    );
  },
);
