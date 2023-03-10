import {uniq} from 'lodash';
import React from 'react';
import {Animated} from 'react-native';
import {PLAY_SELECTOR_CAROUSEL_WIDTH} from '../../constants';
import {Icon} from '../../primitives/icon';
import {Text} from '../../primitives/text';
import {View} from '../../primitives/view';
import {PlayCallDto, PlaySnapshotDto} from '../../services/dtos';
import {Formation} from '../../services/dtos/types/formation';
import {GameEngine} from '../../utilities/game-engine';
import {CircleCloseButton} from '../buttons/circle-close-button';
import {FormationCarousel} from '../scrollables/formation-carousel';
import {PlayCarousel} from '../scrollables/play-carousel';
import {PlayCallConfigurator} from './play-call-configurator';

interface PlaySelectorProps {
  plays: PlaySnapshotDto[];
  selectedPlayCall: PlayCallDto;
  onSelect: (playCall: PlayCallDto) => void;
  onClose: () => void;
}

enum _NavigationLevel {
  NavFormation,
  NavPlay,
  NavPlayDetail,
  NavTargets,
}

export const PlaySelector: React.FC<PlaySelectorProps> = props => {
  const initiallySelectedPlay = React.useMemo(() => {
    return props.plays.filter(play => {
      return play.id === props.selectedPlayCall.playSnapshotId;
    })[0];
  }, [props.plays, props.selectedPlayCall]);

  const [isClosing, setIsClosing] = React.useState(false);

  const [selectedPlay, setSelectedPlay] = React.useState(initiallySelectedPlay);

  const [navLevel, setNavLevel] = React.useState<_NavigationLevel>(
    _NavigationLevel.NavPlay,
  );
  const [formation, setFormation] = React.useState<Formation | undefined>(
    props.plays.filter(play => {
      return play.id === props.selectedPlayCall.playSnapshotId;
    })[0].formation,
  );

  const formations = React.useMemo(() => {
    return uniq(
      props.plays.map(play => {
        return play.formation;
      }),
    );
  }, [props.plays]);

  const translateY = React.useRef<Animated.Value>(
    new Animated.Value(0),
  ).current;

  const {onClose: onCloseProp} = props;
  React.useEffect(() => {
    if (isClosing) {
      Animated.timing(translateY, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        onCloseProp();
      });
    } else {
      Animated.timing(translateY, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {});
    }
  }, [isClosing, translateY, onCloseProp]);

  return (
    <View
      position="absolute"
      top={0}
      left={0}
      right={0}
      h={320}
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
          animatedValue: translateY,
          range: [320, 0],
        }}>
        <View
          row
          w="full"
          bg="darkText"
          borderTopRadius={10}
          borderTopColor="black"
          borderTopWidth={1}
          mt={-1}
          py={8}
          px={10}
          alignItems="center"
          justifyContent="space-between">
          {navLevel === _NavigationLevel.NavFormation ? (
            <Text
              text="PLAY CALL"
              typeFace="sourceSansProBold"
              fontSize={15}
              color="white"
            />
          ) : navLevel === _NavigationLevel.NavPlayDetail ? (
            <View
              row
              onPress={() => {
                setNavLevel(_NavigationLevel.NavPlay);
              }}
              alignItems="center">
              <Icon icon="chevron-left" color="white" size={10} />
              <Text
                ml={5}
                text={selectedPlay.name.toUpperCase()}
                color="white"
                fontSize={15}
                typeFace="sourceSansProBold"
              />
            </View>
          ) : (
            <View
              row
              onPress={() => {
                setSelectedPlay(
                  props.plays.filter(play => {
                    return play.formation === formation;
                  })[0],
                );
                setNavLevel(_NavigationLevel.NavFormation);
              }}
              alignItems="center">
              <Icon icon="chevron-left" color="white" size={10} />
              <Text
                ml={5}
                text={`${GameEngine.getFormationName(formation!)}`}
                color="white"
                fontSize={15}
                typeFace="sourceSansProBold"
              />
            </View>
          )}

          <View row>
            <CircleCloseButton
              onPress={() => {
                // setFormation(selectedPlay.formation);
                // props.onClose();
                setIsClosing(true);
              }}
            />
          </View>
        </View>
        <View
          w={PLAY_SELECTOR_CAROUSEL_WIDTH}
          flex={1}
          alignItems="center"
          justifyContent="center">
          {navLevel === _NavigationLevel.NavFormation ? (
            <FormationCarousel
              formations={formations}
              initialFormation={selectedPlay.formation}
              onSelect={(thisFormation: Formation) => {
                console.log(
                  'selected formation',
                  GameEngine.getFormationName(thisFormation),
                );
                setFormation(thisFormation);
                setNavLevel(_NavigationLevel.NavPlay);
              }}
            />
          ) : navLevel === _NavigationLevel.NavPlay ? (
            <PlayCarousel
              plays={props.plays.filter(play => {
                return play.formation === formation;
              })}
              initialPlay={selectedPlay}
              onSelect={(thisPlay: PlaySnapshotDto) => {
                console.log('selected play', thisPlay.id);
                setSelectedPlay(thisPlay);
                setNavLevel(_NavigationLevel.NavPlayDetail);
              }}
            />
          ) : (
            <PlayCallConfigurator
              play={selectedPlay}
              onSelect={(_targets, _timeOut, _noHuddle, _hurryUp) => {
                console.log('configured play');
                props.onSelect(
                  new PlayCallDto().init({
                    ...props.selectedPlayCall.toPlainObject(),
                    playSnapshotId: selectedPlay.id,
                  }),
                );
                setIsClosing(true);
              }}
            />
          )}
        </View>
      </View>
    </View>
  );
};
