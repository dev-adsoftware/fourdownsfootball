import React from 'react';
import { StyleSheet } from 'react-native';
import theme from '../../theme.json';

import {
  TouchableOpacity,
  Text,
  GestureResponderEvent,
  View,
} from 'react-native';

interface BaseButtonProps {
  text: string;
  onPress: (event: GestureResponderEvent) => void;
}

interface DefaultButtonProps extends BaseButtonProps {
  surfaceColor: string;
  textColor: string;
}

export const Button = ({
  text,
  onPress,
  surfaceColor,
  textColor,
}: DefaultButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{ ...styles.button, backgroundColor: surfaceColor }}>
        <Text style={{ ...styles.text, color: textColor }}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export const PrimaryButton = ({ text, onPress }: BaseButtonProps) => {
  return (
    <Button
      text={text}
      onPress={onPress}
      surfaceColor={theme.colors.primary}
      textColor="white"
    />
  );
};

export const SecondaryButton = ({ text, onPress }: BaseButtonProps) => {
  return (
    <Button
      text={text}
      onPress={onPress}
      surfaceColor="white"
      textColor={theme.colors.secondary}
    />
  );
};

export const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.surface,
    borderRadius: 2,
    padding: 5,
    margin: 5,
  },
  text: {
    color: 'white',
  },
});
