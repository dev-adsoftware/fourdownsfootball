import React from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SigninForm} from '../../components/auth/signin-form';
import {AuthStackParamList} from '../../stacks/auth';

type Properties = {
  navigation: NativeStackNavigationProp<AuthStackParamList>;
};

const Screen: React.FC<Properties> = ({navigation}) => {
  return <SigninForm navigation={navigation} />;
};

export {Screen as SignInScreen};
