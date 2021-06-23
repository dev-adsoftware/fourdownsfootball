import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { TouchableOpacity } from 'react-native';
import { useTheme } from '../../providers/theme';
import Toolbar from '../home/toolbar';
import { useNavigation } from '@react-navigation/native';

export default () => {
  const theme = useTheme();
  const navigation = useNavigation();

  return (
    <Toolbar>
      <TouchableOpacity
        style={{ paddingHorizontal: 8 }}
        onPress={() => {
          navigation.navigate('New', { ownerId: 'kyle' });
        }}>
        <FontAwesomeIcon icon="plus" color={theme.colors.primary} />
      </TouchableOpacity>
    </Toolbar>
  );
};
