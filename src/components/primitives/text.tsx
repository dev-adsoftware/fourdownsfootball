import React from 'react';
import {Text as RNText, TextProps as RNTextProps} from 'react-native';
import {useTheme} from '../../providers/theme';
import {
  ColorProps,
  OverflowProps,
  TextProps as SBTextProps,
  StyleBuilder,
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
    const _props: TextProps & OverflowProps = {
      ...{
        color: 'black',
        typeFace: 'sourceSansProRegular',
        fontSize: 'md',
        overflow: 'hidden',
      },
      ...props,
    };
    return new StyleBuilder(theme)
      .setColorProps(_props)
      .setTextProps(_props)
      .setOverflowProps(_props)
      .build();
  }, [theme, props]);

  return <RNText style={style.ss}>{props.text}</RNText>;
};
