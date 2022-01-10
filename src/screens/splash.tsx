import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

type Properties = {};
const SplashScreen: React.FC<Properties> = () => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  return (
    <>
      <View style={[styles.container]}>
        <Text>Loading...</Text>
      </View>
    </>
  );
};

export {SplashScreen};
