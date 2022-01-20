import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {AppStackParamList} from '../../App';
import {Button} from '../components/core/buttons/button';
import {useTheme} from '../providers/theme';

type Properties = {
  navigation: NativeStackNavigationProp<AppStackParamList>;
};

const TempScreen: React.FC<Properties> = ({navigation}) => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {color: theme.colors.text, padding: 10},
  });
  return (
    <>
      <View style={[styles.container]}>
        <Text style={[styles.text]}>text</Text>
        <Button
          text="Settings"
          onPress={() => {
            navigation.navigate('Settings');
          }}
        />
      </View>
    </>
  );
};

export {TempScreen};
