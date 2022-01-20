import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {useTheme} from '../providers/theme';

export type StepState = 'active' | 'complete' | 'inactive';

export type Step = {
  label: string;
  state: StepState;
};

type Properties = {
  steps: Step[];
};

const Component: React.FC<Properties> = ({steps}) => {
  const theme = useTheme();
  const styles = StyleSheet.create({
    stepperContainer: {
      width: '100%',
      flexDirection: 'row',
      paddingHorizontal: 20,
      paddingVertical: 20,
      justifyContent: 'center',
    },
    stepperStepsWrapper: {flexDirection: 'row'},
    stepperStep: {
      flexDirection: 'column',
      alignItems: 'center',
    },
    stepperCircleFilled: {
      width: 50,
      height: 50,
      alignItems: 'center',
      borderRadius: 25,
    },
    stepperCircleFilledActive: {
      backgroundColor: theme.colors.blue,
    },
    stepperCircleFilledComplete: {
      backgroundColor: theme.colors.green,
    },
    stepperCircleFilledText: {
      color: theme.colors.white,
      fontWeight: 'bold',
      marginTop: 17,
    },
    stepperCircleOutlined: {
      backgroundColor: theme.colors.background,
      borderWidth: 1,
      width: 50,
      height: 50,
      alignItems: 'center',
      borderRadius: 25,
    },
    stepperCircleOutlinedInactive: {
      borderColor: theme.colors.secondaryText,
    },
    stepperCircleOutlinedComplete: {
      borderColor: theme.colors.green,
    },
    stepperCircleOutlinedText: {
      fontWeight: 'bold',
      marginTop: 15,
    },
    stepperCircleOutlinedTextInactive: {
      color: theme.colors.secondaryText,
    },
    stepperCircleOutlinedTextComplete: {
      color: theme.colors.green,
    },
    stepperText: {
      marginTop: 7,
      fontSize: 12,
      width: 60,
      textAlign: 'center',
    },
    stepperTextActive: {
      color: theme.colors.blue,
    },
    stepperTextInactive: {
      color: theme.colors.secondaryText,
    },

    stepperTextComplete: {
      color: theme.colors.green,
    },
    stepperSeparator: {
      width: 30,
      height: 1,
      borderWidth: 1,
      marginTop: 25,
      marginLeft: -5,
      marginRight: -5,
    },
    stepperSeparatorComplete: {
      borderColor: theme.colors.green,
    },
    stepperSeparatorActive: {
      borderColor: theme.colors.blue,
    },
    stepperSeparatorInactive: {
      borderColor: theme.colors.secondaryText,
    },
    checkmarkContainer: {
      marginTop: 14,
    },
  });
  return (
    <View style={[styles.stepperContainer]}>
      {steps.map((step: Step, index: number) => {
        return (
          <View key={step.label} style={[styles.stepperStepsWrapper]}>
            <View style={[styles.stepperStep]}>
              <View
                style={[
                  step.state === 'inactive'
                    ? styles.stepperCircleOutlined
                    : styles.stepperCircleFilled,
                  step.state === 'complete'
                    ? styles.stepperCircleFilledComplete
                    : step.state === 'active'
                    ? styles.stepperCircleFilledActive
                    : styles.stepperCircleOutlinedInactive,
                ]}>
                {step.state === 'complete' ? (
                  <View style={[styles.checkmarkContainer]}>
                    <FontAwesome5Icon
                      name="check"
                      color={theme.colors.white}
                      size={20}
                    />
                  </View>
                ) : (
                  <Text
                    style={[
                      step.state === 'inactive'
                        ? styles.stepperCircleOutlinedText
                        : styles.stepperCircleFilledText,
                      step.state === 'inactive'
                        ? styles.stepperTextInactive
                        : {},
                    ]}>
                    {index + 1}
                  </Text>
                )}
              </View>
              <Text
                style={[
                  styles.stepperText,
                  step.state === 'active'
                    ? styles.stepperTextActive
                    : step.state === 'inactive'
                    ? styles.stepperTextInactive
                    : styles.stepperTextComplete,
                ]}>
                {step.label}
              </Text>
            </View>
            {index < steps.length - 1 ? (
              <View
                style={[
                  styles.stepperSeparator,
                  steps[index + 1].state === 'active'
                    ? styles.stepperSeparatorActive
                    : steps[index + 1].state === 'complete'
                    ? styles.stepperSeparatorComplete
                    : styles.stepperSeparatorInactive,
                ]}
              />
            ) : (
              <></>
            )}
          </View>
        );
      })}
    </View>
  );
};

export {Component as Stepper};
