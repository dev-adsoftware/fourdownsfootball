import React from 'react';
import {Stack} from '../components/navigation/stack-pager';
import {CreateNameScreen} from './create-name';

interface OnboardingStackProps {}

export const OnboardingStack: React.FC<OnboardingStackProps> = props => {
  return (
    <>
      <Stack.StackProvider>
        <Stack.StackPager initialPage={<CreateNameScreen />} />
      </Stack.StackProvider>
    </>
  );
};
