import React from 'react';
import {View} from 'react-native';
import {useTheme} from '../../providers/theme';
import {ChildrenProps} from '../../types/types';
import {
  DebugProps,
  DimensionProps,
  MarginProps,
  OverflowProps,
  PositionProps,
  StyleBuilder,
} from '../../utilities/style-builder';

interface ContainerProps
  extends ChildrenProps,
    PositionProps,
    DimensionProps,
    MarginProps {}

export const Container: React.FC<ContainerProps> = props => {
  const theme = useTheme();

  const style = React.useMemo(() => {
    const _props: ContainerProps & OverflowProps & DebugProps = {
      ...{
        overflow: 'hidden',
        w: 'full',
      },
      ...props,
    };
    return new StyleBuilder(theme)
      .setPositionProps(_props)
      .setDimensionProps(_props)
      .setMarginProps(_props)
      .setOverflowProps(_props)
      .setBackgroundProps(_props)
      .build();
  }, [theme, props]);

  return <View style={[style.ss]}>{props.children}</View>;
};
