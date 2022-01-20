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
    container: {flexDirection: 'row', alignItems: 'center'},
    button: {
      backgroundColor: disabled
        ? theme.colors.fill
        : filled
        ? activeColor || theme.colors.blue
        : theme.colors.background,
      borderWidth: disabled || filled ? 0 : 1,
      borderColor: disabled
        ? theme.colors.separator
        : activeColor || theme.colors.blue,
      borderRadius: 20,
      alignItems: 'center',
      paddingVertical: compact ? 3 : 7,
      paddingHorizontal: compact ? 15 : 20,
    },
    text: {
      color: disabled
        ? theme.colors.secondaryText
        : filled
        ? theme.colors.white
        : activeColor || theme.colors.blue,
      fontWeight: '500',
    },

    leftIconContainer: {marginRight: 10},
    rightIconContainer: {marginLeft: 10},
    emptyIconContainer: {height: 20},
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
        <ActivityIndicator
          color={filled ? theme.colors.white : activeColor || theme.colors.blue}
          size={17}
        />
      ) : (
        <View style={[styles.container]}>
          {iconLeft ? (
            <View style={[styles.leftIconContainer]}>
              <FontAwesome5Icon
                name={iconLeft}
                color={
                  disabled
                    ? theme.colors.secondaryText
                    : filled
                    ? theme.colors.white
                    : activeColor || theme.colors.blue
                }
                size={20}
              />
            </View>
          ) : (
            <View style={[styles.emptyIconContainer]} />
          )}
          <Text style={[styles.text]}>{text}</Text>
          {iconRight ? (
            <View style={[styles.rightIconContainer]}>
              <FontAwesome5Icon
                name={iconRight}
                color={
                  disabled
                    ? theme.colors.secondaryText
                    : filled
                    ? theme.colors.white
                    : activeColor || theme.colors.blue
                }
                size={20}
              />
            </View>
          ) : (
            <View style={[styles.emptyIconContainer]} />
          )}
        </View>
      )}
    </Pressable>
  );
};

export {Component as Button};
