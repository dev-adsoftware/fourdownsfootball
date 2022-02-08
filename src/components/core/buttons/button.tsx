import React from 'react';
import {
  StyleSheet,
  Text,
  Pressable,
  View,
  ActivityIndicator,
} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {useTheme} from '../../../providers/theme';

type Properties = {
  text: string;
  activeColor?: string;
  filled?: boolean;
  compact?: boolean;
  disabled?: boolean;
  iconLeft?: string;
  iconRight?: string;
  isLoading?: boolean;
  onPress: () => void;
};

const Component: React.FC<Properties> = ({
  text,
  activeColor,
  filled = true,
  compact = false,
  disabled,
  iconLeft,
  iconRight,
  isLoading = false,
  onPress,
}) => {
  const theme = useTheme();
  const styles = StyleSheet.create({
    button: {
      backgroundColor: disabled
        ? theme.colors.secondaryBackground
        : filled
        ? activeColor || theme.colors.blue
        : theme.colors.background,
      borderWidth: disabled || filled ? 0 : 1,
      borderColor: disabled
        ? theme.colors.separator
        : activeColor || theme.colors.blue,
      borderRadius: 20,
      paddingVertical: compact ? 1 : 7,
      paddingHorizontal: compact ? 10 : 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      color: disabled
        ? theme.colors.secondaryText
        : filled
        ? theme.colors.white
        : activeColor || theme.colors.blue,
      ...(compact
        ? {...theme.typography.caption1, fontWeight: '500'}
        : theme.typography.headline),
    },
    iconContainer: {
      width: compact ? 7 : 20,
      marginRight: compact ? 5 : 10,
      marginLeft: compact ? 5 : 10,
      // backgroundColor: 'red',
    },
  });

  return (
    <Pressable
      style={({pressed}) => [
        {
          opacity: pressed ? 0.5 : 1.0,
        },
        styles.button,
      ]}
      disabled={disabled}
      onPress={onPress}>
      {isLoading ? (
        <>
          <ActivityIndicator
            style={[styles.iconContainer]}
            color={
              filled ? theme.colors.white : activeColor || theme.colors.blue
            }
            size={compact ? 15 : 17}
          />
          <Text style={[styles.text]}>{text}</Text>
          <View style={[styles.iconContainer]}>
            <Text> </Text>
          </View>
        </>
      ) : (
        <>
          {iconLeft ? (
            <View style={[styles.iconContainer]}>
              <FontAwesome5Icon
                name={iconLeft}
                color={
                  disabled
                    ? theme.colors.secondaryText
                    : filled
                    ? theme.colors.white
                    : activeColor || theme.colors.blue
                }
                size={compact ? 15 : 17}
              />
            </View>
          ) : (
            <View style={[styles.iconContainer]}>
              <Text> </Text>
            </View>
          )}
          <Text style={[styles.text]}>{text}</Text>
          {iconRight ? (
            <View style={[styles.iconContainer]}>
              <FontAwesome5Icon
                name={iconRight}
                color={
                  disabled
                    ? theme.colors.secondaryText
                    : filled
                    ? theme.colors.white
                    : activeColor || theme.colors.blue
                }
                size={compact ? 15 : 17}
              />
            </View>
          ) : (
            <View style={[styles.iconContainer]}>
              <Text> </Text>
            </View>
          )}
        </>
      )}
    </Pressable>
  );
};

export {Component as Button};
