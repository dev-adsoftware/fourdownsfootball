import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {InjectedThemeProps, withTheme} from '../../hoc/with-theme';
import {GameDetailExtendedTeamSnapshotDto} from '../../services/dtos/queries/game-detail/game-detail-query-response.dto';
import {TeamAvatar} from '../core/avatars/team-avatar';

interface Properties extends InjectedThemeProps {
  actingTeam: GameDetailExtendedTeamSnapshotDto;
  text: string;
}

const Component: React.FC<Properties> = props => {
  const {actingTeam, text, theme} = props;
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      paddingTop: 10,
      alignItems: 'center',
    },
    avatarGrid: {
      flex: 1,
      paddingLeft: 20,
    },
    textGrid: {
      flex: 7,
      marginRight: 10,
    },
    text: {
      ...theme.typography.subheading,
      textAlign: 'left',
    },
  });

  return (
    <View style={[styles.container]}>
      <View style={[styles.avatarGrid]}>
        <TeamAvatar town={actingTeam.town} team={actingTeam} />
      </View>
      <View style={[styles.textGrid]}>
        <Text style={[styles.text]}>{text}</Text>
      </View>
    </View>
  );
};

export const GameActionHeader = withTheme(Component);
