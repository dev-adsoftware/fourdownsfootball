import React from 'react';
import {Animated} from 'react-native';
import {ChildrenProps, StateProp} from '../../types/types';
import {View} from '../primitives/view';

// interface FadeInScreenContextProps
//   extends StateProp<React.ReactNode | undefined> {}

// const FadeInScreenContext = React.createContext<
//   FadeInScreenContextProps | undefined
// >(undefined);

// interface FadeInScreenProviderProps extends ChildrenProps {}
// export const FadeInScreenProvider: React.FC<
//   FadeInScreenProviderProps
// > = props => {
//   const [fadeInScreen, setFadeInScreen] = React.useState<
//     React.ReactNode | undefined
//   >();

//   return (
//     <FadeInScreenContext.Provider
//       value={{
//         value: fadeInScreen,
//         set: setFadeInScreen,
//       }}>
//       {props.children}
//       <FadeInScreen isVisible={fadeInScreen !== undefined}>
//         {fadeInScreen}
//       </FadeInScreen>
//     </FadeInScreenContext.Provider>
//   );
// };

interface FadeInScreenPage {
  component: React.ReactNode;
  isVisible?: boolean;
}

interface FadeInScreenState {
  pages: FadeInScreenPage[];
  currentPageIndex: number;
}

const defaultFadeInScreenState: FadeInScreenState = {
  pages: [],
  currentPageIndex: -1,
};

export type FadeInScreenAction =
  | {type: 'push-stack'; payload: FadeInScreenPage}
  | {type: 'pop-stack'}
  | {type: 'reset'};

const stackReducer = (
  state: FadeInScreenState,
  action: FadeInScreenAction,
): FadeInScreenState => {
  switch (action.type) {
    case 'push-stack':
      return {
        pages:
          state.currentPageIndex === state.pages.length - 1
            ? [...state.pages].concat({...action.payload, isVisible: true})
            : [...state.pages]
                .slice(0, state.currentPageIndex + 1)
                .concat({...action.payload, isVisible: true}),
        currentPageIndex: state.currentPageIndex + 1,
      };
    case 'pop-stack':
      return {
        pages: [
          ...state.pages.slice(0, state.currentPageIndex),
          {
            component: state.pages[state.currentPageIndex].component,
            isVisible: false,
          },
        ],
        currentPageIndex: state.currentPageIndex - 1,
      };
    case 'reset':
      return defaultFadeInScreenState;
  }
};

interface FadeInScreenContextProps {
  push: (page: FadeInScreenPage) => void;
  pop: () => void;
  reset: () => void;
  state: FadeInScreenState;
}
const FadeInScreenContext = React.createContext<
  FadeInScreenContextProps | undefined
>(undefined);

interface FadeInScreenProviderProps extends ChildrenProps {}
export const FadeInScreenProvider: React.FC<
  FadeInScreenProviderProps
> = props => {
  const [stackState, stackDispatch] = React.useReducer(
    stackReducer,
    defaultFadeInScreenState,
  );

  const pushPage = React.useCallback((page: FadeInScreenPage) => {
    stackDispatch({type: 'push-stack', payload: page});
  }, []);

  const popPage = React.useCallback(() => {
    stackDispatch({type: 'pop-stack'});
  }, []);

  const resetFadeInScreen = React.useCallback(() => {
    stackDispatch({type: 'reset'});
  }, []);

  return (
    <FadeInScreenContext.Provider
      value={{
        push: pushPage,
        pop: popPage,
        reset: resetFadeInScreen,
        state: stackState,
      }}>
      <>
        {props.children}
        {stackState.pages.map((page, index) => {
          return (
            <FadeInScreen key={index} isVisible={page.isVisible || false}>
              {page.component}
            </FadeInScreen>
          );
        })}
      </>
    </FadeInScreenContext.Provider>
  );
};

export const useFadeInScreen = () => {
  const context = React.useContext(FadeInScreenContext);
  if (context === undefined) {
    throw new Error(
      'useFadeInScreen must be used within a FadeInScreenProvider',
    );
  }
  return context;
};
interface FadeInScreenProps {
  isVisible: boolean;
  children: React.ReactNode;
}

export const FadeInScreen: React.FC<FadeInScreenProps> = props => {
  const {current: screenOpacityAnimatedValue} = React.useRef<Animated.Value>(
    new Animated.Value(0),
  );

  React.useEffect(() => {
    if (props.isVisible) {
      Animated.timing(screenOpacityAnimatedValue, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(screenOpacityAnimatedValue, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [props.isVisible, screenOpacityAnimatedValue]);

  return (
    <View
      animated
      position="absolute"
      top={0}
      right={0}
      bottom={0}
      left={0}
      zIndex="top"
      opacity={0.0}
      bg="transparentLight"
      animatedOpacity={{
        animatedValue: screenOpacityAnimatedValue,
        range: [0, 1.0],
      }}>
      {props.isVisible && props.children}
    </View>
  );
};
