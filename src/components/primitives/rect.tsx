import React from 'react';
import {View} from 'react-native';
import {useTheme} from '../../providers/theme';
import {ChildrenProps} from '../../types/types';
import {
  BackgroundProps,
  BorderProps,
  DimensionProps,
  OverflowProps,
  PaddingProps,
  StyleBuilder,
} from '../../utilities/style-builder';

interface RectProps
  extends ChildrenProps,
    DimensionProps,
    PaddingProps,
    BackgroundProps,
    BorderProps {}

export const Rect: React.FC<RectProps> = props => {
  const theme = useTheme();

  const style = React.useMemo(() => {
    const _props: RectProps & OverflowProps = {
      ...{
        overflow: 'hidden',
        w: 'full',
      },
      ...props,
    };
    return new StyleBuilder(theme)
      .setDimensionProps(_props)
      .setPaddingProps(_props)
      .setBackgroundProps(_props)
      .setBorderProps(_props)
      .setOverflowProps(_props)
      .build();
  }, [theme, props]);

  return <View style={style.ss}>{props.children}</View>;
};
