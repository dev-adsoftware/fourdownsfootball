import {omit} from 'lodash';
import React from 'react';
import {Animated as RNAnimated, ViewProps} from 'react-native';
import {withTheme, WithThemeStyleProps} from '../../hoc/with-styles';

interface AnimatedContainerProperties
  extends WithThemeStyleProps,
    Omit<ViewProps, 'style'> {
  // transforms?: (
  //   | {translateX: RNAnimated.AnimatedInterpolation<string | number>}
  //   | {translateY: RNAnimated.AnimatedInterpolation<string | number>}
  //   | {scale: RNAnimated.AnimatedInterpolation<string | number>}
  // )[];
}

const _AnimatedContainer: React.FC<AnimatedContainerProperties> = props => {
  return (
    <RNAnimated.View {...omit(props, 'children')}>
      {props.children}
    </RNAnimated.View>
  );
};

export const AnimatedContainer = withTheme(_AnimatedContainer);
