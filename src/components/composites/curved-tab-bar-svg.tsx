import React from 'react';
import {ColorValue, useWindowDimensions, ViewProps} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {TAB_BAR_HEIGHT} from '../../constants/tab-bar';
import {withTheme, WithThemeStyleProps} from '../../hoc/with-theme';

interface CurvedTabBarSvgProperties
  extends WithThemeStyleProps,
    Omit<ViewProps, 'style'> {}

const _CurvedTabBar: React.FC<CurvedTabBarSvgProperties> = props => {
  const {theme} = props;
  const {width} = useWindowDimensions();

  return (
    <Svg
      viewBox={`0 0 ${width} ${TAB_BAR_HEIGHT}`}
      height={TAB_BAR_HEIGHT}
      width={width}>
      <Path
        d={[
          `M 0 ${TAB_BAR_HEIGHT}`,
          `L 0 ${TAB_BAR_HEIGHT}`,
          `L ${width} ${TAB_BAR_HEIGHT}`,
          `L ${width} 0`,
          `A ${width / 2} 30 0 0 1 0 -20`,
          'z',
        ].join(',')}
        fill={theme.colors.navSurface as ColorValue}
        // strokeWidth={1}
        // stroke={theme.colors.separator}
      />
    </Svg>
  );
};

export const CurvedTabBar = withTheme(_CurvedTabBar);
