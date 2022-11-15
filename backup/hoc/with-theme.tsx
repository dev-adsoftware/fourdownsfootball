import React from 'react';
import {Theme, useTheme} from '../providers/theme';

export interface InjectedThemeProps {
  theme: Theme;
}

export const withTheme =
  <P extends InjectedThemeProps>(
    Component: React.ComponentType<P>,
  ): React.FC<Omit<P, keyof InjectedThemeProps>> =>
  ({...props}: Omit<P, keyof InjectedThemeProps>) =>
    <Component {...(props as P)} theme={useTheme()} />;
