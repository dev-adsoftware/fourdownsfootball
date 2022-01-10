import React from 'react';
import {StyleSheet, View} from 'react-native';

type Properties = {};

const Component: React.FC<Properties> = ({}) => {
  const styles = StyleSheet.create({
    separator: {height: 1, backgroundColor: 'rgba(0,0,0,0.1)', marginLeft: 10},
  });
  return <View style={[styles.separator]} />;
};

export {Component as SectionListItemSeparator};
