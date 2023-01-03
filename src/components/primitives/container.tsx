import {omit} from 'lodash';
import React from 'react';
import {View, ViewProps} from 'react-native';
import {withTheme, WithThemeStyleProps} from '../../hoc/with-styles';

interface ContainerProperties
  extends WithThemeStyleProps,
    Omit<ViewProps, 'style'> {}

const Component: React.FC<ContainerProperties> = props => {
  return <View {...omit(props, 'children')}>{props.children}</View>;
};

export const Container = withTheme(Component);
