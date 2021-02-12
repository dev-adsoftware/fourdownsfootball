import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { TouchableOpacity } from 'react-native';
import { useTheme } from '../../providers/theme';
import Toolbar from '../home/toolbar';

export default () => {
  const theme = useTheme();

  return (
    <Toolbar>
      <TouchableOpacity
        style={{ paddingHorizontal: 8 }}
        onPress={() => console.log('new game')}>
        <FontAwesomeIcon icon="plus" color={theme.colors.primary} />
      </TouchableOpacity>
    </Toolbar>
  );
};
