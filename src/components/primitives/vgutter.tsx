import React from 'react';
import {View} from 'react-native';
import {ThemeSpacingKey, useTheme} from '../../providers/theme';
import {ChildrenProps} from '../../types/types';
import {DimensionProps, StyleBuilder} from '../../utilities/style-builder';

interface VGutterProps extends ChildrenProps {
  size?: ThemeSpacingKey;
}

export const VGutter: React.FC<VGutterProps> = props => {
  const theme = useTheme();

  const style = React.useMemo(() => {
    const _props: DimensionProps = {
      ...{
        h: props.size ? theme.spacing[props.size] : theme.spacing.lg,
      },
    };
    return new StyleBuilder(theme).setDimensionProps(_props).build();
  }, [theme, props]);

  return <View style={style.ss}>{props.children}</View>;
};
