import {omit} from 'lodash';
import React from 'react';
import {Text as RNText, TextProps} from 'react-native';
import {withTheme, WithThemeStyleProps} from '../../hoc/with-styles';

interface TextProperties extends WithThemeStyleProps, Omit<TextProps, 'style'> {
  text: string;
}

const Component: React.FC<TextProperties> = props => {
  return <RNText {...omit(props, 'children')}>{props.text}</RNText>;
};

export const Text = withTheme(Component);
