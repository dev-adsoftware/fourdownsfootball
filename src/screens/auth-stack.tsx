import React from 'react';
import {Stack} from '../components/navigation/stack-pager';
import {SignInScreen} from './signin';

interface AuthStackProps {}

export const AuthStack: React.FC<AuthStackProps> = props => {
  return (
    <>
      <Stack.StackProvider>
        <Stack.StackPager initialPage={<SignInScreen />} />
      </Stack.StackProvider>
    </>
  );
};
