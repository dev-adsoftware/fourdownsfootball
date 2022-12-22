import {omit} from 'lodash';
import React from 'react';
import {FlexStyle, StyleSheet, ViewProps} from 'react-native';
import {
  mergeStyles,
  withTheme,
  WithThemeStyleProps,
} from '../../hoc/with-theme';
import {Container} from './container';

interface VStackProperties
  extends WithThemeStyleProps,
    Omit<ViewProps, 'style'> {
  align?: FlexStyle['alignItems'];
  justify?: FlexStyle['justifyContent'];
  full?: boolean;
}

const Component: React.FC<VStackProperties> = props => {
  const ss = StyleSheet.create({
    s: {
      ...(props.full && {flex: 1}),
      flexDirection: 'column',
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

export const VStack = withTheme(Component);
