import React from 'react';
import {
  Pressable as RNPressable,
  PressableProps as RNPressableProps,
} from 'react-native';
import {useTheme} from '../../providers/theme';
import {ChildrenProps} from '../../types/types';
import {
  DimensionProps,
  OverflowProps,
  StyleBuilder,
} from '../../utilities/style-builder';

export interface PressableProps
  extends Pick<RNPressableProps, 'onPress' | 'disabled'>,
    ChildrenProps,
    DimensionProps {
  opaque?: boolean;
}

export const Pressable: React.FC<PressableProps> = props => {
  const theme = useTheme();

  const style = React.useMemo(() => {
    const _props: PressableProps & OverflowProps = {
      ...{
        overflow: 'hidden',
      },
      ...props,
    };
    return new StyleBuilder(theme)
      .setDimensionProps(_props)
      .setOverflowProps(_props)
      .build();
  }, [theme, props]);

  return (
    <RNPressable
      onPress={props.onPress}
      disabled={props.disabled}
      style={({pressed}) => [
        style.ss,
        !props.opaque && pressed && {opacity: 0.9},
      ]}>
      {props.children}
    </RNPressable>
  );
};
