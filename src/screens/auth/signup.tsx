import React from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../../stacks/auth';
import {SignupForm} from '../../components/auth/signup-form';

type Properties = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'Sign In'>;
};

const Screen: React.FC<Properties> = ({navigation}) => {
  return (
    <SignupForm
      onPressSignUp={(username: string) =>
        navigation.navigate('Sign Up Confirmation', {username})
      }
    />
  );
};

export {Screen as SignUpScreen};
