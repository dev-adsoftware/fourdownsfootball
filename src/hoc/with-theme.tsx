import React from 'react';
import {
  InjectedThemeProps,
  ThemeStyleProps,
  useTheme,
} from '../providers/theme';

export const withTheme = <P extends ThemeStyleProps>(
  Component: React.ComponentType<P>,
): React.FC<Omit<P, keyof InjectedThemeProps>> => {
  return ({...props}: Omit<P, keyof InjectedThemeProps>) => {
    const theme = useTheme();
    const {styleProps, restProps} =
      theme.mapPropsToStyleSheet<Omit<P, keyof InjectedThemeProps>>(props);
    return (
      <Component
        {...(restProps as P)}
        style={[restProps.style, styleProps.s]}
        theme={theme}
      />
    );
  };
};
