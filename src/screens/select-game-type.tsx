import React from 'react';
import {StackHeader, useStack} from '../components/navigation/stack-pager';
import {SafeBar} from '../primitives/safe-bar';
import {View} from '../primitives/view';
import {SELECT_OPTION_DELAY} from '../constants';
import {useNewGame} from './new-game';
import {SelectOpponentScreen} from './select-opponent';
import {OptionButton} from '../components/buttons/option-button';
import {HorizontalSeparator} from '../components/separators/horizontal-separator';

interface SelectGameTypeScreenProps {}

export const SelectGameTypeScreen: React.FC<SelectGameTypeScreenProps> = () => {
  const stack = useStack();
  const newGame = useNewGame();

  return (
    <>
      <SafeBar bg="white" />
      <View flex={1} w="full" bg="white" px={15}>
        <View py={10}>
          <StackHeader headerText="SELECT GAME TYPE" />
        </View>
        <View>
          <OptionButton
            text="FRIENDLY"
            selected={newGame.gameType.value === 'friendly'}
            onPress={() => {
              newGame.gameType.set('friendly');
              setTimeout(() => {
                stack.push({component: <SelectOpponentScreen />});
              }, SELECT_OPTION_DELAY);
            }}
          />
          <HorizontalSeparator thickness={0} margin={5} />
          <OptionButton
            text="RATED"
            selected={newGame.gameType.value === 'rated'}
            onPress={() => {
              newGame.gameType.set('rated');
              setTimeout(() => {
                stack.push({component: <SelectOpponentScreen />});
              }, SELECT_OPTION_DELAY);
            }}
          />
        </View>
      </View>
    </>
  );
};
