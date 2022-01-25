import React from 'react';
import {
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {useTheme} from '../../providers/theme';
import {ComponentCarousel} from '../core/carousels/component';
import {Button} from '../core/buttons/button';
import {Form} from '../core/forms/form';
import {FormRow} from '../core/forms/row';
import {TextInputBox} from '../core/input/text-input-box';
import {SectionListItemSeparator} from '../core/section-list/sectionlist-item-separator';
import {SectionListSectionSeparator} from '../core/section-list/sectionlist-section-separator';
// import {useTheme} from '../../providers/theme';
import {Nation} from '../../services/nations';
import {Stepper} from '../stepper';
import {State} from '../../services/states';
import {Town} from '../../services/towns';
import {ErrorSnackbar} from '../core/snackbar/error';
import {Color} from './select-color-input';

type Properties = {
  nation?: Nation;
  state?: State;
  town?: Town;
  primaryColor?: Color;
  secondaryColor?: Color;
  stripeColor?: Color;
  teamEmphasis?: string;
  offenseStyle?: string;
  defenseStyle?: string;
  onPressSelectNation: (selectedNation?: Nation) => void;
  onPressSelectState: (nationId: string, selectedState?: State) => void;
  onPressSelectTown: (stateId: string, selectedTown?: Town) => void;
  onPressSelectPrimaryColor: (selectedColor?: Color) => void;
  onPressSelectSecondaryColor: (selectedColor?: Color) => void;
  onPressSelectStripeColor: (selectedColor?: Color) => void;
  onPressSelectTeamEmphasis: (selectedTeamEmphasis?: string) => void;
  onPressSelectOffenseStyle: (selectedOffenseStyle?: string) => void;
  onPressSelectDefenseStyle: (selectedDefenseStyle?: string) => void;
};

const Component: React.FC<Properties> = ({
  nation,
  state,
  town,
  primaryColor,
  secondaryColor,
  stripeColor,
  teamEmphasis,
  offenseStyle,
  defenseStyle,
  onPressSelectNation,
  onPressSelectState,
  onPressSelectTown,
  onPressSelectPrimaryColor,
  onPressSelectSecondaryColor,
  onPressSelectStripeColor,
  onPressSelectTeamEmphasis,
  onPressSelectOffenseStyle,
  onPressSelectDefenseStyle,
}) => {
  const [activeStep, setActiveStep] = React.useState('location');
  const [nickname, setNickname] = React.useState('');
  const [isValidNickname, setIsValidNickname] = React.useState(false);
  const [error, setError] = React.useState('');
  const [isProcessing, setIsProcessing] = React.useState(false);

  const onPrev = () => {
    if (activeStep === 'verify') {
      setActiveStep('roster');
    } else if (activeStep === 'roster') {
      setActiveStep('branding');
    } else if (activeStep === 'branding') {
      setActiveStep('location');
    }
  };

  const onNext = () => {
    if (activeStep === 'location') {
      setActiveStep('branding');
    } else if (activeStep === 'branding') {
      setActiveStep('roster');
    } else if (activeStep === 'roster') {
      setActiveStep('verify');
    }
  };

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

  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      width: '100%',
      backgroundColor: theme.colors.background,
      // borderTopWidth: 3,
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
    itemRow: {
      backgroundColor: theme.colors.background,
      paddingLeft: 10,
      paddingVertical: 10,
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 0,
    },
    itemRowInput: {marginRight: 10},
    itemSelectContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    itemGrid: {
      flex: 1,
      color: theme.colors.text,
    },
    itemGridDisabled: {
      color: theme.colors.secondaryText,
    },
    itemGridRight: {
      alignItems: 'flex-end',
      marginRight: 15,
    },
    itemSelectText: {
      marginRight: 20,
      color: theme.colors.secondaryText,
    },
    textInput: {
      color: theme.colors.text,
    },
    captionText: {
      color: theme.colors.secondaryText,
      fontSize: 10,
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
  });

  return (
    <>
      {isProcessing ? (
        <>
          <View style={{padding: 20}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: theme.colors.green,
                  width: 20,
                  height: 20,
                  marginRight: 10,
                  borderRadius: 10,
                  alignItems: 'center',
                  paddingTop: 3,
                }}>
                <FontAwesome5Icon name="check" color={theme.colors.green} />
              </View>
              <Text>Submitted team creation request</Text>
            </View>
            <View
              style={{
                width: 1,
                backgroundColor: theme.colors.green,
                height: 20,
                marginLeft: 9,
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: theme.colors.blue,
                  width: 20,
                  height: 20,
                  marginRight: 10,
                  borderRadius: 10,
                }}
              />
              <Text style={{color: theme.colors.text}}>
                Team creation request accepted
              </Text>
            </View>
            <View
              style={{
                width: 1,
                backgroundColor: theme.colors.placeholderText,
                height: 20,
                marginLeft: 9,
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: theme.colors.placeholderText,
                  width: 20,
                  height: 20,
                  marginRight: 10,
                  borderRadius: 10,
                }}
              />
              <Text style={{color: theme.colors.placeholderText}}>
                Creating roster
              </Text>
            </View>
            <View
              style={{
                width: 1,
                backgroundColor: theme.colors.placeholderText,
                height: 20,
                marginLeft: 9,
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: theme.colors.placeholderText,
                  width: 20,
                  height: 20,
                  marginRight: 10,
                  borderRadius: 10,
                }}
              />
              <Text style={{color: theme.colors.placeholderText}}>
                Roster created successfully
              </Text>
            </View>
            <View
              style={{
                width: 1,
                backgroundColor: theme.colors.placeholderText,
                height: 20,
                marginLeft: 9,
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: theme.colors.placeholderText,
                  width: 20,
                  height: 20,
                  marginRight: 10,
                  borderRadius: 10,
                }}
              />
              <Text style={{color: theme.colors.placeholderText}}>
                Searching for league assignment
              </Text>
            </View>
            <View
              style={{
                width: 1,
                backgroundColor: theme.colors.placeholderText,
                height: 20,
                marginLeft: 9,
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: theme.colors.placeholderText,
                  width: 20,
                  height: 20,
                  marginRight: 10,
                  borderRadius: 10,
                }}
              />
              <Text style={{color: theme.colors.placeholderText}}>
                League assignment complete
              </Text>
            </View>
            <View
              style={{
                width: 1,
                backgroundColor: theme.colors.placeholderText,
                height: 20,
                marginLeft: 9,
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: theme.colors.placeholderText,
                  width: 20,
                  height: 20,
                  marginRight: 10,
                  borderRadius: 10,
                }}
              />
              <Text style={{color: theme.colors.placeholderText}}>Done!</Text>
            </View>
            <ActivityIndicator style={{marginTop: 40}} size="large" />
          </View>
        </>
      ) : (
        <>
          <Stepper
            steps={[
              {
                label: 'Location',
                state:
                  activeStep === 'location'
                    ? 'active'
                    : nation
                    ? 'complete'
                    : 'inactive',
              },
              {
                label: 'Branding',
                state:
                  activeStep === 'branding'
                    ? 'active'
                    : isValidNickname && primaryColor
                    ? 'complete'
                    : 'inactive',
              },
              {
                label: 'Roster',
                state:
                  activeStep === 'roster'
                    ? 'active'
                    : teamEmphasis && offenseStyle && defenseStyle
                    ? 'complete'
                    : 'inactive',
              },
              {
                label: 'Verify',
                state: activeStep === 'verify' ? 'active' : 'inactive',
              },
            ]}
          />

          <ComponentCarousel
            items={[
              {
                id: 0,
                component: (
                  <View style={[styles.container]}>
                    <Text style={[styles.sectionHeader]}>LOCATION</Text>
                    <SectionListSectionSeparator />
                    <Pressable
                      onPress={() => {
                        onPressSelectNation(nation);
                      }}>
                      <View style={[styles.itemRow]}>
                        <Text style={[styles.itemGrid]}>Country</Text>
                        <View style={[styles.itemGridRight]}>
                          <View style={[styles.itemSelectContainer]}>
                            <Text style={[styles.itemSelectText]}>
                              {nation?.name || 'Required'}
                            </Text>
                            <FontAwesome5Icon
                              name="chevron-right"
                              color={theme.colors.secondaryText}
                            />
                          </View>
                        </View>
                      </View>
                    </Pressable>
                    <SectionListItemSeparator />
                    <Pressable
                      disabled={!nation}
                      onPress={() => {
                        onPressSelectState(nation?.id as string, state);
                      }}>
                      <View style={[styles.itemRow]}>
                        <Text
                          style={[
                            styles.itemGrid,
                            !nation ? styles.itemGridDisabled : {},
                          ]}>
                          State
                        </Text>
                        <View style={[styles.itemGridRight]}>
                          <View style={[styles.itemSelectContainer]}>
                            <Text style={[styles.itemSelectText]}>
                              {state?.name || 'Required'}
                            </Text>
                            <FontAwesome5Icon
                              name="chevron-right"
                              color={theme.colors.secondaryText}
                            />
                          </View>
                        </View>
                      </View>
                    </Pressable>
                    <SectionListItemSeparator />
                    <Pressable
                      disabled={!nation}
                      onPress={() => {
                        onPressSelectTown(state?.id as string, town);
                      }}>
                      <View style={[styles.itemRow]}>
                        <Text
                          style={[
                            styles.itemGrid,
                            !state ? styles.itemGridDisabled : {},
                          ]}>
                          City
                        </Text>
                        <View style={[styles.itemGridRight]}>
                          <View style={[styles.itemSelectContainer]}>
                            <Text style={[styles.itemSelectText]}>
                              {town?.name || 'Required'}
                            </Text>
                            <FontAwesome5Icon
                              name="chevron-right"
                              color={theme.colors.secondaryText}
                            />
                          </View>
                        </View>
                      </View>
                    </Pressable>
                    <SectionListSectionSeparator />
                  </View>
                ),
              },
              {
                id: 1,
                component: (
                  <View style={[styles.container]}>
                    <Text style={[styles.sectionHeader]}>NICKNAME</Text>
                    <SectionListSectionSeparator />

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
                            Must adhere to the following rules:{'\n'}• May not
                            exceed 40 characters.{'\n'}• May not contain numbers
                            or punctuation.
                            {'\n'}• Must be plural and proper case.{'\n'}• May
                            not start with an article ("a", "an", "the").{'\n'}•
                            May not start with a pronoun (e.g. "my").
                            {'\n'}• May not cannot contain any offensive
                            language.
                            {'\n\n'}Valid examples include Blue Jays, Kings, and
                            Flying Purple Elephants.
                          </Text>
                        </FormRow>
                      </Form>
                    </View>
                    <SectionListSectionSeparator />
                    <Text style={[styles.sectionHeader]}>COLORS</Text>
                    <SectionListSectionSeparator />
                    <Pressable
                      onPress={() => {
                        onPressSelectPrimaryColor(primaryColor);
                      }}>
                      <View style={[styles.itemRow]}>
                        <Text style={[styles.itemGrid]}>Primary Color</Text>
                        <View style={[styles.itemGridRight]}>
                          <View style={[styles.itemSelectContainer]}>
                            <Text style={[styles.itemSelectText]}>
                              {primaryColor?.name || 'Required'}
                            </Text>
                            <FontAwesome5Icon
                              name="chevron-right"
                              color={theme.colors.secondaryText}
                            />
                          </View>
                        </View>
                      </View>
                    </Pressable>
                    <SectionListItemSeparator />
                    <Pressable
                      onPress={() => {
                        onPressSelectSecondaryColor(secondaryColor);
                      }}>
                      <View style={[styles.itemRow]}>
                        <Text style={[styles.itemGrid]}>Secondary Color</Text>
                        <View style={[styles.itemGridRight]}>
                          <View style={[styles.itemSelectContainer]}>
                            <Text style={[styles.itemSelectText]}>
                              {secondaryColor?.name || 'Optional'}
                            </Text>
                            <FontAwesome5Icon
                              name="chevron-right"
                              color={theme.colors.secondaryText}
                            />
                          </View>
                        </View>
                      </View>
                    </Pressable>
                    <SectionListItemSeparator />
                    <Pressable
                      onPress={() => {
                        onPressSelectStripeColor(stripeColor);
                      }}>
                      <View style={[styles.itemRow]}>
                        <Text style={[styles.itemGrid]}>Stripe Color</Text>
                        <View style={[styles.itemGridRight]}>
                          <View style={[styles.itemSelectContainer]}>
                            <Text style={[styles.itemSelectText]}>
                              {stripeColor?.name || 'Optional'}
                            </Text>
                            <FontAwesome5Icon
                              name="chevron-right"
                              color={theme.colors.secondaryText}
                            />
                          </View>
                        </View>
                      </View>
                    </Pressable>
                    <SectionListSectionSeparator />
                  </View>
                ),
              },
              {
                id: 2,
                component: (
                  <View style={[styles.container]}>
                    <Text style={[styles.sectionHeader]}>
                      ROSTER PREFERENCES
                    </Text>
                    <SectionListSectionSeparator />
                    <Pressable
                      onPress={() => {
                        onPressSelectTeamEmphasis(teamEmphasis);
                      }}>
                      <View style={[styles.itemRow]}>
                        <Text style={[styles.itemGrid]}>Team Emphasis</Text>
                        <View style={[styles.itemGridRight]}>
                          <View style={[styles.itemSelectContainer]}>
                            <Text style={[styles.itemSelectText]}>
                              {teamEmphasis}
                            </Text>
                            <FontAwesome5Icon
                              name="chevron-right"
                              color={theme.colors.secondaryText}
                            />
                          </View>
                        </View>
                      </View>
                    </Pressable>
                    <SectionListItemSeparator />
                    <Pressable
                      onPress={() => {
                        onPressSelectOffenseStyle(offenseStyle);
                      }}>
                      <View style={[styles.itemRow]}>
                        <Text style={[styles.itemGrid]}>Offense Style</Text>
                        <View style={[styles.itemGridRight]}>
                          <View style={[styles.itemSelectContainer]}>
                            <Text style={[styles.itemSelectText]}>
                              {offenseStyle}
                            </Text>
                            <FontAwesome5Icon
                              name="chevron-right"
                              color={theme.colors.secondaryText}
                            />
                          </View>
                        </View>
                      </View>
                    </Pressable>
                    <SectionListItemSeparator />
                    <Pressable
                      onPress={() => {
                        onPressSelectDefenseStyle(defenseStyle);
                      }}>
                      <View style={[styles.itemRow]}>
                        <Text style={[styles.itemGrid]}>Defense Style</Text>
                        <View style={[styles.itemGridRight]}>
                          <View style={[styles.itemSelectContainer]}>
                            <Text style={[styles.itemSelectText]}>
                              {defenseStyle}
                            </Text>
                            <FontAwesome5Icon
                              name="chevron-right"
                              color={theme.colors.secondaryText}
                            />
                          </View>
                        </View>
                      </View>
                    </Pressable>
                    <SectionListSectionSeparator />
                  </View>
                ),
              },
              {
                id: 3,
                component: (
                  <View style={[styles.container]}>
                    <Text style={[styles.sectionHeader]}>REVIEW</Text>
                    <SectionListSectionSeparator />
                    <Form compact>
                      <FormRow compact>
                        <View style={[styles.verifySectionRow]}>
                          <FontAwesome5Icon
                            style={[styles.verifyIcon]}
                            name={nation && state && town ? 'check' : 'times'}
                            color={
                              nation && state && town
                                ? theme.colors.green
                                : theme.colors.error
                            }
                          />
                          <Text style={[styles.verifyText]}>Location</Text>
                        </View>
                        <View style={[styles.verifySubsectionRow]}>
                          <FontAwesome5Icon
                            style={[styles.verifyIcon]}
                            name={nation ? 'check' : 'times'}
                            color={
                              nation ? theme.colors.green : theme.colors.error
                            }
                          />
                          <Text style={[styles.verifyText]}>
                            {nation?.name || 'Country required'}
                          </Text>
                        </View>
                        <View style={[styles.verifySubsectionRow]}>
                          <FontAwesome5Icon
                            style={[styles.verifyIcon]}
                            name={state ? 'check' : 'times'}
                            color={
                              state ? theme.colors.green : theme.colors.error
                            }
                          />
                          <Text style={[styles.verifyText]}>
                            {state?.name || 'State required'}
                          </Text>
                        </View>
                        <View style={[styles.verifySubsectionRow]}>
                          <FontAwesome5Icon
                            style={[styles.verifyIcon]}
                            name={town ? 'check' : 'times'}
                            color={
                              town ? theme.colors.green : theme.colors.error
                            }
                          />
                          <Text style={[styles.verifyText]}>
                            {town?.name || 'City required'}
                          </Text>
                        </View>
                        <View style={[styles.verifySectionRow]}>
                          <FontAwesome5Icon
                            style={[styles.verifyIcon]}
                            name={
                              isValidNickname && primaryColor
                                ? 'check'
                                : 'times'
                            }
                            color={
                              isValidNickname && primaryColor
                                ? theme.colors.green
                                : theme.colors.error
                            }
                          />
                          <Text style={[styles.verifyText]}>Branding</Text>
                        </View>
                        <View style={[styles.verifySubsectionRow]}>
                          <FontAwesome5Icon
                            style={[styles.verifyIcon]}
                            name={isValidNickname ? 'check' : 'times'}
                            color={
                              isValidNickname
                                ? theme.colors.green
                                : theme.colors.error
                            }
                          />
                          <Text style={[styles.verifyText]}>
                            {isValidNickname
                              ? nickname
                              : `Invalid nickname ${nickname}`}
                          </Text>
                        </View>
                        <View style={[styles.verifySubsectionRow]}>
                          <FontAwesome5Icon
                            style={[styles.verifyIcon]}
                            name={primaryColor ? 'check' : 'times'}
                            color={
                              primaryColor
                                ? theme.colors.green
                                : theme.colors.error
                            }
                          />
                          <Text style={[styles.verifyText]}>
                            {primaryColor
                              ? `${primaryColor.name} primary color`
                              : 'Primary color required'}
                          </Text>
                        </View>
                        {secondaryColor && secondaryColor.name !== 'None' ? (
                          <View style={[styles.verifySubsectionRow]}>
                            <FontAwesome5Icon
                              style={[styles.verifyIcon]}
                              name="check"
                              color={theme.colors.green}
                            />
                            <Text style={[styles.verifyText]}>
                              {secondaryColor?.name} secondary color
                            </Text>
                          </View>
                        ) : (
                          <></>
                        )}
                        {stripeColor && stripeColor.name !== 'None' ? (
                          <View style={[styles.verifySubsectionRow]}>
                            <FontAwesome5Icon
                              style={[styles.verifyIcon]}
                              name="check"
                              color={theme.colors.green}
                            />
                            <Text style={[styles.verifyText]}>
                              {stripeColor?.name} stripe color
                            </Text>
                          </View>
                        ) : (
                          <></>
                        )}
                        <View style={[styles.verifySectionRow]}>
                          <FontAwesome5Icon
                            style={[styles.verifyIcon]}
                            name="check"
                            color={
                              teamEmphasis && offenseStyle && defenseStyle
                                ? theme.colors.green
                                : theme.colors.error
                            }
                          />
                          <Text style={[styles.verifyText]}>
                            Roster Preferences
                          </Text>
                        </View>
                        <View style={[styles.verifySubsectionRow]}>
                          <FontAwesome5Icon
                            style={[styles.verifyIcon]}
                            name={teamEmphasis ? 'check' : 'times'}
                            color={
                              teamEmphasis
                                ? theme.colors.green
                                : theme.colors.error
                            }
                          />
                          <Text style={[styles.verifyText]}>
                            {teamEmphasis
                              ? `${teamEmphasis} team emphasis`
                              : 'Team emphasis required'}
                          </Text>
                        </View>
                        <View style={[styles.verifySubsectionRow]}>
                          <FontAwesome5Icon
                            style={[styles.verifyIcon]}
                            name={offenseStyle ? 'check' : 'times'}
                            color={
                              offenseStyle
                                ? theme.colors.green
                                : theme.colors.error
                            }
                          />
                          <Text style={[styles.verifyText]}>
                            {offenseStyle
                              ? `${offenseStyle} offense style`
                              : 'Offense style required'}
                          </Text>
                        </View>
                        <View style={[styles.verifySubsectionRow]}>
                          <FontAwesome5Icon
                            style={[styles.verifyIcon]}
                            name={defenseStyle ? 'check' : 'times'}
                            color={
                              defenseStyle
                                ? theme.colors.green
                                : theme.colors.error
                            }
                          />
                          <Text style={[styles.verifyText]}>
                            {defenseStyle
                              ? `${defenseStyle} defense style`
                              : 'Defense style required'}
                          </Text>
                        </View>
                      </FormRow>
                    </Form>
                  </View>
                ),
              },
            ]}
            lastButton={
              <Button
                disabled={
                  !nation ||
                  !state ||
                  !town ||
                  !isValidNickname ||
                  !primaryColor
                }
                activeColor={theme.colors.green}
                isLoading={isProcessing}
                compact
                text="Create"
                iconRight="caret-up"
                onPress={() => {
                  setIsProcessing(true);
                }}
              />
            }
            showDisabledButtons={false}
            onPrev={() => {
              onPrev();
            }}
            onNext={() => {
              onNext();
            }}
          />
          <ErrorSnackbar
            text={error}
            visible={error.length > 0}
            onDismiss={() => {
              setError('');
            }}
          />
        </>
      )}
    </>
  );
};
export {Component as CreateTeamStepper};
