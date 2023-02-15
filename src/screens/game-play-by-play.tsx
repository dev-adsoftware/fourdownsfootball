import React from 'react';
import {Animated, LayoutAnimation} from 'react-native';
import {IconButton} from '../components/buttons/icon-button';
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
  awayTeamAbbr: string;
  awayTeamScore: number;
  homeTeamAbbr: string;
  homeTeamScore: number;
  onPress: () => void;
}

const _LogGroupHeader: React.FC<_LogGroupHeader> = props => {
  return (
    <View
      row
      w="full"
      bg="white"
      alignItems="flex-start"
      justifyContent="space-between"
      borderBottomWidth={1}
      borderBottomColor="separator"
      py={15}
      px={15}>
      <View rotate={props.expanded ? '180deg' : '0deg'}>
        <IconButton
          icon={'chevron-down'}
          color="primaryDark"
          size="xs"
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
  );
};

export const GamePlayByPlayScreen: React.FC<
  GamePlayByPlayScreenProps
> = props => {
  const [expandedLogIndex, setExpandedLogIndex] = React.useState(-1);

  return (
    <>
      <View w="full" flex={1} bg="oddLayerSurface" pt={10} alignItems="center">
        {props.game.logs.concat(props.game.logs).map((logGroup, index) => {
          return (
            <View key={index}>
              {/* <_LogGroupHeader
                log={logGroup.log}
                expanded={logGroup.expanded}
                awayTeamAbbr="LR"
                awayTeamScore={0}
                homeTeamAbbr="KC"
                homeTeamScore={10}
                onPress={() => {
                  LayoutAnimation.configureNext(
                    LayoutAnimation.Presets.easeInEaseOut,
                  );
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
              /> */}
              <View
                row
                w="full"
                bg="white"
                alignItems="flex-start"
                justifyContent="space-between"
                borderBottomWidth={1}
                borderBottomColor="separator"
                py={15}
                px={15}>
                <View rotate={index === expandedLogIndex ? '180deg' : '0deg'}>
                  <IconButton
                    icon={
                      'chevron-down'
                      // expandedLogSequence === log.sequence
                      //   ? 'chevron-up'
                      //   : 'chevron-down'
                    }
                    color="primaryDark"
                    size="xs"
                    onPress={() => {
                      LayoutAnimation.configureNext(
                        LayoutAnimation.Presets.easeInEaseOut,
                      );
                      if (expandedLogIndex === index) {
                        setExpandedLogIndex(-1);
                      } else {
                        setExpandedLogIndex(index);
                      }
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
                    text={logGroup.headline}
                    typeFace="sourceSansProRegular"
                    fontSize="caption1"
                    color="disabled"
                  />
                </View>
                <View alignItems="center">
                  <Text
                    mt={-5}
                    text="LR"
                    typeFace="sourceSansProRegular"
                    fontSize="footnote"
                    color="disabled"
                  />
                  <Text
                    mt={-5}
                    text={String(props.game.awayTeamScore)}
                    typeFace="klavikaCondensedMedium"
                    fontSize="body"
                  />
                </View>
                <View alignItems="center" ml={30}>
                  <Text
                    mt={-5}
                    text="KC"
                    typeFace="sourceSansProRegular"
                    fontSize="footnote"
                    color="disabled"
                  />
                  <Text
                    mt={-5}
                    text={String(props.game.homeTeamScore)}
                    typeFace="klavikaCondensedMedium"
                    fontSize="body"
                  />
                </View>
              </View>
              <View
                row
                h={index === expandedLogIndex ? undefined : 0}
                borderBottomWidth={index === expandedLogIndex ? 1 : 0}
                bg="white"
                w="full"
                borderBottomColor="separator">
                <View flex={1} p={15}>
                  <Text
                    text={`(Pregame) ${logGroup.details[0]}`}
                    typeFace="sourceSansProRegular"
                    fontSize="footnote"
                  />
                </View>
              </View>
            </View>
          );
        })}
      </View>
    </>
  );
};
