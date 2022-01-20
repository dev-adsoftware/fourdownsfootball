import React from 'react';
import {StyleSheet, View} from 'react-native';

type Properties = {
  compact?: boolean;
  children: React.ReactNode;
};

const Component: React.FC<Properties> = ({compact = false, children}) => {
  const styles = StyleSheet.create({
    row: {marginVertical: compact ? 3 : 5},
  });

  return <View style={[styles.row]}>{children}</View>;
};

export {Component as FormRow};
