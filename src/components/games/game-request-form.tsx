import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {InjectedThemeProps, withTheme} from '../../hoc/with-theme';
import {Owner} from '../../services/owners';
import {Team} from '../../services/teams';
import {GamesStackParamList} from '../../stacks/games';
import {Button} from '../core/buttons/button';
import {SelectTrigger} from '../core/select/trigger';

interface Properties extends InjectedThemeProps {
  team?: Team;
  owner?: Owner;
  onSubmit: (team: Team, owner: Owner) => Promise<void>;
  navigation: NativeStackNavigationProp<GamesStackParamList>;
}

const Component: React.FC<Properties> = props => {
  const {team, owner, onSubmit, navigation, theme} = props;

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
        <Text style={[styles.sectionHeaderText]}>GAME OPTIONS</Text>
      </View>
      <SelectTrigger
        label="Team"
        value={team?.nickname}
        required
        onSelect={() => {
          navigation.navigate('Team Select', {
            selectedTeam: team,
            returnRoute: 'Game Request',
            returnParamKey: 'team',
          });
        }}
      />
      <View style={[styles.itemSeparator]} />
      <SelectTrigger
        label="Opponent"
        value={owner?.name}
        required
        onSelect={() => {
          navigation.navigate('Owner Select', {
            selectedOwner: owner,
            returnRoute: 'Game Request',
            returnParamKey: 'owner',
          });
        }}
      />
      <View style={[styles.sectionSeparator]} />
      <View style={[styles.buttonContainer]}>
        <Button
          text="Submit Game Request"
          activeColor={theme.colors.green}
          disabled={!team || !owner}
          onPress={async () => {
            if (team && owner) {
              await onSubmit(team, owner);
            }
          }}
        />
      </View>
    </View>
  );
};

export const GameRequestForm = withTheme(Component);
