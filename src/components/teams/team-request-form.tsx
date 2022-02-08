import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import uuid from 'react-native-uuid';
import {useTheme} from '../../providers/theme';
import {Button} from '../core/buttons/button';
import {Form} from '../core/forms/form';
import {FormRow} from '../core/forms/row';
import {TextInputBox} from '../core/input/text-input-box';
import {SectionListItemSeparator} from '../core/section-list/sectionlist-item-separator';
import {ErrorSnackbar} from '../core/snackbar/error';
import {TeamRequest, TeamRequestsService} from '../../services/team-requests';
import {useAuth} from '../../providers/auth';
import {useData} from '../../providers/data';
import {SelectTrigger} from '../core/select/trigger';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {TeamsStackParamList} from '../../stacks/teams';
import {Nation} from '../../services/nations';
import {State} from '../../services/states';
import {Town} from '../../services/towns';

type Properties = {
  nation?: Nation;
  state?: State;
  town?: Town;
  navigation: NativeStackNavigationProp<TeamsStackParamList>;
};

const Component: React.FC<Properties> = ({nation, state, town, navigation}) => {
  const [nickname, setNickname] = React.useState('');
  const [isValidNickname, setIsValidNickname] = React.useState(false);
  const [error, setError] = React.useState('');
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [teamRequest, setTeamRequest] = React.useState<TeamRequest>();

  const {teams} = useData();

  const validateNickname = (input: string) => {
    const sentence = input.trim().replace(/[ ]+/, ' ').split(' ');

    const tokenResults = sentence.map((word: string) => {
      if (!/^[A-Z]{1}[a-z]+$/.test(word)) {
        return false;
      }
    });

    if (tokenResults.indexOf(false) !== -1) {
      throw Error('Invalid Nickname');
    }

    return sentence.join(' ');
  };

  const auth = useAuth();

  const createTeamRequest = async () => {
    setIsProcessing(true);
    try {
      if (!isValidNickname) {
        setIsProcessing(false);
        throw Error('Invalid nickname');
      }

      const newTeamRequest = await new TeamRequestsService().create({
        id: uuid.v4() as string,
        ownerId: auth.owner?.id as string,
        townId: town?.id as string,
        nickname: nickname,
        primaryColor: 'Green',
        teamEmphasis: 'Balanced',
        offenseStyle: 'Balanced',
        defenseStyle: 'Balanced',
      });

      teams.refresh();
      setTeamRequest(newTeamRequest);
    } catch (e) {
      setError((e as Error).message);
    }
  };

  const theme = useTheme();

  const styles = StyleSheet.create({
    loadingContainer: {
      marginTop: 20,
    },
    container: {
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
    itemRow: {
      backgroundColor: theme.colors.background,
      paddingLeft: 10,
      paddingVertical: 10,
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 0,
    },
    itemRowInput: {marginRight: 10},
    textInput: {
      color: theme.colors.text,
    },
    captionText: {
      color: theme.colors.secondaryText,
      ...theme.typography.caption1,
      paddingHorizontal: 10,
    },
    verifySectionRow: {
      backgroundColor: theme.colors.background,
      paddingLeft: 10,
      paddingTop: 8,
      paddingBottom: 2,
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 0,
    },
    verifySubsectionRow: {
      backgroundColor: theme.colors.background,
      paddingLeft: 30,
      paddingVertical: 1,
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 0,
    },
    verifyIcon: {width: 10, marginRight: 10},
    verifyText: {color: theme.colors.text},
    processingContainer: {padding: 20},
    processingIconRow: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 30,
    },
    processingText: {color: theme.colors.secondaryText, marginTop: 10},
    processingBar: {
      width: '80%',
      height: 5,
      borderWidth: 1,
      borderColor: theme.colors.separator,
      borderRadius: 10,
    },
    processingBarFill: {
      backgroundColor: theme.colors.blue,
      width: '50%',
      height: 3,
      borderRadius: 10,
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
    doneIcon: {marginTop: 12},
    doneText: {color: theme.colors.green, marginBottom: 20, marginTop: 10},
  });

  return (
    <>
      {isProcessing ? (
        <>
          {teamRequest ? (
            <View style={[styles.doneContainer]}>
              <View style={[styles.processingIconRow]}>
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
                onPress={async () => {
                  teams.refresh();
                  navigation.goBack();
                }}
              />
            </View>
          ) : (
            <ActivityIndicator style={[styles.loadingContainer]} />
          )}
        </>
      ) : (
        <>
          <View style={[styles.container]}>
            <Text style={[styles.sectionHeader]}>TEAM NAME</Text>
            <SectionListItemSeparator />

            <View style={[styles.itemRow, styles.itemRowInput]}>
              <Form compact>
                <FormRow compact>
                  <TextInputBox>
                    <TextInput
                      style={[styles.textInput]}
                      textAlign="left"
                      maxLength={40}
                      autoCapitalize="words"
                      returnKeyType="done"
                      placeholder="Nickname"
                      value={nickname}
                      onChangeText={(text: string) => setNickname(text)}
                      onSubmitEditing={({nativeEvent}) => {
                        try {
                          const validatedNickname = validateNickname(
                            nativeEvent.text,
                          );
                          setNickname(validatedNickname);
                          setIsValidNickname(true);
                        } catch (e) {
                          setError('Invalid nickname');
                          setIsValidNickname(false);
                        }
                      }}
                    />
                  </TextInputBox>
                </FormRow>
                <FormRow compact>
                  <Text style={[styles.captionText]}>
                    Must adhere to the following rules:{'\n'}• May not exceed 40
                    characters.{'\n'}• May not contain numbers or punctuation.
                    {'\n'}• Must be plural and proper case.{'\n'}• May not start
                    with an article ("a", "an", "the").{'\n'}• May not start
                    with a pronoun (e.g. "my").
                    {'\n'}• May not cannot contain any offensive language.
                    {'\n\n'}Valid examples include Blue Jays, Kings, and Flying
                    Purple Elephants.
                  </Text>
                </FormRow>
              </Form>
            </View>
            <SectionListItemSeparator />
            <Text style={[styles.sectionHeader]}>LOCATION</Text>
            <SectionListItemSeparator />
            <SelectTrigger
              label="Country"
              value={nation?.name}
              required
              onSelect={() => {
                navigation.navigate('Nation Select', {
                  selectedNation: nation,
                  returnRoute: 'Team Request',
                  returnParamKey: 'nation',
                });
              }}
            />
            <SectionListItemSeparator />
            <SelectTrigger
              label="State"
              disabled={!nation}
              value={state?.name}
              required
              onSelect={() => {
                navigation.navigate('State Select', {
                  nationId: nation?.id as string,
                  selectedState: state,
                  returnRoute: 'Team Request',
                  returnParamKey: 'state',
                });
              }}
            />
            <SectionListItemSeparator />
            <SelectTrigger
              label="City"
              disabled={!state}
              value={town?.name}
              required
              onSelect={() => {
                navigation.navigate('Town Select', {
                  stateId: state?.id as string,
                  selectedTown: town,
                  returnRoute: 'Team Request',
                  returnParamKey: 'town',
                });
              }}
            />
            <SectionListItemSeparator />
            <View style={[styles.buttonContainer]}>
              <Button
                text="Submit Team Request"
                activeColor={theme.colors.green}
                disabled={!nation || !state || !town || !isValidNickname}
                onPress={() => {
                  createTeamRequest();
                }}
              />
            </View>
          </View>
        </>
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
export {Component as TeamRequestForm};
