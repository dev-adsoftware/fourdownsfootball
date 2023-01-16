import React from 'react';
import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
} from 'react-native';
import {ThemeColorKey, useTheme} from '../../providers/theme';
import {
  ColorProps,
  DebugProps,
  DimensionProps,
  OpacityProps,
  StyleBuilder,
  TextProps,
} from '../../utilities/style-builder';

interface TextInputProps
  extends Omit<
      RNTextInputProps,
      'style' | 'placeholderTextColor' | 'selectionColor'
    >,
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
    const _props: ColorProps &
      TextProps &
      DimensionProps &
      OpacityProps &
      DebugProps = {
      ...{
        color: 'black',
        typeFace: 'sourceSansProRegular',
        fontSize: 'body',
        w: 'full',
      },
      ...props,
    };
    return new StyleBuilder(theme)
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
