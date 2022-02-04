import React from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../../stacks/auth';
import {SignupForm} from '../../components/auth/signup-form';

type Properties = {
  navigation: NativeStackNavigationProp<AuthStackParamList>;
};

const Screen: React.FC<Properties> = ({navigation}) => {
  return <SignupForm navigation={navigation} />;
};

export {Screen as SignUpScreen};
