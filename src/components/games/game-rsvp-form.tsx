import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {InjectedThemeProps, withTheme} from '../../hoc/with-theme';
import {OwnerDashboardExtendedTeamDto} from '../../services/dtos/queries/owner-dashboard/owner-dashboard-query-response.dto';
import {GamesStackParamList} from '../../stacks/games';
import {Button} from '../core/buttons/button';
import {SelectTrigger} from '../core/select/trigger';

interface Properties extends InjectedThemeProps {
  team?: OwnerDashboardExtendedTeamDto;
  isProcessing?: boolean;
  onSubmit: (team: OwnerDashboardExtendedTeamDto) => Promise<void>;
  navigation: NativeStackNavigationProp<GamesStackParamList>;
}

const Component: React.FC<Properties> = props => {
  const {team, isProcessing = false, onSubmit, navigation, theme} = props;

  const styles = StyleSheet.create({
    loadingContainer: {marginTop: 20},
    container: {
      backgroundColor: theme.colors.background,
      marginTop: 5,
      marginHorizontal: 3,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: theme.colors.separator,
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowRadius: 3,
      shadowOffset: {width: 0, height: 3},
      elevation: 3,
      // padding: 15,
    },
    sectionHeader: {
      backgroundColor: theme.colors.secondaryBackground,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.separator,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
    },
    sectionHeaderText: {
      color: theme.colors.text,
      ...theme.typography.subheading,
      paddingTop: 10,
      paddingLeft: 10,
      paddingBottom: 3,
    },
    sectionSeparator: {height: 1, backgroundColor: theme.colors.separator},
    itemSeparator: {
      height: 1,
      backgroundColor: theme.colors.separator,
      marginLeft: 10,
    },
    buttonContainer: {
      marginVertical: 20,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    doneContainer: {padding: 20, alignItems: 'center'},
    doneCircle: {
      borderWidth: 2,
      borderColor: theme.colors.green,
      width: 50,
      height: 50,
      borderRadius: 25,
      alignItems: 'center',
      marginVertical: 10,
    },
    doneIconRow: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 30,
    },
    doneIcon: {marginTop: 12},
    doneText: {color: theme.colors.green, marginBottom: 20, marginTop: 10},
  });

  return (
    <View style={[styles.container]}>
      <View style={[styles.sectionHeader]}>
        <Text style={[styles.sectionHeaderText]}>SELECT TEAM</Text>
      </View>
      <SelectTrigger
        label="Team"
        value={team?.nickname}
        required
        onSelect={() => {
          navigation.navigate('Team Select', {
            selectedTeam: team,
            returnRoute: 'Game RSVP',
            returnParamKey: 'team',
          });
        }}
      />
      <View style={[styles.sectionSeparator]} />
      <View style={[styles.buttonContainer]}>
        <Button
          text="Accept Invitation"
          activeColor={theme.colors.green}
          isLoading={isProcessing}
          disabled={!team}
          onPress={async () => {
            if (team) {
              await onSubmit(team);
            }
          }}
        />
      </View>
    </View>
  );
};

export const GameRSVPForm = withTheme(Component);
