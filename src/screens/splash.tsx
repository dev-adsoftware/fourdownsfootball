import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useTheme} from '../providers/theme';

type Properties = {};
const SplashScreen: React.FC<Properties> = () => {
  const theme = useTheme();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.background,
    },
    text: {color: theme.colors.text},
  });

  return (
    <>
      <View style={[styles.container]}>
        <Text style={[styles.text]}>Loading...</Text>
      </View>
    </>
  );
};

export {SplashScreen};
