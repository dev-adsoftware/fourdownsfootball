import React from 'react';
import {Icon} from '../../primitives/icon';
import {Text} from '../../primitives/text';
import {View} from '../../primitives/view';
import {PressableProps} from '../../types';

interface SelectListItemProps extends Pick<PressableProps, 'onPress'> {
  text: string;
  selected: boolean;
}

export const SelectListItem: React.FC<SelectListItemProps> = props => {
  return (
    <View
      borderHorizontalColor="grayButton"
      borderHorizontalWidth={1}
      mt={-1}
      onPress={props.onPress}>
      <View row alignItems="center" justifyContent="space-between">
        <Text
          py={10}
          text={props.text}
          typeFace="sourceSansProRegular"
          fontSize={17}
          color="darkText"
        />
        {props.selected && <Icon icon="check" color="primary" size={10} />}
      </View>
    </View>
  );
};
