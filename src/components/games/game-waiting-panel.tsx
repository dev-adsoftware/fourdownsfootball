import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {InjectedThemeProps, withTheme} from '../../hoc/with-theme';

interface Properties extends InjectedThemeProps {}

const Component: React.FC<Properties> = props => {
  const {theme} = props;
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: 80,
      marginBottom: 5,
      borderWidth: 1,
      borderRadius: 10,
      borderColor: theme.colors.black,
      shadowColor: theme.colors.black,
      shadowOpacity: 0.9,
      shadowRadius: 2,
      shadowOffset: {width: 3, height: 3},
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.background,
    },
    clockIconContainer: {
      height: '100%',
      borderTopLeftRadius: 10,
      borderBottomLeftRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      paddingLeft: 20,
      paddingRight: 10,
    },
    waitingTextContainer: {
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      paddingRight: 20,
      paddingLeft: 10,
    },
    waitingText: {
      ...theme.typography.body,
    },
  });

  return (
    <View style={[styles.container]}>
      <View style={[styles.clockIconContainer]}>
        <FontAwesome5Icon name="clock" color={theme.colors.text} size={54} />
      </View>
      <View style={[styles.waitingTextContainer]}>
        <Text style={[styles.waitingText]}>Waiting for opponent</Text>
      </View>
    </View>
  );
};

export const GameWaitingPanel = withTheme(Component);
