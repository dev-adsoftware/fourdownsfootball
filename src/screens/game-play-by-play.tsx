import React from 'react';
import {Animated} from 'react-native';
import {IconButton} from '../components/buttons/icon-button';
import {Text} from '../primitives/text';
import {View} from '../primitives/view';
import {LogoSvg} from '../components/svg/logo-svg';
import {GameDetailQueryResponseDto} from '../services/dtos';
import {GameDetailExtendedPossessionDto} from '../services/dtos/queries/game-detail/game-detail-query-response.dto';
import {GameEngine} from '../utilities/game-engine';

interface GamePlayByPlayScreenProps {
  game: GameDetailQueryResponseDto;
}

interface Possession {
  possession: GameDetailExtendedPossessionDto;
  expanded: boolean;
}

interface _PossessionListItem extends Possession {
  first?: boolean;
  last?: boolean;
  awayTeamAbbr: string;
  awayTeamScore: number;
  homeTeamAbbr: string;
  homeTeamScore: number;
  onPress: () => void;
}

const _PossessionListItemComponent: React.FC<_PossessionListItem> = props => {
  const [detailHeight, setDetailHeight] = React.useState(0);

  const detailHeightsRef = React.useRef<(number | undefined)[]>([]);

  const {current: animationValue} = React.useRef<Animated.Value>(
    new Animated.Value(0),
  );

  React.useEffect(() => {
    if (props.expanded) {
      Animated.timing(animationValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(animationValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [props.expanded, animationValue]);

  return (
    <>
      <View
        row
        w="full"
        bg="white"
        alignItems="flex-start"
        justifyContent="space-between"
        borderTopWidth={props.first ? undefined : 1}
        borderBottomWidth={props.last ? undefined : 1}
        borderHorizontalColor="separator"
        pt={15}
        pb={10}
        px={15}
        mt={-1}>
        <View
          animated
          animatedRotate={{
            animatedValue: animationValue,
            range: ['0deg', '180deg'],
          }}
          mt={0}>
          <IconButton
            icon={'chevron-down'}
            color="primaryDark"
            size={12}
            pressableAreaPadding={10}
            onPress={() => {
              props.onPress();
            }}
          />
        </View>
        <View pl={15} pr={5}>
          <LogoSvg size={20} />
        </View>
        <View flex={1}>
          <Text
            mt={-5}
            text={props.possession.headline.toUpperCase()}
            typeFace="klavikaCondensedMedium"
            fontSize={18}
          />
          <Text
            mt={-5}
            text={props.possession.summary.toUpperCase()}
            typeFace="sourceSansProRegular"
            fontSize={11}
            color="placeholderText"
          />
        </View>
        <View alignItems="center">
          <Text
            mt={-5}
            text={props.awayTeamAbbr}
            typeFace="sourceSansProRegular"
            fontSize={12}
            color="placeholderText"
          />
          <Text
            mt={-5}
            text={String(props.awayTeamScore)}
            typeFace="klavikaCondensedMedium"
            fontSize={17}
          />
        </View>
        <View alignItems="center" ml={30}>
          <Text
            mt={-5}
            text={props.homeTeamAbbr}
            typeFace="sourceSansProRegular"
            fontSize={12}
            color="placeholderText"
          />
          <Text
            mt={-5}
            text={String(props.homeTeamScore)}
            typeFace="klavikaCondensedMedium"
            fontSize={17}
          />
        </View>
      </View>
      <View
        animated
        animatedHeight={{
          animatedValue: animationValue,
          range: [0, detailHeight],
        }}
        bg="white"
        w="full"
        overflow="hidden">
        {props.possession.playResults.map((playResult, index) => {
          return (
            <View
              key={index}
              h={detailHeightsRef.current[index]}
              w="full"
              borderBottomColor="separator"
              borderBottomWidth={1}>
              <Text
                p={15}
                position="absolute"
                text={`(${GameEngine.formatGameTime(
                  playResult.startTimeRemaining,
                )} - ${GameEngine.getPeriodName(playResult.period)}) ${
                  playResult.description
                }`}
                typeFace="sourceSansProRegular"
                fontSize={12}
                onLayout={e => {
                  detailHeightsRef.current[index] = e.nativeEvent.layout.height;
                  if (
                    detailHeight === 0 &&
                    !detailHeightsRef.current.includes(undefined)
                  ) {
                    const totalHeight = detailHeightsRef.current.reduce(
                      (prev, curr) => {
                        return (prev || 0) + (curr || 0);
                      },
                      0,
                    );
                    setDetailHeight(totalHeight || 0);
                  }
                }}
              />
            </View>
          );
        })}
      </View>
    </>
  );
};

export const GamePlayByPlayScreen: React.FC<
  GamePlayByPlayScreenProps
> = props => {
  const [possessions, setPossessions] = React.useState<Possession[]>([]);

  React.useEffect(() => {
    setPossessions(
      props.game.possessions.map(possession => {
        return {
          possession,
          expanded: false,
        };
      }),
    );
  }, [props.game.possessions]);

  return (
    <>
      <View w="full" flex={1} bg="oddLayerSurface" pt={10} alignItems="center">
        {possessions.map((possession, index) => {
          return (
            <View key={index} w="full">
              <_PossessionListItemComponent
                first={index === 0}
                possession={possession.possession}
                expanded={possession.expanded}
                awayTeamAbbr={GameEngine.getTeamAbbreviation(
                  props.game.awayTeam,
                )}
                awayTeamScore={props.game.awayTeamScore}
                homeTeamAbbr={GameEngine.getTeamAbbreviation(
                  props.game.homeTeam,
                )}
                homeTeamScore={props.game.homeTeamScore}
                onPress={() => {
                  setPossessions(
                    possessions.map((thisPossession, thisIndex) => {
                      return {
                        ...thisPossession,
                        expanded:
                          thisIndex === index
                            ? !thisPossession.expanded
                            : thisPossession.expanded,
                      };
                    }),
                  );
                }}
              />
            </View>
          );
        })}
      </View>
    </>
  );
};
