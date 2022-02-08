import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import uuid from 'react-native-uuid';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

import {useAuth} from '../../providers/auth';
import {useData} from '../../providers/data';
import {useTheme} from '../../providers/theme';
import {GameRequest, GameRequestsService} from '../../services/game-requests';
import {Owner} from '../../services/owners';
import {Team} from '../../services/teams';
import {GamesStackParamList} from '../../stacks/games';
import {Button} from '../core/buttons/button';
import {SectionListItemSeparator} from '../core/section-list/sectionlist-item-separator';
import {SelectTrigger} from '../core/select/trigger';
import {ErrorSnackbar} from '../core/snackbar/error';

type Properties = {
  team?: Team;
  owner?: Owner;
  navigation: NativeStackNavigationProp<GamesStackParamList>;
};

const Component: React.FC<Properties> = ({team, owner, navigation}) => {
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [gameRequest, setGameRequest] = React.useState<GameRequest>();
  const [error, setError] = React.useState('');

  const auth = useAuth();
  const {gameRequests} = useData();

  const createGameRequest = async () => {
    setIsProcessing(true);
    try {
      const newGameRequest = await new GameRequestsService().create({
        id: uuid.v4() as string,
        ownerId: auth.owner?.id as string,
        teamId: team?.id as string,
        invitedOwnerId: owner?.id as string,
        status: 'Submitted',
      });

      await gameRequests.refresh();
      setGameRequest(newGameRequest);
    } catch (e) {
      setError((e as Error).message);
    }
  };

  const theme = useTheme();
  const styles = StyleSheet.create({
    loadingContainer: {marginTop: 20},
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      backgroundColor: theme.colors.background,
      borderTopWidth: 1,
      borderTopColor: theme.colors.separator,
    },
    sectionHeader: {
      backgroundColor: theme.colors.secondaryBackground,
      color: theme.colors.secondaryText,
      ...theme.typography.subheading,
      paddingLeft: 10,
      marginTop: 0,
      marginBottom: 0,
      paddingTop: 10,
      paddingBottom: 3,
      textAlignVertical: 'bottom',
    },
    buttonContainer: {
      marginTop: 20,
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
    <>
      {isProcessing ? (
        gameRequest ? (
          <View style={[styles.doneContainer]}>
            <View style={[styles.doneIconRow]}>
              <View style={[styles.doneCircle]}>
                <FontAwesome5Icon
                  style={[styles.doneIcon]}
                  name="check"
                  color={theme.colors.green}
                  size={24}
                />
              </View>
            </View>
            <Button
              text="Complete!"
              activeColor={theme.colors.green}
              onPress={() => {
                navigation.goBack();
              }}
            />
          </View>
        ) : (
          <ActivityIndicator style={[styles.loadingContainer]} />
        )
      ) : (
        <View style={[styles.container]}>
          <Text style={[styles.sectionHeader]}>REQUEST PARAMETERS</Text>
          <SectionListItemSeparator />
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
          <SectionListItemSeparator />
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
          <SectionListItemSeparator />
          <View style={[styles.buttonContainer]}>
            <Button
              text="Submit Game Request"
              activeColor={theme.colors.green}
              disabled={!team || !owner}
              onPress={() => {
                createGameRequest();
              }}
            />
          </View>
        </View>
      )}
      <ErrorSnackbar
        text={error}
        visible={error.length > 0}
        onDismiss={() => {
          setError('');
        }}
      />
    </>
  );
};

export {Component as GameRequestForm};
