import React from 'react';
import {View, ViewProps} from 'react-native';
import {withTheme} from '../../hoc/with-theme';
import {ThemeStyleProps} from '../../providers/theme';

interface Properties extends ThemeStyleProps, Omit<ViewProps, 'style'> {
  newProp: string;
}

const Component: React.FC<Properties> = props => {
  return <View style={[props.style]}>{props.children}</View>;
};

export const Container = withTheme(Component);
