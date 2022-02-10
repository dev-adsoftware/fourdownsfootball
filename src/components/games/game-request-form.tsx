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
