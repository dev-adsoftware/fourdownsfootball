import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Svg, {Circle, Line, Polygon, Rect} from 'react-native-svg';
import {AppStackParamList} from '../../App';
import {Button} from '../components/core/buttons/button';
import {useTheme} from '../providers/theme';
import {EmojiDecoder} from '../utilities/emoji-decoder';

type Properties = {
  navigation: NativeStackNavigationProp<AppStackParamList>;
};

const TempScreen: React.FC<Properties> = ({navigation}) => {
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
        <View
          style={{
            width: '100%',
            height: 100,
            backgroundColor: theme.colors.secondaryBackground,
            padding: 10,
          }}>
          <Svg height="100%" width="100%" viewBox="0 0 240 35">
            {/* <Polygon
              points="15,0 225,0 240,30, 0,30"
              fill="#00AA00"
              // stroke="white"
              // strokeWidth="3"
            /> */}
            <Polygon
              points="15,0 32,0 20,30, 0,30"
              fill="#AA0000"
              stroke="white"
              strokeWidth="1"
            />
            <Polygon
              points="32,0 49,0 40,30, 20,30"
              fill="#00AA00"
              stroke="white"
              strokeWidth="1"
            />
            <Polygon
              points="49,0 66,0 60,30, 40,30"
              fill="#00AA00"
              stroke="white"
              strokeWidth="1"
            />
            <Polygon
              points="66,0 84,0 80,30, 60,30"
              fill="#00AA00"
              stroke="white"
              strokeWidth="1"
            />
            <Polygon
              points="84,0 102,0 100,30, 80,30"
              fill="#00AA00"
              stroke="white"
              strokeWidth="1"
            />
            <Polygon
              points="102,0 120,0 120,30, 100,30"
              fill="#00AA00"
              stroke="white"
              strokeWidth="1"
            />
            <Polygon
              points="120,0 138,0 140,30, 120,30"
              fill="#00AA00"
              stroke="white"
              strokeWidth="1"
            />
            <Polygon
              points="138,0 156,0 160,30, 140,30"
              fill="#00AA00"
              stroke="white"
              strokeWidth="1"
            />
            <Polygon
              points="156,0 174,0 180,30, 160,30"
              fill="#00AA00"
              stroke="white"
              strokeWidth="1"
            />
            <Polygon
              points="174,0 191,0 200,30, 180,30"
              fill="#00AA00"
              stroke="white"
              strokeWidth="1"
            />
            <Polygon
              points="191,0 208,0 220,30, 200,30"
              fill="#00AA00"
              stroke="white"
              strokeWidth="1"
            />
            <Polygon
              points="208,0 225,0 240,30, 220,30"
              fill="#0000AA"
              stroke="white"
              strokeWidth="1"
            />
            {/* <Polygon
              points="15,0 225,0 240,30, 0,30"
              fill="#00AA00"
              // stroke="white"
              // strokeWidth="3"
            /> */}
            <Rect
              x="0"
              y="30"
              width="240"
              height="3"
              fill="#005500"
              stroke="white"
              strokeWidth="1"
            />
            <Line
              x1="75"
              y1="1"
              x2="70"
              y2="29"
              stroke="blue"
              strokeWidth="1"
            />
            <Line
              x1="84"
              y1="1"
              x2="80"
              y2="29"
              stroke="yellow"
              strokeWidth="1"
            />
            <Circle cx="63" cy="15" r="3" fill="white" />
            <Line
              x1="63"
              y1="15"
              x2="73"
              y2="15"
              stroke="white"
              strokeWidth="2"
            />
            <Circle
              cx="73"
              cy="15"
              r="3"
              fill="brown"
              stroke="white"
              strokeWidth="1"
            />
          </Svg>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{...theme.typography.caption2, marginTop: -10}}>
              KC
            </Text>
            <Text
              style={{
                ...theme.typography.caption2,
                marginTop: -10,
                paddingRight: 15,
              }}>
              20
            </Text>
            <Text style={{...theme.typography.caption2, marginTop: -10}}>
              50
            </Text>
            <Text
              style={{
                ...theme.typography.caption2,
                marginTop: -10,
                paddingLeft: 15,
              }}>
              20
            </Text>
            <Text style={{...theme.typography.caption2, marginTop: -10}}>
              NE
            </Text>
          </View>
        </View>
        <Text style={[styles.text]}>
          {/* text {JSON.parse(`["${unicode}"]`)[0]} */}
          text {EmojiDecoder.decode('CA')}
        </Text>
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
