import React from 'react';
import {Icon} from '../../primitives/icon';
import {Text} from '../../primitives/text';
import {View} from '../../primitives/view';
import {PressableProps} from '../../types';

interface OptionButtonProps extends Pick<PressableProps, 'onPress'> {
  text: string;
  selected: boolean;
}

export const OptionButton: React.FC<OptionButtonProps> = props => {
  return (
    <View onPress={props.onPress}>
      <View
        row
        borderRadius="circle"
        bg={props.selected ? 'primary' : 'white'}
        borderColor={!props.selected ? 'darkText' : 'primary'}
        borderWidth={1}
        alignItems="center"
        justifyContent="center"
        py={10}>
        <View w={50} />
        <View flex={1} alignItems="center">
          <Text
            text={props.text}
            color={props.selected ? 'white' : 'darkText'}
            typeFace="klavikaCondensedBoldItalic"
            fontSize={20}
          />
        </View>
        <View w={50} justifyContent="flex-end">
          {props.selected && <Icon icon="check" color="white" size={12} />}
        </View>
      </View>
    </View>
  );
};
