import React from 'react';
import {
  Pressable as RNPressable,
  PressableProps as RNPressableProps,
} from 'react-native';
import {useTheme} from '../../providers/theme';
import {ChildrenProps} from '../../types/types';
import {
  DebugProps,
  StyleBuilder,
  ViewProps,
} from '../../utilities/style-builder';

export interface PressableProps
  extends Pick<RNPressableProps, 'onPress' | 'disabled'>,
    ChildrenProps,
    ViewProps {
  opaque?: boolean;
}

export const Pressable: React.FC<PressableProps> = props => {
  const theme = useTheme();

  const style = React.useMemo(() => {
    const _props: PressableProps & DebugProps = {
      ...{},
      ...props,
    };
    return new StyleBuilder(theme)
      .setViewProps(_props)
      .setDebugProps(_props)
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
