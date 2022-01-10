/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

type Properties = {
  text: string;
  onConfirm: () => Promise<void>;
};

const Component: React.FC<Properties> = ({text, onConfirm}) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text
        style={{
          paddingHorizontal: 10,
          textAlign: 'center',
          paddingVertical: 10,
        }}>
        {text}
      </Text>
      <TouchableOpacity onPress={onConfirm}>
        <Text>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
};

export {Component as ConfirmActionForm};
