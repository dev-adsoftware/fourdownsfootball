import React from 'react';
import {
  FlatList as RNFlatList,
  FlatListProps as RNFlatListProps,
} from 'react-native';

interface FlatListProps<T> extends Omit<RNFlatListProps<T>, 'style'> {}

export const FlatList = React.forwardRef<RNFlatList, FlatListProps<any>>(
  (props: FlatListProps<any>, ref) => {
    return <RNFlatList ref={ref} {...props} />;
  },
);
