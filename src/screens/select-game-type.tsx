import React from 'react';
import {useStack} from '../components/navigation/stack-pager';
import {Icon} from '../components/primitives/icon';
import {Pressable} from '../components/primitives/pressable';
import {SafeBar} from '../components/primitives/safe-bar';
import {Text} from '../components/primitives/text';
import {View} from '../components/primitives/view';
import {SELECT_OPTION_DELAY} from '../constants/timers';
import {useNewGame} from './new-game';
import {SelectOpponentScreen} from './select-opponent';

interface SelectGameTypeScreenProps {}

export const SelectGameTypeScreen: React.FC<SelectGameTypeScreenProps> = () => {
  const stack = useStack();
  const newGame = useNewGame();

  return (
    <>
      <SafeBar bg="white" />
      <View flex={1} w="full" bg="white" px={15}>
        <Text
          text="SELECT GAME TYPE"
          typeFace="klavikaCondensedMediumItalic"
          fontSize="title2"
          py={20}
        />
        <View>
          <Pressable
            onPress={() => {
              newGame.gameType.set('friendly');
              setTimeout(() => {
                stack.push({component: <SelectOpponentScreen />});
              }, SELECT_OPTION_DELAY);
            }}>
            <View
              row
              borderRadius="circle"
              bg={newGame.gameType.value === 'friendly' ? 'primary' : 'white'}
              borderColor={
                newGame.gameType.value !== 'friendly'
                  ? 'primaryText'
                  : undefined
              }
              borderWidth={
                newGame.gameType.value !== 'friendly' ? 1 : undefined
              }
              alignItems="center"
              justifyContent="center"
              py={10}>
              <View w={50} />
              <View flex={1} alignItems="center">
                <Text
                  text="FRIENDLY"
                  color={
                    newGame.gameType.value === 'friendly'
                      ? 'white'
                      : 'primaryText'
                  }
                  typeFace="klavikaCondensedBoldItalic"
                  fontSize="title3"
                />
              </View>
              <View w={50} justifyContent="flex-end">
                {newGame.gameType.value === 'friendly' && (
                  <Icon name="check" color="white" size="md" />
                )}
              </View>
            </View>
          </Pressable>
          <Pressable
            onPress={() => {
              newGame.gameType.set('rated');
              setTimeout(() => {
                stack.push({component: <SelectOpponentScreen />});
              }, SELECT_OPTION_DELAY);
            }}>
            <View
              row
              mt={10}
              borderRadius="circle"
              bg={newGame.gameType.value === 'rated' ? 'primary' : 'white'}
              borderColor={
                newGame.gameType.value !== 'rated' ? 'primaryText' : undefined
              }
              borderWidth={newGame.gameType.value !== 'rated' ? 1 : undefined}
              alignItems="center"
              justifyContent="center"
              py={10}>
              <View w={50} />
              <View flex={1} alignItems="center">
                <Text
                  text="RATED"
                  color={
                    newGame.gameType.value === 'rated' ? 'white' : 'primaryText'
                  }
                  typeFace="klavikaCondensedBoldItalic"
                  fontSize="title3"
                />
              </View>
              <View w={50} justifyContent="flex-end">
                {newGame.gameType.value === 'rated' && (
                  <Icon name="check" color="white" size="md" />
                )}
              </View>
            </View>
          </Pressable>
        </View>
      </View>
    </>
  );
};
