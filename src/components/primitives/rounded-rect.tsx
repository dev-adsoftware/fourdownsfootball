import React from 'react';
import {View} from 'react-native';
import {useTheme} from '../../providers/theme';
import {ChildrenProps} from '../../types/types';
import {
  BackgroundProps,
  BorderProps,
  BorderRadiusProps,
  DimensionProps,
  OverflowProps,
  PaddingProps,
  StyleBuilder,
} from '../../utilities/style-builder';

interface RoundedRectProps
  extends ChildrenProps,
    DimensionProps,
    PaddingProps,
    BackgroundProps,
    BorderProps,
    BorderRadiusProps {}

export const RoundedRect: React.FC<RoundedRectProps> = props => {
  const theme = useTheme();

  const style = React.useMemo(() => {
    const _props: RoundedRectProps & OverflowProps = {
      ...{
        overflow: 'hidden',
        w: 'full',
        borderRadius: 'lg',
      },
      ...props,
    };
    return new StyleBuilder(theme)
      .setDimensionProps(_props)
      .setPaddingProps(_props)
      .setBackgroundProps(_props)
      .setBorderProps(_props)
      .setOverflowProps(_props)
      .setBorderRadiusProps(_props)
      .build();
  }, [theme, props]);

  return <View style={style.ss}>{props.children}</View>;
};
