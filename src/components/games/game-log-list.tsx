import React from 'react';
import {StyleSheet, View} from 'react-native';
import {InjectedThemeProps, withTheme} from '../../hoc/with-styles';
import {GameLogDto} from '../../services/dtos';
import {ListItemSeparator} from '../core/separators/list-item-separator';
import {GameLog} from './game-log';

interface Properties extends InjectedThemeProps {
  logs: GameLogDto[];
  showHeader?: boolean;
  shading?: 'odd' | 'even';
  minimumRows?: number;
}

const Component: React.FC<Properties> = props => {
  const {logs, showHeader = false, shading = 'odd', minimumRows, theme} = props;
  const styles = StyleSheet.create({
    marginWrapper: {
      marginHorizontal: 10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    container: {
      width: '100%',
      borderBottomWidth: 1,
      borderTopWidth: 1,
      borderTopColor: theme.colors.separator,
      borderBottomColor: theme.colors.separator,
    },
    nonShadedRow: {
      paddingHorizontal: 10,
      paddingVertical: 5,
    },
    shadedRow: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      backgroundColor: theme.colors.secondaryBackground,
    },
  });

  return (
    <View style={[styles.marginWrapper]}>
      {showHeader ? <></> : <></>}
      <View style={[styles.container]}>
        {logs
          .concat(
            minimumRows && logs.length < minimumRows
              ? [...Array(minimumRows - logs.length)].map(() => {
                  const emptyLog = new GameLogDto();
                  emptyLog.message = '';
                  return emptyLog;
                })
              : [],
          )
          .map((log: GameLogDto, index: number) => {
            return (
              <View key={`${log.id}-${index}`}>
                <View
                  style={[
                    shading === 'odd' && index % 2 === 0
                      ? styles.shadedRow
                      : styles.nonShadedRow,
                  ]}>
                  <GameLog log={log} />
                </View>
                {index < logs.length - 1 ? <ListItemSeparator /> : <></>}
              </View>
            );
          })}
      </View>
    </View>
  );
};

export const GameLogList = withTheme(Component);
