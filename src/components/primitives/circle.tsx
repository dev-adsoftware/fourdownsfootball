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

interface CircleProps
  extends ChildrenProps,
    DimensionProps,
    PaddingProps,
    BackgroundProps,
    BorderProps {}

export const Circle: React.FC<CircleProps> = props => {
  const theme = useTheme();

  const style = React.useMemo(() => {
    const _props: CircleProps & BorderRadiusProps & OverflowProps = {
      ...{
        overflow: 'hidden',
        borderRadius: 'full',
      },
      ...props,
    };
    return new StyleBuilder(theme)
      .setDimensionProps(_props)
      .setPaddingProps(_props)
      .setBackgroundProps(_props)
      .setBorderProps(_props)
      .setBorderRadiusProps(_props)
      .setOverflowProps(_props)
      .build();
  }, [theme, props]);

  return <View style={style.ss}>{props.children}</View>;
};
