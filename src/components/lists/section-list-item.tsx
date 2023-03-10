import React from 'react';
import {Icon} from '../../primitives/icon';
import {Text} from '../../primitives/text';
import {View} from '../../primitives/view';

interface SectionListItemProps {
  text: string;
  onPress: () => void;
}

const SECTION_TEXT_FONT_SIZE = 17;

export const SectionListItem: React.FC<SectionListItemProps> = props => {
  return (
    <View onPress={props.onPress}>
      <View row alignItems="center" justifyContent="space-between">
        <Text
          py={10}
          text={props.text}
          typeFace="sourceSansProRegular"
          fontSize={SECTION_TEXT_FONT_SIZE}
        />
        <Icon icon="chevron-right" color="grayButton" size={10} />
      </View>
    </View>
  );
};
