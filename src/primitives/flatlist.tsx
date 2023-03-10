import {omit} from 'lodash';
import React from 'react';
import {
  FlatList as RNFlatList,
  FlatListProps as RNFlatListProps,
} from 'react-native';

interface FlatListProps<T> extends Omit<RNFlatListProps<T>, 'style'> {}

export const FlatList = <T extends {}>(
  props: FlatListProps<T> & {myRef: React.Ref<RNFlatList<T>>},
) => {
  return <RNFlatList ref={props.myRef} {...omit(props, 'ref')} />;
};
