import {omit} from 'lodash';
import React from 'react';
import {Animated as RNAnimated, TextProps} from 'react-native';
import {withTheme, WithThemeStyleProps} from '../../hoc/with-styles';

interface AnimatedTextProperties
  extends WithThemeStyleProps,
    Omit<TextProps, 'style'> {
  text: string;
  transforms?: (
    | {translateX: RNAnimated.AnimatedInterpolation<string | number>}
    | {translateY: RNAnimated.AnimatedInterpolation<string | number>}
    | {scale: RNAnimated.AnimatedInterpolation<string | number>}
  )[];
}

const _AnimatedText: React.FC<AnimatedTextProperties> = props => {
  return (
    <RNAnimated.Text {...omit(props, 'children')}>{props.text}</RNAnimated.Text>
  );
};

export const AnimatedText = withTheme(_AnimatedText);
