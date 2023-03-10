import React from 'react';
import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
} from 'react-native';
import {DEFAULT_FONT_SIZE} from '../constants';
import {ThemeColorKey, useTheme} from '../providers/theme';
import {
  ColorProps,
  DebugProps,
  OpacityProps,
  StyleBuilder,
  TextProps,
  ViewProps,
} from '../utilities/style-builder';

interface TextInputProps
  extends Omit<
      RNTextInputProps,
      'style' | 'placeholderTextColor' | 'selectionColor'
    >,
    ViewProps,
    ColorProps,
    Omit<TextProps, 'textAlign'>,
    OpacityProps {
  innerRef?: any;
  placeholderTextColor?: ThemeColorKey;
  selectionColor?: ThemeColorKey;
}

export const TextInput: React.FC<TextInputProps> = props => {
  const theme = useTheme();

  const style = React.useMemo(() => {
    const _props: TextInputProps & DebugProps = {
      ...{
        color: 'darkText',
        typeFace: 'sourceSansProSemibold',
        fontSize: DEFAULT_FONT_SIZE,
        w: 'full',
      },
      ...props,
    };
    return new StyleBuilder(theme)
      .setViewProps(_props)
      .setColorProps(_props)
      .setTextProps(_props)
      .setDimensionProps(_props)
      .setOpacityProps(_props)
      .setDebugProps(_props)
      .build();
  }, [theme, props]);

  return (
    <RNTextInput
      {...props}
      ref={props.innerRef}
      placeholderTextColor={
        props.placeholderTextColor
          ? theme.colors[props.placeholderTextColor]
          : undefined
      }
      style={style.ss}
    />
  );
};
