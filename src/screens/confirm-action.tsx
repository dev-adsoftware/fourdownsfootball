import React from 'react';
import {CircleIconButton} from '../components/buttons/circle-icon-button';
import {useFadeInScreen} from '../components/navigation/fade-in-screen';
import {Icon} from '../components/primitives/icon';
import {Pressable} from '../components/primitives/pressable';
import {Text} from '../components/primitives/text';
import {View} from '../components/primitives/view';

interface ConfirmActionScreenProps {
  icon: string;
  questionText: string;
  buttonText: string;
  onConfirm: () => void;
}

export const ConfirmActionScreen: React.FC<
  ConfirmActionScreenProps
> = props => {
  const fadeInScreen = useFadeInScreen();
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
              <CircleIconButton
                icon="times"
                bg="lightGrayButton"
                color="black"
                size={30}
                onPress={() => {
                  fadeInScreen.pop();
                }}
              />
            </View>
            <Icon name={props.icon} size="3xl" color="black" />
            <Text
              mt={10}
              text={props.questionText}
              textAlign="center"
              color="black"
              typeFace="sourceSansProSemibold"
              fontSize="headline"
            />
          </View>
          <Pressable
            w="full"
            onPress={async () => {
              fadeInScreen.pop();
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
                fontSize="headline"
              />
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
};
