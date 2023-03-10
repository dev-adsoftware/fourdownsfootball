import React from 'react';
import {
  ViewProps,
  PressableProps as RNPressableProps,
  GestureResponderEvent,
} from 'react-native';

export type ChildrenProps = Pick<ViewProps, 'children'>;
export type OnLayoutProps = Pick<ViewProps, 'onLayout'>;
export type PressableProps = Pick<RNPressableProps, 'disabled'> & {
  onPress?: (event: GestureResponderEvent) => void;
  opaque?: boolean;
};

export interface StateProp<T> {
  value: T;
  set: React.Dispatch<React.SetStateAction<T>>;
}

type Enumerate<
  N extends number,
  Acc extends number[] = [],
> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>;

export type RangeObject<L extends number, V> = {
  [Property in Enumerate<L>]: V;
};
