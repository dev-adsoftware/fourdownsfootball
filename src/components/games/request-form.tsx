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
import {RequestGameStackParamList} from '../../stacks/games-tab/request';
import {Button} from '../core/buttons/button';
import {SectionListItemSeparator} from '../core/section-list/sectionlist-item-separator';
import {SectionListSectionSeparator} from '../core/section-list/sectionlist-section-separator';
import {SelectTrigger} from '../core/select/trigger';
import {ErrorSnackbar} from '../core/snackbar/error';

type Properties = {
  team?: Team;
  owner?: Owner;
  // onPressSelectTeam: (selectedTeam?: Team) => void;
  // onPressSelectOwner: (selectedOwner?: Owner) => void;
  // onDismiss: () => void;
  navigation: NativeStackNavigationProp<RequestGameStackParamList>;
};

const Component: React.FC<Properties> = ({
  team,
  owner,
  // onPressSelectTeam,
  // onPressSelectOwner,
  // onDismiss,
  navigation,
}) => {
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
        teamId: '',
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
      fontSize: 12,
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
          <ActivityIndicator />
        )
      ) : (
        <View style={[styles.container]}>
          <Text style={[styles.sectionHeader]}>REQUEST PARAMETERS</Text>
          <SectionListSectionSeparator />
          <SelectTrigger
            label="Team"
            value={team?.nickname}
            required
            onSelect={() => {
              // onPressSelectTeam(team);
              navigation.navigate('Select Team', {selectedTeam: team});
            }}
          />
          <SectionListItemSeparator />
          <SelectTrigger
            label="Opponent"
            value={owner?.name}
            required
            onSelect={() => {
              // onPressSelectOwner(owner);
              navigation.navigate('Select Owner', {selectedOwner: owner});
            }}
          />
          <SectionListSectionSeparator />
          <View style={[styles.buttonContainer]}>
            <Button
              text="Submit Game Request"
              activeColor={theme.colors.green}
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
