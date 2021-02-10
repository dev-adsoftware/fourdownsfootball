import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { TouchableOpacity, View } from 'react-native';
import { Menu, useTheme } from 'react-native-paper';
import { useAuth } from '../../providers/auth';

export default () => {
  const theme = useTheme();
  const auth = useAuth();

  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <View style={{ marginRight: 20 }}>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <TouchableOpacity onPress={openMenu}>
            <FontAwesomeIcon icon="cog" color={theme.colors.primary} />
          </TouchableOpacity>
        }>
        <Menu.Item
          title="Sign out"
          onPress={() => {
            closeMenu();
            auth.setUser({ username: 'empty' });
          }}
        />
      </Menu>
    </View>
  );
};
