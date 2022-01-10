/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {TouchableOpacity, View, StyleSheet} from 'react-native';
// import {useTheme} from '../providers/theme';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {HomeStackParamList} from '../stacks/home';
// import {useData} from '../providers/data';

type Properties = {
  children?: React.ReactNode;
};

const Component: React.FC<Properties> = ({children}) => {
  // const theme = useTheme();
  // const data = useData();
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList, 'Profile'>>();

  const styles = StyleSheet.create({
    toolbar: {
      flexDirection: 'row',
    },
    button: {paddingHorizontal: 8},
  });

  return (
    <View style={styles.toolbar}>
      {children}
      <TouchableOpacity
        style={[styles.button]}
        onPress={() => {
          console.log('going to notifications');
        }}>
        <FontAwesome5 name="bell" color="white" size={20} solid />
        {/* {data.notifications.length > 0 ? (
          <Badge
            size={20}
            style={{
              fontWeight: '900',
              fontSize: 12,
              position: 'absolute',
              top: -10,
              right: -5,
            }}>
            {data.notifications.length}
          </Badge>
        ) : (
          <></>
        )} */}
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button]}
        onPress={() => {
          navigation.navigate('Profile');
        }}>
        <FontAwesome5 name="user" color="white" size={20} solid />
        {/* {data.notifications.length > 0 ? (
          <Badge
            size={20}
            style={{
              fontWeight: '900',
              fontSize: 12,
              position: 'absolute',
              top: -10,
              right: -5,
            }}>
            {data.notifications.length}
          </Badge>
        ) : (
          <></>
        )} */}
      </TouchableOpacity>
    </View>
  );
};

export {Component as BaseToolbar};
