import React from 'react';
import {SvgXml, XmlProps} from 'react-native-svg';
import {withTheme, WithThemeStyleProps} from '../../hoc/with-styles';

export interface SvgProperties
  extends WithThemeStyleProps,
    Omit<XmlProps, 'style'> {}

const Component: React.FC<SvgProperties> = props => {
  return <SvgXml {...props} />;
};

export const Svg = withTheme(Component);
