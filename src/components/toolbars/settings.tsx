import React from 'react';
import {Pressable, View, StyleSheet} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useTheme} from '../../providers/theme';

type Properties = {
  onPressCog: () => void;
};

const Component: React.FC<Properties> = ({onPressCog}) => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    toolbar: {
      flexDirection: 'row',
    },
    button: {paddingHorizontal: 8},
  });

  return (
    <View style={styles.toolbar}>
      <Pressable style={[styles.button]} onPress={onPressCog}>
        <FontAwesome5 name="cog" color={theme.colors.text} size={16} />
      </Pressable>
    </View>
  );
};

export {Component as SettingsToolbar};
