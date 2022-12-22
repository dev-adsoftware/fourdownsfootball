import React from 'react';
import {TextInput as RNTextInput, TextInputProps} from 'react-native';
import {withTheme, WithThemeStyleProps} from '../../hoc/with-theme';

interface TextInputProperties
  extends WithThemeStyleProps,
    Omit<TextInputProps, 'style'> {
  innerRef?: any;
}

const Component: React.FC<TextInputProperties> = props => {
  return <RNTextInput {...props} ref={props.innerRef} />;
};

export const TextInput = withTheme(Component);
