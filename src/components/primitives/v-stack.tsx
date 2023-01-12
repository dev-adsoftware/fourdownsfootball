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

interface VStackProperties
  extends ChildrenProps,
    Omit<FlexProps, 'flexDirection'> {
  full?: boolean;
}

export const VStack: React.FC<VStackProperties> = props => {
  const theme = useTheme();

  const style = React.useMemo(() => {
    const _props: VStackProperties &
      Pick<FlexProps, 'flexDirection'> &
      OverflowProps &
      DebugProps = {
      ...{
        flexDirection: 'column',
        flex: props.full ? 1 : undefined,
        alignItems: 'center',
        justifyContent: 'flex-start',
        // overflow: 'hidden',
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
