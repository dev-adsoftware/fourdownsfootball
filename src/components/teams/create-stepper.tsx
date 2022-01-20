import React from 'react';
import {StyleSheet, Text, Pressable, View, TextInput} from 'react-native';
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

type Properties = {
  nation?: Nation;
  onPressSelectNation: (selectedNation?: Nation) => void;
};

const Component: React.FC<Properties> = ({nation, onPressSelectNation}) => {
  const [activeStep, setActiveStep] = React.useState('location');
  const [state, setState] = React.useState<string>();
  // const [nations, setNations] = React.useState<Nation[]>([]);

  // const fetchNations = React.useCallback(async () => {
  //   setNations((await new NationsService().list()).items);
  // }, []);

  // React.useEffect(() => {
  //   fetchNations();
  // }, [fetchNations]);

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
  });

  return (
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
            state: activeStep === 'branding' ? 'active' : 'inactive',
          },
          {
            label: 'Roster',
            state: activeStep === 'roster' ? 'active' : 'inactive',
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
                      <Text style={[styles.itemSelectText]}>Required</Text>
                      <FontAwesome5Icon
                        name="chevron-right"
                        color={theme.colors.secondaryText}
                      />
                    </View>
                  </View>
                </View>
                <SectionListItemSeparator />
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
                      <Text style={[styles.itemSelectText]}>Required</Text>
                      <FontAwesome5Icon
                        name="chevron-right"
                        color={theme.colors.secondaryText}
                      />
                    </View>
                  </View>
                </View>
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
                          autoCapitalize="words"
                          returnKeyType="done"
                          placeholder="Nickname"
                          // value={username}
                          // onChangeText={(text: string) => setUsername(text)}
                        />
                      </TextInputBox>
                    </FormRow>
                    <FormRow compact>
                      <Text style={[styles.captionText]}>
                        Must adhere to the following rules:{'\n'}• May not
                        exceed 40 characters.{'\n'}• May not contain numbers or
                        punctuation.
                        {'\n'}• Must be plural and proper case.{'\n'}• May not
                        start with an article ("a", "an", "the").{'\n'}• May not
                        start with a pronoun (e.g. "my").
                        {'\n'}• May not cannot contain any offensive language.
                        {'\n\n'}Valid examples include Blue Jays, Kings, and
                        Flying Purple Elephants.
                      </Text>
                    </FormRow>
                  </Form>
                </View>
                <SectionListSectionSeparator />
                <Text style={[styles.sectionHeader]}>COLORS</Text>
                <SectionListSectionSeparator />
                <View style={[styles.itemRow]}>
                  <Text style={[styles.itemGrid]}>Primary Color</Text>
                  <View style={[styles.itemGridRight]}>
                    <View style={[styles.itemSelectContainer]}>
                      <Text style={[styles.itemSelectText]} />
                      <FontAwesome5Icon
                        name="chevron-right"
                        color={theme.colors.secondaryText}
                      />
                    </View>
                  </View>
                </View>
                <SectionListItemSeparator />
                <View style={[styles.itemRow]}>
                  <Text style={[styles.itemGrid]}>Secondary Color</Text>
                  <View style={[styles.itemGridRight]}>
                    <View style={[styles.itemSelectContainer]}>
                      <Text style={[styles.itemSelectText]} />
                      <FontAwesome5Icon
                        name="chevron-right"
                        color={theme.colors.secondaryText}
                      />
                    </View>
                  </View>
                </View>
                <SectionListItemSeparator />
                <View style={[styles.itemRow]}>
                  <Text style={[styles.itemGrid]}>Stripe Color</Text>
                  <View style={[styles.itemGridRight]}>
                    <View style={[styles.itemSelectContainer]}>
                      <Text style={[styles.itemSelectText]} />
                      <FontAwesome5Icon
                        name="chevron-right"
                        color={theme.colors.secondaryText}
                      />
                    </View>
                  </View>
                </View>
                <SectionListSectionSeparator />
              </View>
            ),
          },
        ]}
        lastButton={
          <Button
            activeColor={theme.colors.green}
            compact
            text="Create"
            iconRight="caret-up"
            onPress={() => console.log('creating team')}
          />
        }
        onPrev={() => {
          onPrev();
        }}
        onNext={() => {
          onNext();
        }}
        // showFooter={false}
      />

      {/* {activeStep === 'Location' ? (
        <>
          <SectionList
            style={[styles.listContainer]}
            sections={sections}
            keyExtractor={(item, index) => item.heading + index}
            renderItem={renderItem}
            renderSectionHeader={({section: {title}}) => (
              <Text style={styles.listSectionHeader}>{title}</Text>
            )}
            ItemSeparatorComponent={SectionListItemSeparator}
            SectionSeparatorComponent={SectionListSectionSeparator}
            ListFooterComponent={() => (
              <View style={[styles.listFooter]}>
                <Button
                  text="NEXT"
                  onPress={() => {
                    setLocationStepState('complete');
                    setBrandingStepState('active');
                    setActiveStep('Branding');
                  }}
                />
              </View>
            )}
          />
        </>
      ) : (
        <></>
      )}
      {activeStep === 'Branding' ? (
        <>
          <Text>branding</Text>
          <View style={[styles.listFooter]}>
            <Button
              text="NEXT"
              onPress={() => {
                setActiveStep('Location');
              }}
            />
          </View>
        </>
      ) : (
        <></>
      )} */}
    </>
  );
};
export {Component as CreateTeamStepper};
