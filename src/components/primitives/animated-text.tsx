import {omit} from 'lodash';
import React from 'react';
import {Animated as RNAnimated, TextProps} from 'react-native';
import {withTheme, WithThemeStyleProps} from '../../hoc/with-theme';

interface TextProperties extends WithThemeStyleProps, Omit<TextProps, 'style'> {
  text: string;
  transforms?: (
    | {translateX: RNAnimated.AnimatedInterpolation<string | number>}
    | {translateY: RNAnimated.AnimatedInterpolation<string | number>}
    | {scale: RNAnimated.AnimatedInterpolation<string | number>}
  )[];
}

const Component: React.FC<TextProperties> = props => {
  return (
    <RNAnimated.Text {...omit(props, 'children')}>{props.text}</RNAnimated.Text>
  );
};

export const AnimatedText = withTheme(Component);
