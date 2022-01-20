import React from 'react';
import {Pressable, View, StyleSheet} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useTheme} from '../../providers/theme';

type Properties = {
  onDismiss: () => void;
};

const Component: React.FC<Properties> = ({onDismiss}) => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    toolbar: {
      flexDirection: 'row',
    },
    button: {paddingHorizontal: 8},
  });

  return (
    <View style={styles.toolbar}>
      <Pressable style={[styles.button]} onPress={onDismiss}>
        <FontAwesome5
          name="times"
          color={theme.colors.secondaryText}
          size={20}
        />
      </Pressable>
    </View>
  );
};

export {Component as DismissToolbar};
