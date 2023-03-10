import React from 'react';
import {View} from '../primitives/view';

interface EditNameScreenProps {}

export const EditNameScreen: React.FC<EditNameScreenProps> = _props => {
  return (
    <>
      <View flex={1} w="full" debugColor="purple" px={15} />
    </>
  );
};
