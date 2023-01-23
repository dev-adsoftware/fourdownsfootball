import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTheme} from '../../providers/theme';
import {BackgroundProps, StyleBuilder} from '../../utilities/style-builder';

interface SafeBarProps extends BackgroundProps {}

export const SafeBar: React.FC<SafeBarProps> = props => {
  const theme = useTheme();
  const style = React.useMemo(() => {
    const _props: BackgroundProps = {
      ...{},
      ...props,
    };
    return new StyleBuilder(theme).setBackgroundProps(_props).build();
  }, [theme, props]);

  return <SafeAreaView edges={['top']} style={style.ss} />;
};
