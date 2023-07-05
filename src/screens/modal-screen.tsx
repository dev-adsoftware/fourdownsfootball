import React from 'react';
import {Animated, useWindowDimensions} from 'react-native';
import {CircleCloseButton} from '../components/buttons/circle-close-button';
import {SAFE_AREA_PADDING_BOTTOM} from '../constants';
import {Icon, IconProps} from '../primitives/icon';
import {Text} from '../primitives/text';
import {View} from '../primitives/view';
import {ThemeColorKey} from '../providers/theme';
import {ViewProps} from '../utilities/style-builder';

interface ModalScreenProps {
  h: ViewProps['h'];
  icon: IconProps['icon'];
  iconColor: ThemeColorKey;
  title: string;
  onClose: () => void;
  closeFuncRef: React.MutableRefObject<(() => void) | undefined>;
  children: React.ReactNode;
}

export const ModalScreen: React.FC<ModalScreenProps> = props => {
  const {width} = useWindowDimensions();

  const translationAnimationValue = React.useRef<Animated.Value>(
    new Animated.Value(0),
  ).current;

  const [isOpeningModal, setIsOpeningModal] = React.useState(true);
  const {onClose: onCloseProp} = props;
  React.useEffect(() => {
    if (isOpeningModal) {
      Animated.timing(translationAnimationValue, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translationAnimationValue, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        onCloseProp();
      });
    }
  }, [translationAnimationValue, isOpeningModal, onCloseProp]);

  const close = React.useCallback(() => {
    setIsOpeningModal(false);
  }, []);

  React.useEffect(() => {
    props.closeFuncRef.current = close;
  }, [close, props.closeFuncRef]);

  return (
    <View
      position="absolute"
      bottom={0}
      w={width}
      h={props.h}
      px={10}
      pt={10}
      pb={SAFE_AREA_PADDING_BOTTOM}>
      <View
        animated
        animatedTranslateY={{
          animatedValue: translationAnimationValue,
          range: [Number(props.h), 0],
        }}
        w="full"
        borderRadius={8}
        p={8}
        bg="white"
        flex={1}>
        <View row justifyContent="space-between">
          <View bg="white" h={40}>
            <View pl={8} h={30} alignItems="center" justifyContent="center">
              <Icon icon={props.icon} color={props.iconColor} size={10} />
            </View>
          </View>
          <View bg="white" h={40} flex={1}>
            <View h={30} pl={8} alignItems="flex-start" justifyContent="center">
              <Text
                text={props.title}
                typeFace="klavikaCondensedBoldItalic"
                fontSize={20}
                color="darkText"
              />
            </View>
          </View>
          <CircleCloseButton
            onPress={() => {
              setIsOpeningModal(false);
            }}
          />
        </View>
        <View w="full" flex={1} bg="white">
          {props.children}
        </View>
      </View>
    </View>
  );
};
