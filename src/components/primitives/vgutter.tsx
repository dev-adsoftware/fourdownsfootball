import React from 'react';
import {ViewProps} from 'react-native';
import {
  mergeStyles,
  withTheme,
  WithThemeStyleProps,
} from '../../hoc/with-styles';
import {Container} from './container';

interface VGutterProperties
  extends WithThemeStyleProps,
    Omit<ViewProps, 'style'> {
  size?: number;
}

const DEFAULT_GUTTER_SIZE = 10;

const _VGutter: React.FC<VGutterProperties> = props => {
  return (
    <Container
      styles={mergeStyles(
        [{height: props.size || DEFAULT_GUTTER_SIZE}, 'w-full'],
        props.styles,
      )}
    />
  );
};

export const VGutter = withTheme(_VGutter);
