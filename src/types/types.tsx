import React from 'react';
import {ViewProps} from 'react-native';

export type ChildrenProps = Pick<ViewProps, 'children'>;
export type OnLayoutProps = Pick<ViewProps, 'onLayout'>;

export interface StateProp<T> {
  value: T;
  set: React.Dispatch<React.SetStateAction<T>>;
}
