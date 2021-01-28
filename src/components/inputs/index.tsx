import React from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import theme from '../../theme.json';

interface InputProps {
  errorText?: string;
  description?: string;
  styles?: typeof inputStyles;
}

export const Input = ({
  errorText,
  description,
  styles = inputStyles,
}: InputProps) => (
  <View style={styles.container}>
    <TextInput style={styles.input} selectionColor={theme.colors.primary} />
    {description && !errorText ? (
      <Text style={styles.description}>{description}</Text>
    ) : null}
    {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
  </View>
);

export const inputStyles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 12,
  },
  input: {
    backgroundColor: theme.colors.surface,
  },
  description: {
    fontSize: 13,
    color: theme.colors.secondary,
    paddingTop: 8,
  },
  error: {
    fontSize: 13,
    color: theme.colors.error,
    paddingTop: 8,
  },
});
