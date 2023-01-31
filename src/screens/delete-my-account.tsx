import React from 'react';
import {SafeBar} from '../components/primitives/safe-bar';
import {View} from '../components/primitives/view';

interface DeleteMyAccountScreenProps {}

export const DeleteMyAccountScreen: React.FC<
  DeleteMyAccountScreenProps
> = props => {
  return (
    <>
      <View flex={1} w="full" debugColor="black" px={15} />
    </>
  );
};
