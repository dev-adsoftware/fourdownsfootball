import React from 'react';
import {Pressable, View, StyleSheet} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {InjectedThemeProps, withTheme} from '../../hoc/with-theme';

interface Properties extends InjectedThemeProps {
  onNew: () => void;
}

const Component: React.FC<Properties> = props => {
  const {onNew, theme} = props;

  const styles = StyleSheet.create({
    toolbar: {
      flexDirection: 'row',
    },
    button: {paddingHorizontal: 8},
  });

  return (
    <View style={styles.toolbar}>
      <Pressable style={[styles.button]} onPress={onNew}>
        <FontAwesome5 name="plus" color={theme.colors.white} size={17} />
      </Pressable>
    </View>
  );
};

export const NewToolbar = withTheme(Component);
