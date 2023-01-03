import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {InjectedThemeProps, withTheme} from '../../hoc/with-styles';
import {ProgressBar} from '../core/progress-indicators/progress-bar';

interface Properties extends InjectedThemeProps {
  teamName: string;
  teamPrimaryColor: string;
  momentum: number;
  timeRemaining: number;
  actionIconName: string;
  onActionPressed: () => Promise<void>;
}

const Component: React.FC<Properties> = props => {
  const {
    teamName,
    teamPrimaryColor,
    momentum,
    timeRemaining,
    actionIconName,
    onActionPressed,
    theme,
  } = props;
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 5,
      backgroundColor: theme.colors.background,
      zIndex: 5,
    },
    iconContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: 10,
      marginVertical: 3,
      borderRadius: 10,
    },
    buttonIconContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: theme.colors.blue,
      marginHorizontal: 5,
      paddingVertical: 1,
      paddingHorizontal: 8,
      borderRadius: 10,
    },
    text: {
      ...theme.typography.caption2,
      marginLeft: 5,
      marginRight: 5,
    },
    progressBarContainer: {
      flex: 9,
      marginLeft: 5,
    },
  });

  const padTime = (value: number): string => {
    return String(Math.floor(value)).padStart(2, '0');
  };

  const formatTime = (seconds: number): string => {
    return `${padTime(seconds / (24 * 3600))}:${padTime(
      (seconds % (24 * 3600)) / 3600,
    )}:${padTime(((seconds % (24 * 3600)) % 3600) / 60)}:${padTime(
      seconds % 60,
    )}`;
  };

  return (
    <View style={[styles.container]}>
      <View style={[styles.iconContainer]}>
        <FontAwesome5Icon
          name="tachometer-alt"
          color={theme.colors.green}
          size={18}
        />
      </View>
      <View style={[styles.progressBarContainer]}>
        <ProgressBar
          percentComplete={momentum}
          filledColor={
            (
              theme.colors as {
                [x: string]: string;
              }
            )[teamPrimaryColor.toLowerCase()]
          }
          unfilledColor={theme.colors.black}
          overlayText={teamName}
          textColor={theme.colors.white}
        />
      </View>
      <View style={[styles.iconContainer]}>
        <FontAwesome5Icon name="clock" color={theme.colors.red} size={16} />
      </View>
      <Text style={[styles.text]}>{formatTime(timeRemaining)}</Text>
      <Pressable onPress={onActionPressed}>
        <View style={[styles.buttonIconContainer]}>
          <FontAwesome5Icon
            name={actionIconName}
            color={theme.colors.blue}
            size={16}
          />
        </View>
      </Pressable>
    </View>
  );
};

export const GameMomentumBar = withTheme(Component);
