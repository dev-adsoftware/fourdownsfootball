import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../../providers/theme';

export default () => {
  const theme = useTheme();
  return (
    <>
      <View style={theme.layout.container}>
        <Text>games requests</Text>
      </View>
    </>
  );
};
