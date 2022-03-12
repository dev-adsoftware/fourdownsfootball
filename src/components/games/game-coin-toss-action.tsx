import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {InjectedThemeProps, withTheme} from '../../hoc/with-theme';
import {GameDetailExtendedTeamSnapshotDto} from '../../services/dtos/queries/game-detail/game-detail-query-response.dto';
import {Card} from '../core/cards/card';
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

      justifyContent: 'space-evenly',
      alignItems: 'center',
    },
  });

  return (
    <View style={[styles.container]}>
      <Card heading="YOUR TURN">
        <View style={[styles.coinActionHeader]}>
          <Text style={[styles.coinActionHeaderText]}>Choose coin face</Text>
        </View>
        <View style={[styles.coinList]}>
          <GameCoin crownShield="crown" onSelect={async () => {}} />
          <Text>- OR -</Text>
          <GameCoin crownShield="shield" onSelect={async () => {}} />
        </View>
      </Card>
    </View>
  );
};

export const GameCoinTossAction = withTheme(Component);
