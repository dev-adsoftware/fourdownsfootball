import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {AppStackParamList} from '../../App';
import {Button} from '../components/core/buttons/button';
import {AnimatedPieChart} from '../components/svg/animated-pie-chart';
import {useTheme} from '../providers/theme';
import {EmojiDecoder} from '../utilities/emoji-decoder';

type Properties = {
  navigation: NativeStackNavigationProp<AppStackParamList>;
};

const TempScreen: React.FC<Properties> = ({navigation}) => {
  const [mod1, setMod1] = React.useState(0);
  const [mod2, setMod2] = React.useState(0);
  const [mod3, setMod3] = React.useState(0);
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    text: {
      color: theme.colors.text,
      padding: 10,
      ...theme.typography.largeTitle,
    },
  });

  return (
    <>
      <View style={[styles.container]}>
        <Text style={[styles.text]}>
          {/* text {JSON.parse(`["${unicode}"]`)[0]} */}
          text {EmojiDecoder.decode('CA')}
        </Text>
        <Button
          text="Settings"
          onPress={() => {
            setMod1(Math.round((Math.random() * 100) % 44) - 22);
          }}
        />
        <AnimatedPieChart
          slices={[
            {
              startDegrees: 60,
              endDegrees: 60 + mod1,
              color: '#AA0000',
            },
            {
              startDegrees: 100,
              endDegrees: 100 + mod1,
              color: '#FF0000',
            },
            {
              startDegrees: 100,
              endDegrees: 100 + mod1,
              color: '#00BB00',
            },
            {
              startDegrees: 0,
              endDegrees: 0,
              color: '#00EE00',
            },
          ]}
          size={200}
        />
      </View>
    </>
  );
};

export {TempScreen};
