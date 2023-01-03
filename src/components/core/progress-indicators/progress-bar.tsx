import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {InjectedThemeProps, withTheme} from '../../../hoc/with-styles';

interface Properties extends InjectedThemeProps {
  percentComplete: number;
  filledColor: string;
  unfilledColor: string;
  height?: number;
  overlayText?: string;
  textColor?: string;
}

const Component: React.FC<Properties> = props => {
  const {
    percentComplete,
    filledColor,
    unfilledColor,
    height = 15,
    overlayText,
    textColor,
    theme,
  } = props;
  const styles = StyleSheet.create({
    progressBar: {
      width: '100%',
      flexDirection: 'row',
      borderWidth: 1,
      borderColor: theme.colors.separator,
      borderRadius: height / 2,
      backgroundColor: unfilledColor,
      alignItems: 'center',
      height: height,
    },
    progressBarFilled: {
      backgroundColor: filledColor,
      height: height - 2,
      width: `${percentComplete}%`,
      borderTopLeftRadius: (height - 2) / 2,
      borderBottomLeftRadius: (height - 2) / 2,
      borderTopRightRadius: percentComplete === 100 ? 10 : 0,
      borderBottomRightRadius: percentComplete === 100 ? 10 : 0,
    },
    progressBarText: {
      ...theme.typography.caption2,
      position: 'absolute',
      paddingLeft: 10,
      color: textColor,
      fontWeight: 'bold',
    },
  });

  return (
    <View style={[styles.progressBar]}>
      <View style={[styles.progressBarFilled]} />
      <Text style={[styles.progressBarText]}>{overlayText}</Text>
    </View>
  );
};

export const ProgressBar = withTheme(Component);
