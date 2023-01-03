import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {InjectedThemeProps, withTheme} from '../../hoc/with-styles';
import {GameLogDto} from '../../services/dtos';

interface Properties extends InjectedThemeProps {
  log: GameLogDto;
}

const Component: React.FC<Properties> = props => {
  const {log, theme} = props;
  const styles = StyleSheet.create({
    logText: {
      ...theme.typography.footnote,
      color: theme.colors.text,
    },
  });

  return (
    <View>
      <Text style={[styles.logText]}>{log.message}</Text>
    </View>
  );
};

export const GameLog = withTheme(Component);
