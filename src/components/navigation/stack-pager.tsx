import React from 'react';
import {useWindowDimensions, Animated} from 'react-native';
import {ChildrenProps} from '../../types/types';
import {IconButton} from '../buttons/icon-button';
import {SafeBar} from '../primitives/safe-bar';
import {View} from '../primitives/view';

interface StackPage {
  component: React.ReactNode;
}

interface StackState {
  pages: StackPage[];
  currentPageIndex: number;
  direction: 'forward' | 'back';
}

const defaultStackState: StackState = {
  pages: [],
  currentPageIndex: -1,
  direction: 'forward',
};

export type StackAction =
  | {type: 'push-stack'; payload: StackPage}
  | {type: 'pop-stack'}
  | {type: 'reset'};

const stackReducer = (state: StackState, action: StackAction): StackState => {
  switch (action.type) {
    case 'push-stack':
      return {
        pages:
          state.currentPageIndex === state.pages.length - 1
            ? [...state.pages].concat(action.payload)
            : [...state.pages]
                .slice(0, state.currentPageIndex + 1)
                .concat(action.payload),
        currentPageIndex: state.currentPageIndex + 1,
        direction: 'forward',
      };
    case 'pop-stack':
      return {
        pages: [...state.pages],
        currentPageIndex: state.currentPageIndex - 1,
        direction: 'back',
      };
    case 'reset':
      return defaultStackState;
  }
};

interface StackContextProps {
  push: (page: StackPage) => void;
  pop: () => void;
  reset: () => void;
  state: StackState;
}
const StackContext = React.createContext<StackContextProps | undefined>(
  undefined,
);

interface StackProviderProps extends ChildrenProps {}
export const StackProvider: React.FC<StackProviderProps> = props => {
  const [stackState, stackDispatch] = React.useReducer(
    stackReducer,
    defaultStackState,
  );

  const pushPage = React.useCallback((page: StackPage) => {
    stackDispatch({type: 'push-stack', payload: page});
  }, []);

  const popPage = React.useCallback(() => {
    stackDispatch({type: 'pop-stack'});
  }, []);

  const resetStack = React.useCallback(() => {
    stackDispatch({type: 'reset'});
  }, []);

  return (
    <StackContext.Provider
      value={{
        push: pushPage,
        pop: popPage,
        reset: resetStack,
        state: stackState,
      }}>
      {props.children}
    </StackContext.Provider>
  );
};

interface StackPagerProps {
  initialPage: React.ReactNode;
  onStackEmpty?: () => void;
}

export const StackPager: React.FC<StackPagerProps> = props => {
  const [isInitialized, setIsInitialized] = React.useState(false);
  const stack = useStack();

  const {current: parentScrollView} = React.useRef<Animated.Value>(
    new Animated.Value(0),
  );
  const {current: childScrollView} = React.useRef<Animated.Value>(
    new Animated.Value(0),
  );

  const {width} = useWindowDimensions();

  React.useEffect(() => {
    if (!isInitialized) {
      stack.reset();
      stack.push({component: props.initialPage});
      setIsInitialized(true);
    }
  }, [props.initialPage, isInitialized, stack]);

  React.useEffect(() => {
    if (stack.state.currentPageIndex === -1 && isInitialized) {
      props.onStackEmpty && props.onStackEmpty();
    }
    if (stack.state.currentPageIndex === 0) {
      Animated.timing(parentScrollView, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
    if (stack.state.currentPageIndex === 1) {
      if (stack.state.direction === 'forward') {
        Animated.timing(parentScrollView, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }).start();
      } else {
        Animated.timing(childScrollView, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start();
      }
    }
    if (stack.state.currentPageIndex > 1) {
      Animated.timing(childScrollView, {
        toValue: stack.state.currentPageIndex - 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [stack.state, isInitialized, childScrollView, parentScrollView, props]);

  return (
    <>
      <View
        animated
        flex={1}
        w={width * Math.min(stack.state.pages.length, 2)}
        animatedTranslateX={{
          animatedValue: parentScrollView,
          range: [0, -width],
        }}>
        <View flex={1} row>
          {stack.state.pages.slice(0, 2).map((page, index) => {
            return (
              <View key={index} w={width} flex={1}>
                {index === 0 && page.component}
                {index === 1 && (
                  <>
                    <StackToolbar />
                    <View
                      animated
                      flex={1}
                      w={width * Math.min(stack.state.pages.length - 1, 2)}
                      animatedTranslateX={{
                        animatedValue: childScrollView,
                        range: [0, -width],
                      }}>
                      <View flex={1} row>
                        {stack.state.pages.slice(1).map((subpage, subindex) => {
                          return (
                            <View key={subindex} w={width} flex={1}>
                              {subpage.component}
                            </View>
                          );
                        })}
                      </View>
                    </View>
                  </>
                )}
              </View>
            );
          })}
        </View>
      </View>
    </>
  );
};

export const StackToolbar: React.FC<{}> = _props => {
  const stack = useStack();
  return (
    <>
      <SafeBar bg="white" />
      <View row w="full" bg="white" alignItems="center">
        <IconButton
          icon="chevron-left"
          color="primaryText"
          size="sm"
          pressableAreaPadding={10}
          onPress={() => {
            stack.pop();
          }}
        />
      </View>
    </>
  );
};

export const useStack = () => {
  const context = React.useContext(StackContext);
  if (context === undefined) {
    throw new Error('useStack must be used within a StackProvider');
  }
  return context;
};
