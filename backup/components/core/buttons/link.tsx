import React from 'react';
import {StyleSheet, Text, View, Pressable} from 'react-native';
import {InjectedThemeProps, withTheme} from '../../../hoc/with-theme';

interface Properties extends InjectedThemeProps {
  text: string;
  activeColor?: string;
  disabledColor?: string;
  disabled?: boolean;
  onPress: () => void;
}

const Component: React.FC<Properties> = props => {
  const {text, activeColor, disabled, onPress, theme} = props;

  const styles = StyleSheet.create({
    text: {
      ...theme.typography.body,
      color: activeColor || theme.colors.link,
    },
  });
  return (
    <View>
      <Pressable onPress={disabled ? () => {} : onPress}>
        <Text style={[styles.text]}>{text}</Text>
      </Pressable>
    </View>
  );
};

export const LinkButton = withTheme(Component);
