import React from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SigninForm} from '../../components/auth/signin-form';
import {AuthStackParamList} from '../../stacks/auth';

type Properties = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'Sign In'>;
};

const Screen: React.FC<Properties> = ({navigation}) => {
  return (
    <SigninForm
      onPressForgotPassword={() => navigation.navigate('Forgot Password')}
      onPressSignUp={() => navigation.navigate('Sign Up')}
    />
  );
};

export {Screen as SignInScreen};
