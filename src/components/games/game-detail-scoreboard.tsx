import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {InjectedThemeProps, withTheme} from '../../hoc/with-theme';
import {DataItemSegment} from '../../providers/data';
import {Game} from '../../services/games';

interface Properties extends InjectedThemeProps {
  activeGame: DataItemSegment<Game>;
}

const Component: React.FC<Properties> = props => {
  const {activeGame, theme} = props;

  const styles = StyleSheet.create({
    container: {
      height: 100,
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
    avatar: {
      borderWidth: 1,
      borderColor: theme.colors.separator,
      width: 34,
      height: 34,
      borderRadius: 17,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 3,
      backgroundColor: theme.colors.green,
    },
    avatarText: {
      ...theme.typography.caption2,
      color: theme.colors.white,
    },
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
          <View style={[styles.avatar]}>
            <Text style={[styles.avatarText]}>CC</Text>
          </View>
          <Text style={[styles.teamLogoNameText]}>
            {activeGame.item.awayTeam?.nickname}
          </Text>
        </View>
      </View>
      <View style={[styles.scoreGrid]}>
        <Text
          style={[
            styles.scoreText,
            styles.awayScoreText,
            activeGame.item.awayTeamScore >= activeGame.item.homeTeamScore
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
        <Text style={[styles.stateText]}>{activeGame.item.state}</Text>
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
            activeGame.item.awayTeamScore >= activeGame.item.homeTeamScore
              ? styles.winningScoreText
              : {},
          ]}>
          {activeGame.item.awayTeamScore}
        </Text>
      </View>
      <View style={[styles.teamLogoGridLast]}>
        <View style={[styles.teamLogoColumn]}>
          <View style={[styles.avatar]}>
            <Text style={[styles.avatarText]}>EE</Text>
          </View>
          <Text style={[styles.teamLogoNameText]}>
            {activeGame.item.homeTeam?.nickname}
          </Text>
        </View>
      </View>
    </View>
  );
};

export const GameDetailScoreboard = withTheme(Component);
