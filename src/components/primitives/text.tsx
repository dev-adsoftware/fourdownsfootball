import React from 'react';
import {Text as RNText, TextProps as RNTextProps} from 'react-native';
import {useTheme} from '../../providers/theme';
import {
  ColorProps,
  TextProps as SBTextProps,
  StyleBuilder,
  DebugProps,
} from '../../utilities/style-builder';

interface TextProps
  extends Pick<RNTextProps, 'numberOfLines'>,
    ColorProps,
    SBTextProps {
  text: string;
}

export const Text: React.FC<TextProps> = props => {
  const theme = useTheme();

  const style = React.useMemo(() => {
    const _props: TextProps & DebugProps = {
      ...{
        color: 'primaryText',
        typeFace: 'sourceSansProRegular',
        fontSize: 'body',
      },
      ...props,
    };
    return new StyleBuilder(theme)
      .setColorProps(_props)
      .setTextProps(_props)
      .setDebugProps(_props)
      .build();
  }, [theme, props]);

  return <RNText style={style.ss}>{props.text}</RNText>;
};
