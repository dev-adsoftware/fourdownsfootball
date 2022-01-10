import {useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {ProfileScreen} from '../screens/profile';
import {SignOutConfirmationScreen} from '../screens/sign-out-confirmation';

type Properties = {};

export type ProfileStackParamList = {
  'Profile Options': undefined;
  'Sign Out': undefined;
};

const Stack = createNativeStackNavigator<ProfileStackParamList>();

const ProfileStack: React.FC<Properties> = () => {
  const navigation = useNavigation();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: 'white'},
        headerTintColor: 'black',
        headerBackTitleVisible: false,
        headerRight: () => {
          return (
            <>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  style={{paddingHorizontal: 8}}
                  onPress={() => {
                    navigation.goBack();
                  }}>
                  <FontAwesome5 name="times" color="#c0c0c0" size={20} />
                </TouchableOpacity>
              </View>
            </>
          );
        },
      }}>
      <Stack.Screen name="Profile Options" component={ProfileScreen} />
      <Stack.Screen name="Sign Out" component={SignOutConfirmationScreen} />
    </Stack.Navigator>
  );
};

export {ProfileStack};
