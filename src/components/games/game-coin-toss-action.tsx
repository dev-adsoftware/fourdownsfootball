import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {InjectedThemeProps, withTheme} from '../../hoc/with-theme';
import {GameDetailExtendedTeamSnapshotDto} from '../../services/dtos/queries/game-detail/game-detail-query-response.dto';
import {GameActionHeader} from './game-action-header';
import {GameCoin} from './game-coin';

interface Properties extends InjectedThemeProps {
  actingTeam: GameDetailExtendedTeamSnapshotDto;
}

const Component: React.FC<Properties> = props => {
  const {actingTeam, theme} = props;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
    },
    actionContainer: {
      backgroundColor: theme.colors.background,
      marginTop: 5,
      marginHorizontal: 10,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: theme.colors.separator,
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowRadius: 3,
      shadowOffset: {width: 0, height: 3},
      elevation: 3,
      padding: 15,
    },
    groupHeader: {
      paddingBottom: 10,
      marginBottom: 10,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.separator,
    },
    groupHeaderText: {
      ...theme.typography.footnote,
      color: theme.colors.text,
      fontWeight: 'bold',
      letterSpacing: 1,
    },
    coinActionHeader: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: 5,
    },
    coinActionHeaderText: {
      ...theme.typography.subheading,
    },
    coinList: {
      flexDirection: 'row',
      //   paddingTop: 30,
      justifyContent: 'space-evenly',
      alignItems: 'center',
    },
  });

  return (
    <>
      <View style={[styles.container]}>
        <View style={[styles.actionContainer]}>
          <View style={[styles.groupHeader]}>
            <Text style={[styles.groupHeaderText]}>YOUR TURN</Text>
          </View>
          {/* <GameActionHeader
            actingTeam={actingTeam}
            text="Select crown or shield."
          /> */}
          <View style={[styles.coinActionHeader]}>
            <Text style={[styles.coinActionHeaderText]}>Choose coin face</Text>
          </View>
          <View style={[styles.coinList]}>
            <GameCoin crownShield="crown" onSelect={async () => {}} />
            <Text>- OR -</Text>
            <GameCoin crownShield="shield" onSelect={async () => {}} />
          </View>
        </View>
      </View>
    </>
  );
};

export const GameCoinTossAction = withTheme(Component);
