import React from 'react';
import {StyleSheet, View} from 'react-native';

type Properties = {
  compact?: boolean;
  children: React.ReactNode;
};

const Component: React.FC<Properties> = ({compact = false, children}) => {
  const styles = StyleSheet.create({
    form: {
      width: '100%',
      marginVertical: compact ? 0 : 10,
    },
  });

  return <View style={[styles.form]}>{children}</View>;
};

export {Component as Form};
