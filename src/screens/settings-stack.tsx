import React from 'react';
import {FadeInScreenProvider} from '../components/navigation/fade-in-screen';
import {Stack} from '../components/navigation/stack-pager';
import {SettingsScreen} from './settings';

interface SettingsStackProps {}

export const SettingsStack: React.FC<SettingsStackProps> = props => {
  return (
    <>
      <Stack.StackProvider>
        <Stack.StackPager initialPage={<SettingsScreen />} />
      </Stack.StackProvider>
    </>
  );
};
