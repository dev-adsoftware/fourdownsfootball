import React from 'react';
import { View } from 'react-native';
import { Paragraph } from 'react-native-paper';
import { useTheme } from '../../providers/theme';

export default () => {
  const theme = useTheme();
  return (
    <>
      <View style={theme.layout.container}>
        <Paragraph>Loading...</Paragraph>
      </View>
    </>
  );
};
