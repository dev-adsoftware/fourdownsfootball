import React from 'react';
import {Animated} from 'react-native';
import {PlayCallDto, PlaySnapshotDto} from '../../services/dtos';
import {IconButton} from '../buttons/icon-button';
import {Icon} from '../../primitives/icon';
import {Text} from '../../primitives/text';
import {View} from '../../primitives/view';
import {PlaySelector} from './play-selector';

interface GameControlPanelProps {
  isWaitingForOpponent: boolean;
  plays: PlaySnapshotDto[];
  currentPlayCall: PlayCallDto;
}

export const GameControlPanel: React.FC<GameControlPanelProps> = props => {
  const [selectedPlayCall, setSelectedPlayCall] = React.useState(
    props.currentPlayCall,
  );
  const [didPressSubmit, setDidPressSubmit] = React.useState<boolean>(
    props.isWaitingForOpponent,
  );
  const [isOpeningPlaybook, setIsOpeningPlaybook] =
    React.useState<boolean>(false);
  const [isPlaybookOpen, setIsPlaybookOpen] = React.useState<boolean>(false);
  const [hasRoundedCorners, setHasRoundedCorners] =
    React.useState<boolean>(true);

  const slideInOpacity = React.useRef<Animated.Value>(
    new Animated.Value(props.isWaitingForOpponent ? 1 : 0),
  ).current;

  const slideInTranslateX = React.useRef<Animated.Value>(
    new Animated.Value(props.isWaitingForOpponent ? 1 : 0),
  ).current;

  React.useEffect(() => {
    if (didPressSubmit) {
      Animated.timing(slideInOpacity, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }).start(() => {
        Animated.timing(slideInTranslateX, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }).start(() => {});
      });
    } else {
      Animated.timing(slideInTranslateX, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        Animated.timing(slideInOpacity, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }).start(() => {});
      });
    }
  }, [didPressSubmit, slideInOpacity, slideInTranslateX]);

  const playbookOpacity = React.useRef<Animated.Value>(
    new Animated.Value(0),
  ).current;

  const playbookTranslateY = React.useRef<Animated.Value>(
    new Animated.Value(0),
  ).current;

  React.useEffect(() => {
    if (!props.isWaitingForOpponent) {
      if (isOpeningPlaybook) {
        setHasRoundedCorners(false);
        setIsPlaybookOpen(true);
        Animated.timing(slideInOpacity, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }).start(() => {
          setIsPlaybookOpen(true);
        });
      } else {
        setHasRoundedCorners(true);
        Animated.timing(slideInOpacity, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }).start(() => {
          setIsPlaybookOpen(false);
        });
      }
    }
  }, [
    props.isWaitingForOpponent,
    isOpeningPlaybook,
    playbookOpacity,
    playbookTranslateY,
    slideInOpacity,
  ]);

  const selectedPlay = React.useMemo(() => {
    return props.plays.filter(play => {
      return play.id === selectedPlayCall.playSnapshotId;
    })[0];
  }, [props.plays, selectedPlayCall]);

  return (
    <View
      h={380}
      w="full"
      // w={300}
      // mb={5}
      justifyContent="center"
      alignItems="center"
      overflow="hidden">
      {isPlaybookOpen ? (
        <PlaySelector
          plays={props.plays}
          selectedPlayCall={selectedPlayCall}
          onSelect={(playCall: PlayCallDto) => {
            console.log('selected play', playCall.playSnapshotId);
            setSelectedPlayCall(playCall);
            setIsOpeningPlaybook(false);
          }}
          onClose={() => {
            setIsOpeningPlaybook(false);
          }}
        />
      ) : (
        <></>
      )}
      <View row position="absolute" bottom={0} left={0} borderTopWidth={1}>
        <View flex={1} h={50} bg="oddLayerSurface">
          <View
            bg="oddLayerSurface"
            w={50}
            h={50}
            borderRightWidth={1}
            borderColor="black"
            alignItems="center"
            justifyContent="center"
            onPress={() => {
              setIsOpeningPlaybook(true);
            }}
            opaque>
            <Icon icon="book" size={18} color="playbook" />
          </View>
        </View>
        <View flex={1} h={50} bg="oddLayerSurface" alignItems="flex-end">
          <View
            bg="actionButton"
            w={50}
            h={50}
            borderLeftWidth={1}
            borderColor="black"
            alignItems="center"
            justifyContent="center">
            <IconButton
              icon="arrow-right"
              size={18}
              color="darkText"
              onPress={() => {
                setDidPressSubmit(true);
              }}
            />
          </View>
        </View>
        {/* <View
          bg="evenLayerSurface"
          w={70}
          h={80}
          borderTopLeftRadius={hasRoundedCorners ? 10 : 0}
          borderBottomLeftRadius={10}
          borderWidth={1}
          borderColor="darkSurface"
          alignItems="center"
          justifyContent="center"
          onPress={() => {
            setIsOpeningPlaybook(true);
          }}
          opaque>
          <Icon icon="book" size={24} color="playbook" />
        </View>
        <View
          h={80}
          w={160}
          borderHorizontalColor="darkText"
          borderHorizontalWidth={1}
          onPress={() => {
            setIsOpeningPlaybook(true);
          }}>
          <View
            row
            alignItems="center"
            borderBottomWidth={1}
            borderBottomColor="darkText">
            <View bg="oddLayerSurface" px={5}>
              <Text
                text={props.isWaitingForOpponent ? 'NA' : 'ST'}
                typeFace="klavikaCondensedBold"
                fontSize={14}
                color="darkText"
              />
            </View>
            <View bg="darkText" flex={1} px={5}>
              <Text
                text={
                  props.isWaitingForOpponent
                    ? 'WAITING'
                    : selectedPlay.name.toUpperCase()
                }
                typeFace="klavikaCondensedBold"
                fontSize={14}
                color="white"
              />
            </View>
          </View>
          <View bg="evenLayerSurface" flex={1} w="full" px={5}>
            {props.isWaitingForOpponent ? (
              <></>
            ) : (
              <>
                <Text
                  text="Avg Kick:"
                  typeFace="sourceSansProSemibold"
                  fontSize={13}
                  color="darkText"
                />
                <View row alignItems="flex-end" pl={5}>
                  <Text
                    text="65"
                    mt={-6}
                    mb={-5}
                    typeFace="klavikaCondensedBold"
                    fontSize={30}
                    color="darkText"
                  />
                  <Text
                    ml={2}
                    text="YDS"
                    typeFace="klavikaCondensedRegular"
                    fontSize={17}
                    color="darkText"
                  />
                  <Text
                    ml={2}
                    text="(#45)"
                    typeFace="klavikaCondensedRegular"
                    fontSize={17}
                    color="darkText"
                  />
                </View>
              </>
            )}
          </View>
        </View>
        <View
          bg="actionButton"
          w={70}
          h={80}
          borderWidth={1}
          borderTopRightRadius={hasRoundedCorners ? 10 : 0}
          borderBottomRightRadius={10}
          borderColor="darkText"
          alignItems="center"
          justifyContent="center">
          <IconButton
            icon="arrow-right"
            size={24}
            color="darkText"
            onPress={() => {
              setDidPressSubmit(true);
            }}
          />
        </View> */}
      </View>
      {/* <View
        animated
        animatedOpacity={{
          animatedValue: slideInOpacity,
          range: [0, 1],
        }}
        position="absolute"
        h={80}
        left={0}
        bottom={0}
        right={0}
        bg={
          isPlaybookOpen || isOpeningPlaybook
            ? 'transparentLight'
            : 'transparentVeryDark'
        }
        borderWidth={1}
        borderColor="darkText"
        borderTopRadius={hasRoundedCorners ? 10 : 0}
        borderBottomRadius={10}
        overflow="hidden">
        <View
          animated
          flex={1}
          w="full"
          alignItems="center"
          justifyContent="center"
          animatedTranslateX={{
            animatedValue: slideInTranslateX,
            range: [-300, 0],
          }}>
          <View row alignItems="center">
            <Icon icon="clock" color="white" size={20} />
            <Text
              ml={10}
              text="Waiting for Opponent"
              color="white"
              typeFace="klavikaCondensedBoldItalic"
              fontSize={24}
            />
          </View>
        </View>
      </View> */}
    </View>
  );
};
