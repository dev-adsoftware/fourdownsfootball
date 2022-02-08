import React from 'react';
import {StyleSheet, Text, View, Pressable} from 'react-native';
import {useTheme} from '../../../providers/theme';

type Properties = {
  text: string;
  activeColor?: string;
  disabledColor?: string;
  disabled?: boolean;
  onPress: () => void;
};

const Component: React.FC<Properties> = ({
  text,
  activeColor,
  disabled,
  onPress,
}) => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    text: {
      color: activeColor || theme.colors.link,
      ...theme.typography.body,
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

export {Component as LinkButton};
