import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Menu } from 'react-native-paper';
import { useAuth } from '../../providers/auth';
import { useTheme } from '../../providers/theme';
import Auth from '@aws-amplify/auth';
import { OwnerSummaryView } from '@dev-adsoftware/fourdownsfootball-dtos';

export default ({ children }: { children?: React.ReactNode }) => {
  const theme = useTheme();
  const auth = useAuth();

  const styles = StyleSheet.create({
    toolbar: {
      marginRight: 20,
      flexDirection: 'row',
    },
  });

  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <View style={styles.toolbar}>
      {/* <TouchableOpacity
        style={{ paddingHorizontal: 8 }}
        onPress={() => console.log('new game')}>
        <FontAwesomeIcon icon="plus" color={theme.colors.primary} />
      </TouchableOpacity> */}
      {children}
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <TouchableOpacity
            style={theme.layout.toolbar.button}
            onPress={openMenu}>
            <FontAwesomeIcon icon="cog" color={theme.colors.primary} />
          </TouchableOpacity>
        }>
        <Menu.Item
          title="Sign out"
          onPress={async () => {
            closeMenu();
            await Auth.signOut();
            auth.setOwner(new OwnerSummaryView());
          }}
        />
      </Menu>
    </View>
  );
};
