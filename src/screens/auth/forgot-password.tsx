import React from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ForgotPasswordForm} from '../../components/auth/forgot-password-form';
import {AuthStackParamList} from '../../stacks/auth';

type Properties = {
  navigation: NativeStackNavigationProp<AuthStackParamList>;
};

const Screen: React.FC<Properties> = ({navigation}) => {
  return <ForgotPasswordForm navigation={navigation} />;
};

export {Screen as ForgotPasswordScreen};
