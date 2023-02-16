import React from 'react';
import {Animated, LayoutAnimation} from 'react-native';
import {IconButton} from '../components/buttons/icon-button';
import {Pressable} from '../components/primitives/pressable';
import {Text} from '../components/primitives/text';
import {View} from '../components/primitives/view';
import {LogoSvg} from '../components/svg/logo-svg';
import {GameDetailQueryResponseDto} from '../services/dtos';
import {GameDetailExtendedGameLogDto} from '../services/dtos/queries/game-detail/game-detail-query-response.dto';

interface GamePlayByPlayScreenProps {
  game: GameDetailQueryResponseDto;
}

interface LogGroup {
  log: GameDetailExtendedGameLogDto;
  expanded: boolean;
}

interface _LogGroupHeader extends LogGroup {
  first?: boolean;
  last?: boolean;
  awayTeamAbbr: string;
  awayTeamScore: number;
  homeTeamAbbr: string;
  homeTeamScore: number;
  onPress: () => void;
}

const _LogGroupHeader: React.FC<_LogGroupHeader> = props => {
  const [detailHeight, setDetailHeight] = React.useState(0);

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
  }, [props.expanded]);

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
          mt={-10}>
          <IconButton
            icon={'chevron-down'}
            color="primaryDark"
            size="xs"
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
            text="GAME STARTED"
            typeFace="klavikaCondensedMedium"
            fontSize="body"
          />
          <Text
            mt={-5}
            text={props.log.headline}
            typeFace="sourceSansProRegular"
            fontSize="caption1"
            color="disabled"
          />
        </View>
        <View alignItems="center">
          <Text
            mt={-5}
            text={props.awayTeamAbbr}
            typeFace="sourceSansProRegular"
            fontSize="footnote"
            color="disabled"
          />
          <Text
            mt={-5}
            text={String(props.awayTeamScore)}
            typeFace="klavikaCondensedMedium"
            fontSize="body"
          />
        </View>
        <View alignItems="center" ml={30}>
          <Text
            mt={-5}
            text={props.homeTeamAbbr}
            typeFace="sourceSansProRegular"
            fontSize="footnote"
            color="disabled"
          />
          <Text
            mt={-5}
            text={String(props.homeTeamScore)}
            typeFace="klavikaCondensedMedium"
            fontSize="body"
          />
        </View>
      </View>
      <View
        row
        animated
        animatedHeight={{
          animatedValue: animationValue,
          range: [0, detailHeight],
        }}
        bg="white"
        w="full"
        overflow="hidden">
        <View flex={1}>
          <Text
            p={15}
            position="absolute"
            text={`(Pregame) ${props.log.details[0]}`}
            typeFace="sourceSansProRegular"
            fontSize="footnote"
            onLayout={
              detailHeight === 0
                ? e => {
                    if (detailHeight === 0) {
                      setDetailHeight(e.nativeEvent.layout.height);
                    }
                  }
                : undefined
            }
          />
        </View>
      </View>
    </>
  );
};

export const GamePlayByPlayScreen: React.FC<
  GamePlayByPlayScreenProps
> = props => {
  const [logGroups, setLogGroups] = React.useState<LogGroup[]>([]);

  React.useEffect(() => {
    setLogGroups(
      props.game.logs.concat(props.game.logs).map(log => {
        return {
          log,
          expanded: false,
        };
      }),
    );
  }, [props.game.logs]);

  return (
    <>
      <View w="full" flex={1} bg="oddLayerSurface" pt={10} alignItems="center">
        {logGroups.map((logGroup, index) => {
          return (
            <View key={index}>
              <_LogGroupHeader
                first={index === 0}
                log={logGroup.log}
                expanded={logGroup.expanded}
                awayTeamAbbr="LR"
                awayTeamScore={0}
                homeTeamAbbr="KC"
                homeTeamScore={10}
                onPress={() => {
                  setLogGroups(
                    logGroups.map((thisLogGroup, thisIndex) => {
                      return {
                        ...thisLogGroup,
                        expanded:
                          thisIndex === index
                            ? !thisLogGroup.expanded
                            : thisLogGroup.expanded,
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
