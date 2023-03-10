import React from 'react';
import {Text} from '../../primitives/text';

interface CopyrightProps {
  version: string;
}

const COPYRIGHT_FONT_SIZE = 14;

export const Copyright: React.FC<CopyrightProps> = props => {
  return (
    <>
      <Text
        text={`Version: ${props.version}`}
        fontSize={COPYRIGHT_FONT_SIZE}
        typeFace="sourceSansProRegular"
      />
      <Text
        pt={10}
        textAlign="center"
        text={
          'Copyright 2023 American Dreams Software, LLC.\nAll rights reserved.'
        }
        fontSize={COPYRIGHT_FONT_SIZE}
        typeFace="sourceSansProRegular"
      />
    </>
  );
};
