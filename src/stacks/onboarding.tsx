import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {OnboardingProfileScreen} from '../screens/onboarding/profile';

type Properties = {};

export type AuthStackParamList = {
  'Onboarding Profile': undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

const OnboardingStack: React.FC<Properties> = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="Onboarding Profile"
        component={OnboardingProfileScreen}
      />
    </Stack.Navigator>
  );
};

export {OnboardingStack};
