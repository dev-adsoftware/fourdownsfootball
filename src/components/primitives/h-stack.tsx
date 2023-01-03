import {omit} from 'lodash';
import React from 'react';
import {FlexStyle, StyleSheet, ViewProps} from 'react-native';
import {
  mergeStyles,
  withTheme,
  WithThemeStyleProps,
} from '../../hoc/with-styles';
import {Container} from './container';

interface HStackProperties
  extends WithThemeStyleProps,
    Omit<ViewProps, 'style'> {
  align?: FlexStyle['alignItems'];
  justify?: FlexStyle['justifyContent'];
}

const Component: React.FC<HStackProperties> = props => {
  const ss = StyleSheet.create({
    s: {
      flexDirection: 'row',
      alignItems: props.align || 'center',
      justifyContent: props.justify || 'flex-start',
    },
  });
  return (
    <Container
      {...omit(props, 'children')}
      styles={mergeStyles(props.styles, ss.s)}>
      {props.children}
    </Container>
  );
};

export const HStack = withTheme(Component);
