import React from 'react';
import {CircleCloseButton} from '../components/buttons/circle-close-button';
import {useFadeInScreen} from '../components/navigation/fade-in-screen';
import {Icon} from '../primitives/icon';
import {Text} from '../primitives/text';
import {View} from '../primitives/view';

interface ConfirmActionScreenProps {
  icon: string;
  questionText: string;
  buttonText: string;
  onConfirm: () => void;
}

const TEXT_SIZE = 20;

export const ConfirmActionScreen: React.FC<
  ConfirmActionScreenProps
> = props => {
  const {pop: popFadeInScreen} = useFadeInScreen();
  return (
    <View flex={1} alignItems="center" justifyContent="center">
      <View>
        <View
          borderRadius={8}
          bg="white"
          alignItems="center"
          justifyContent="space-between">
          <View px={30} py={20} alignItems="center">
            <View position="absolute" top={10} right={10}>
              <CircleCloseButton
                onPress={() => {
                  popFadeInScreen();
                }}
              />
            </View>
            <Icon icon={props.icon} size={24} color="darkText" />
            <Text
              mt={10}
              text={props.questionText}
              textAlign="center"
              color="darkText"
              typeFace="sourceSansProSemibold"
              fontSize={TEXT_SIZE}
            />
          </View>
          <View
            w="full"
            onPress={async () => {
              popFadeInScreen();
              props.onConfirm();
            }}>
            <View
              bg="success"
              py={12}
              w="full"
              borderBottomRadius={8}
              alignItems="center">
              <Text
                text={props.buttonText}
                color="white"
                typeFace="sourceSansProSemibold"
                fontSize={TEXT_SIZE}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
