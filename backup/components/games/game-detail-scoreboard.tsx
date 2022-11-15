import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {InjectedThemeProps, withTheme} from '../../hoc/with-theme';
import {ActiveGame} from '../../providers/data';
import {GameState} from '../../services/dtos/types/game-state';
import {GameEngine} from '../../utilities/game-engine';
import {TeamAvatar} from '../core/avatars/team-avatar';

interface Properties extends InjectedThemeProps {
  activeGame: ActiveGame;
}

const Component: React.FC<Properties> = props => {
  const {activeGame, theme} = props;

  const styles = StyleSheet.create({
    container: {
      height: 80,
      width: '100%',
      backgroundColor: theme.colors.background,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.separator,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-evenly',
    },
    teamLogoGrid: {
      flex: 3,
      alignItems: 'flex-end',
    },
    teamLogoGridLast: {
      flex: 3,
      alignItems: 'flex-start',
    },
    teamLogoColumn: {alignItems: 'center'},
    teamLogoNameText: {
      ...theme.typography.caption2,
    },
    scoreGrid: {
      flex: 3,
      alignItems: 'center',
    },
    scoreText: {
      ...theme.typography.largeTitle,
      color: theme.colors.secondaryText,
      width: '100%',
    },
    awayScoreText: {
      textAlign: 'right',
      paddingRight: 10,
    },
    homeScoreText: {
      textAlign: 'left',
      paddingLeft: 10,
    },
    winningScoreText: {
      color: theme.colors.text,
      fontWeight: '600',
    },
    stateIconsGrid: {
      flex: 1,
      alignItems: 'center',
    },
    stateIconsColumn: {
      flexDirection: 'column',
      alignItems: 'center',
    },
    stateIcon: {margin: 3},
    rotatedIcon: {transform: [{rotate: '180deg'}]},
    stateGrid: {
      flex: 3,
      alignItems: 'center',
    },
    stateText: {
      ...theme.typography.caption1,
      textAlign: 'center',
      color: theme.colors.text,
    },
  });

  return (
    <View style={[styles.container]}>
      <View style={[styles.teamLogoGrid]}>
        <View style={[styles.teamLogoColumn]}>
          <TeamAvatar
            town={activeGame.item.awayTeam.town}
            team={activeGame.item.awayTeam}
          />
          <Text style={[styles.teamLogoNameText]}>
            {activeGame.item.awayTeam.nickname}
          </Text>
        </View>
      </View>
      <View style={[styles.scoreGrid]}>
        <Text
          style={[
            styles.scoreText,
            styles.awayScoreText,
            (activeGame.item.awayTeamScore || 0) >=
            (activeGame.item.homeTeamScore || 0)
              ? styles.winningScoreText
              : {},
          ]}>
          {activeGame.item.awayTeamScore}
        </Text>
      </View>
      <View style={[styles.stateIconsGrid]}>
        <View style={[styles.stateIconsColumn]}>
          {activeGame.item.offenseTeamId === activeGame.item.awayTeamId ? (
            <FontAwesome5Icon
              name="football-ball"
              color={theme.colors.brown}
              size={14}
              style={[styles.stateIcon]}
            />
          ) : (
            <></>
          )}
          {activeGame.item.actingTeamId === activeGame.item.awayTeamId ? (
            <FontAwesome5Icon
              name="play"
              color={theme.colors.text}
              size={10}
              style={[styles.stateIcon, styles.rotatedIcon]}
            />
          ) : (
            <></>
          )}
        </View>
      </View>
      <View style={[styles.stateGrid]}>
        <Text style={[styles.stateText]}>
          {GameEngine.getPeriodName(activeGame.item.period || 0)}
          {' - '}
          {GameEngine.formatGameTime(activeGame.item.timeRemaining || 0)}
          {'\n'}
          {activeGame.item.state === GameState.Kickoff ||
          activeGame.item.state === GameState.KickoffReturn
            ? 'Kickoff'
            : `${activeGame.item.down} & ${activeGame.item.distance}`}
        </Text>
      </View>
      <View style={[styles.stateIconsGrid]}>
        <View style={[styles.stateIconsColumn]}>
          {activeGame.item.offenseTeamId === activeGame.item.homeTeamId ? (
            <FontAwesome5Icon
              name="football-ball"
              color={theme.colors.brown}
              size={14}
              style={[styles.stateIcon]}
            />
          ) : (
            <></>
          )}
          {activeGame.item.actingTeamId === activeGame.item.homeTeamId ? (
            <FontAwesome5Icon
              name="play"
              color={theme.colors.text}
              size={10}
              style={[styles.stateIcon]}
            />
          ) : (
            <></>
          )}
        </View>
      </View>
      <View style={[styles.scoreGrid]}>
        <Text
          style={[
            styles.scoreText,
            styles.homeScoreText,
            (activeGame.item.awayTeamScore || 0) >=
            (activeGame.item.homeTeamScore || 0)
              ? styles.winningScoreText
              : {},
          ]}>
          {activeGame.item.awayTeamScore}
        </Text>
      </View>
      <View style={[styles.teamLogoGridLast]}>
        <View style={[styles.teamLogoColumn]}>
          <TeamAvatar
            town={activeGame.item.homeTeam.town}
            team={activeGame.item.homeTeam}
          />
          <Text style={[styles.teamLogoNameText]}>
            {activeGame.item.homeTeam.nickname}
          </Text>
        </View>
      </View>
    </View>
  );
};

export const GameDetailScoreboard = withTheme(Component);
