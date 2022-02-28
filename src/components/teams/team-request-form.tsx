import React from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import {Form} from '../core/forms/form';
import {FormRow} from '../core/forms/row';
import {TextInputBox} from '../core/input/text-input-box';
import {SelectTrigger} from '../core/select/trigger';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {TeamsStackParamList} from '../../stacks/teams';
import {Nation} from '../../services/nations';
import {State} from '../../services/states';
import {Town} from '../../services/towns';
import {InjectedThemeProps, withTheme} from '../../hoc/with-theme';
import {Button} from '../core/buttons/button';

interface Properties extends InjectedThemeProps {
  nation?: Nation;
  state?: State;
  town?: Town;
  onSubmit: (town: Town, nickname: string) => Promise<void>;
  navigation: NativeStackNavigationProp<TeamsStackParamList>;
}

const Component: React.FC<Properties> = props => {
  const {nation, state, town, onSubmit, navigation, theme} = props;

  const [nickname, setNickname] = React.useState('');

  const isValidNickname = (input: string) => {
    const sentence = input.trim().replace(/[ ]+/, ' ').split(' ');

    const tokenResults = sentence.map((word: string) => {
      if (!/^[A-Z]{1}[a-z]+$/.test(word)) {
        return false;
      }
    });

    if (tokenResults.indexOf(false) !== -1) {
      return false;
    }

    return true;
  };

  const styles = StyleSheet.create({
    loadingContainer: {
      marginTop: 20,
    },
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
      color: theme.colors.text,
      ...theme.typography.footnote,
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
    doneIcon: {marginTop: 12},
    doneText: {color: theme.colors.green, marginBottom: 20, marginTop: 10},
  });

  return (
    <View style={[styles.container]}>
      <View style={[styles.sectionHeader]}>
        <Text style={[styles.sectionHeaderText]}>TEAM NAME</Text>
      </View>
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
              />
            </TextInputBox>
          </FormRow>
          <FormRow compact>
            <Text style={[styles.captionText]}>
              Must adhere to the following rules:{'\n'}• May not exceed 40
              characters.{'\n'}• May not contain numbers or punctuation.
              {'\n'}• Must be plural and proper case.{'\n'}• May not start with
              an article ("a", "an", "the").{'\n'}• May not start with a pronoun
              (e.g. "my").
              {'\n'}• May not cannot contain any offensive language.
              {'\n\n'}Valid examples include Blue Jays, Kings, and Flying Purple
              Elephants.
            </Text>
          </FormRow>
        </Form>
      </View>
      <View style={[styles.sectionSeparator]} />
      <View style={[styles.sectionHeader]}>
        <Text style={[styles.sectionHeaderText]}>LOCATION</Text>
      </View>
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
      <View style={[styles.itemSeparator]} />
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
      <View style={[styles.itemSeparator]} />
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
      <View style={[styles.sectionSeparator]} />
      <View style={[styles.buttonContainer]}>
        <Button
          text="Submit Team Request"
          activeColor={theme.colors.green}
          disabled={!nation || !state || !town || !isValidNickname(nickname)}
          onPress={async () => {
            if (town && isValidNickname(nickname)) {
              await onSubmit(town, nickname.trim().replace(/[ ]+/, ' '));
            }
          }}
        />
      </View>
    </View>
  );
};
export const TeamRequestForm = withTheme(Component);
