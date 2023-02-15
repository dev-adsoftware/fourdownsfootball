import React from 'react';
import {LayoutAnimation} from 'react-native';
import {IconButton} from '../components/buttons/icon-button';
import {Text} from '../components/primitives/text';
import {View} from '../components/primitives/view';
import {LogoSvg} from '../components/svg/logo-svg';
import {GameDetailQueryResponseDto} from '../services/dtos';

interface GamePlayByPlayScreenProps {
  game: GameDetailQueryResponseDto;
}

export const GamePlayByPlayScreen: React.FC<
  GamePlayByPlayScreenProps
> = props => {
  const [expandedLogSequence, setExpandedLogSequence] = React.useState('');

  return (
    <>
      <View w="full" flex={1} bg="oddLayerSurface" pt={10} alignItems="center">
        {props.game.logs.concat(props.game.logs).map((log, index) => {
          return (
            <View key={index}>
              <View
                row
                w="full"
                bg="white"
                alignItems="flex-start"
                justifyContent="space-between"
                borderBottomWidth={1}
                borderBottomColor="separator"
                py={15}
                px={15}
                mt={-1}>
                <IconButton
                  icon={
                    expandedLogSequence === log.sequence
                      ? 'chevron-up'
                      : 'chevron-down'
                  }
                  color="primaryDark"
                  size="xs"
                  onPress={() => {
                    LayoutAnimation.configureNext(
                      LayoutAnimation.Presets.easeInEaseOut,
                    );
                    if (expandedLogSequence === log.sequence) {
                      setExpandedLogSequence('');
                    } else {
                      setExpandedLogSequence(log.sequence);
                    }
                  }}
                />
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
                    text={log.headline}
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
                h={expandedLogSequence === log.sequence ? undefined : 0}
                bg="white"
                w="full"
                p={expandedLogSequence === log.sequence ? 10 : 0}
                borderBottomWidth={1}
                borderBottomColor="separator"
                mb={1}>
                <Text
                  text={`(Pregame) ${log.details[0]}`}
                  typeFace="sourceSansProRegular"
                  fontSize="footnote"
                />
              </View>
            </View>
          );
        })}
      </View>
    </>
  );
};
