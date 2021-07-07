import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { TouchableOpacity } from 'react-native';
import { useTheme } from '../../providers/theme';
import Toolbar from '../main/toolbar';

export default () => {
  const theme = useTheme();

  return (
    <Toolbar>
      <TouchableOpacity
        style={theme.layout.toolbar.button}
        onPress={() => console.log('new league game')}>
        <FontAwesomeIcon icon="plus" color={theme.colors.primary} />
      </TouchableOpacity>
    </Toolbar>
  );
};
