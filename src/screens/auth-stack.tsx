import React from 'react';
import {StackPager, StackProvider} from '../components/navigation/stack-pager';
import {SignInScreen} from './signin';

interface AuthScreenProps {}

export const AuthScreen: React.FC<AuthScreenProps> = _props => {
  return (
    <>
      <StackProvider>
        <StackPager initialPage={<SignInScreen />} />
      </StackProvider>
    </>
  );
};
