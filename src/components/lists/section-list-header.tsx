import React from 'react';
import {SECTION_LIST_HEADER_FONT_SIZE} from '../../constants';
import {Text} from '../../primitives/text';
import {HorizontalSeparator} from '../separators/horizontal-separator';

interface SectionListHeaderProps {
  sectionName: string;
}

export const SectionListHeader: React.FC<SectionListHeaderProps> = props => {
  return (
    <>
      <Text
        text={props.sectionName}
        typeFace="klavikaCondensedMedium"
        fontSize={SECTION_LIST_HEADER_FONT_SIZE}
      />
      <HorizontalSeparator />
    </>
  );
};
