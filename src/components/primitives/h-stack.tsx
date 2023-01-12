import React from 'react';
import {View} from 'react-native';
import {useTheme} from '../../providers/theme';
import {ChildrenProps} from '../../types/types';
import {
  DebugProps,
  FlexProps,
  OverflowProps,
  StyleBuilder,
} from '../../utilities/style-builder';

interface HStackProperties
  extends ChildrenProps,
    Omit<FlexProps, 'flexDirection'>,
    DebugProps {}

export const HStack: React.FC<HStackProperties> = props => {
  const theme = useTheme();

  const style = React.useMemo(() => {
    const _props: HStackProperties &
      Pick<FlexProps, 'flexDirection'> &
      OverflowProps &
      DebugProps = {
      ...{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        overflow: 'hidden',
      },
      ...props,
    };
    return new StyleBuilder(theme)
      .setFlexProps(_props)
      .setOverflowProps(_props)
      .setBackgroundProps(_props)
      .build();
  }, [theme, props]);

  return <View style={style.ss}>{props.children}</View>;
};
