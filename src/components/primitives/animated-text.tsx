import React from 'react';
import {Animated, TextProps as RNTextProps} from 'react-native';
import {useTheme} from '../../providers/theme';
import {
  AnimationProps,
  BackgroundProps,
  ColorProps,
  DimensionProps,
  OverflowProps,
  StyleBuilder,
} from '../../utilities/style-builder';

interface DebugProps extends Pick<BackgroundProps, 'bg'> {}

interface TextProps
  extends Pick<RNTextProps, 'numberOfLines'>,
    ColorProps,
    AnimationProps {
  text: string;
}

export const AnimatedText: React.FC<TextProps> = props => {
  const theme = useTheme();

  const style = React.useMemo(() => {
    const _props: TextProps &
      OverflowProps &
      Pick<DimensionProps, 'w'> &
      DebugProps = {
      ...{
        color: 'black',
        overflow: 'hidden',
        w: 'full',
      },
      ...props,
    };
    const builder = new StyleBuilder(theme);
    return {
      static: builder
        .setColorProps(_props)
        .setOverflowProps(_props)
        .setBackgroundProps(_props)
        .setDimensionProps(_props)
        .build(),
      animated: builder.setAnimationProps(props).buildAnimatedStyles(),
    };
  }, [theme, props]);

  return (
    <Animated.Text style={[style.static.ss, {transform: style.animated}]}>
      {props.text}
    </Animated.Text>
  );
};
