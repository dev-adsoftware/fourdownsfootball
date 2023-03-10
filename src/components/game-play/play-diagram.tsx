import React from 'react';
import {useTheme} from '../../providers/theme';

interface PlayDiagramProps {}

export const PlayDiagram: React.FC<PlayDiagramProps> = props => {
  const theme = useTheme();
  return <Svg width={250} height={175} viewBox={'0 0 100 70'}>
};
