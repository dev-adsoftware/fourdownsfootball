import React from 'react';
import {Animated} from 'react-native';
import {PlaySnapshotDto} from '../../services/dtos';
import {IconButton} from '../buttons/icon-button';
import {Icon} from '../primitives/icon';
import {Text} from '../primitives/text';
import {View} from '../primitives/view';
import {PlaybookCarousel} from '../scrollables/playbook-carousel';

interface GameControlPanelProps {
  isWaitingForOpponent: boolean;
  plays: PlaySnapshotDto[];
}

export const GameControlPanel: React.FC<GameControlPanelProps> = props => {
  const [didPressSubmit, setDidPressSubmit] = React.useState<boolean>(
    props.isWaitingForOpponent,
  );
  const [didOpenPlaybook, setDidOpenPlaybook] = React.useState<boolean>(false);
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
    if (didOpenPlaybook) {
      setHasRoundedCorners(false);
      Animated.timing(playbookTranslateY, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {});
    } else {
      Animated.timing(playbookTranslateY, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        setHasRoundedCorners(true);
      });
    }
  }, [didOpenPlaybook, playbookOpacity, playbookTranslateY]);

  return (
    <View
      h={360}
      w={300}
      mb={5}
      justifyContent="center"
      alignItems="center"
      overflow="hidden">
      <View
        position="absolute"
        top={0}
        left={0}
        right={0}
        h={280}
        bg="transparent"
        overflow="hidden">
        <View
          animated
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          overflow="hidden"
          bg="oddLayerSurface"
          borderTopWidth={1}
          borderVerticalWidth={1}
          borderTopRadius={10}
          animatedTranslateY={{
            animatedValue: playbookTranslateY,
            range: [280, 0],
          }}>
          <PlaybookCarousel
            plays={props.plays}
            selectedPlay={props.plays[0]}
            onSelect={(play: string) => {
              console.log('selected play', play);
              setDidOpenPlaybook(false);
            }}
          />
        </View>
      </View>
      <View row position="absolute" bottom={0} left={0}>
        <View
          bg="evenLayerSurface"
          w={70}
          h={80}
          borderTopLeftRadius={hasRoundedCorners ? 10 : 0}
          borderBottomLeftRadius={10}
          borderWidth={1}
          borderColor="primaryText"
          alignItems="center"
          justifyContent="center">
          <IconButton
            icon="book"
            size="4xl"
            color="playbook"
            onPress={() => {
              setDidOpenPlaybook(!didOpenPlaybook);
            }}
          />
        </View>
        <View
          h={80}
          w={160}
          borderHorizontalColor="primaryText"
          borderHorizontalWidth={1}>
          <View
            row
            alignItems="center"
            borderBottomWidth={1}
            borderBottomColor="primaryText">
            <View bg="oddLayerSurface" px={5}>
              <Text
                text={props.isWaitingForOpponent ? 'NA' : 'ST'}
                typeFace="klavikaCondensedBold"
                fontSize="callout"
                color="primaryText"
              />
            </View>
            <View bg="primaryText" flex={1} px={5}>
              <Text
                text={props.isWaitingForOpponent ? 'WAITING' : 'KICKOFF DEEP'}
                typeFace="klavikaCondensedBold"
                fontSize="callout"
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
                  fontSize="footnote"
                  color="primaryText"
                />
                <View row alignItems="flex-end" pl={5}>
                  <Text
                    text="65"
                    mt={-6}
                    mb={-5}
                    typeFace="klavikaCondensedBold"
                    fontSize="title1"
                    color="primaryText"
                  />
                  <Text
                    mb={-1}
                    ml={2}
                    text="YDS"
                    typeFace="klavikaCondensedRegular"
                    fontSize="body"
                    color="primaryText"
                  />
                  <Text
                    mb={-1}
                    ml={2}
                    text="(#45)"
                    typeFace="klavikaCondensedRegular"
                    fontSize="body"
                    color="primaryText"
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
          borderColor="primaryText"
          alignItems="center"
          justifyContent="center">
          <IconButton
            icon="arrow-right"
            size="4xl"
            color="primaryText"
            onPress={() => {
              setDidPressSubmit(true);
            }}
          />
        </View>
      </View>
      <View
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
        bg="transparentVeryDark"
        borderWidth={1}
        borderColor="primaryText"
        borderRadius={10}
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
            <Icon name="clock" color="white" size="3xl" />
            <Text
              ml={10}
              text="Waiting for Opponent"
              color="white"
              typeFace="klavikaCondensedBoldItalic"
              fontSize="title1"
            />
          </View>
        </View>
      </View>
    </View>
  );
};
