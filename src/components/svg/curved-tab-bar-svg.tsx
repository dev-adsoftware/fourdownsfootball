import React from 'react';
import {useWindowDimensions} from 'react-native';
import {TAB_BAR_HEIGHT} from '../../constants/tab-bar';
import {Svg} from '../primitives/svg';

interface CurvedTabBarSvgProperties {}

export const CurvedTabBar: React.FC<CurvedTabBarSvgProperties> = () => {
  const {width} = useWindowDimensions();

  return (
    <Svg
      w={width}
      h={TAB_BAR_HEIGHT}
      path={[
        `M 0 ${TAB_BAR_HEIGHT}`,
        `L 0 ${TAB_BAR_HEIGHT}`,
        `L ${width} ${TAB_BAR_HEIGHT}`,
        `L ${width} 0`,
        `A ${width / 2} 30 0 0 1 0 -20`,
        'z',
      ].join(',')}
      bg="navSurface"
    />
  );
};