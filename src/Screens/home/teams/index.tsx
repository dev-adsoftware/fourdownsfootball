import React from 'react';
import { View } from 'react-native';
import { Paragraph, useTheme } from 'react-native-paper';

export default () => {
  const theme = useTheme();
  return (
    <>
      <View style={theme.container}>
        <Paragraph>Here is a team</Paragraph>
      </View>
    </>
  );
};
