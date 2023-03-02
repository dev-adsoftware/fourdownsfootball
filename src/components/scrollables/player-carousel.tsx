import React from 'react';
import {FlatList as RNFlatList, useWindowDimensions} from 'react-native';
import {Theme, useTheme} from '../../providers/theme';
import {PlayerSnapshotDto} from '../../services/dtos';
import {Alignment} from '../../services/dtos/types/alignment';
import {AttributeKey} from '../../services/dtos/types/attribute-key';
import {Position} from '../../services/dtos/types/position';
import {GameEngine} from '../../utilities/game-engine';
import {FlatList} from '../primitives/flatlist';
import {Icon} from '../primitives/icon';
import {Text} from '../primitives/text';
import {View} from '../primitives/view';
import {ProgressBar} from '../progress-indicators/progress-bar';

interface PlayerCarouselProps {
  players: (PlayerSnapshotDto & {alignment?: Alignment})[];
}

const _RenderCarouselItem = ({
  item,
}: {
  item: {
    id: string;
    alignment?: Alignment;
    position: string;
    jerseyNumber: number;
    name: string;
    health: number;
    borderColor: string;
    theme: Theme;
    width: number;
  };
}) => {
  return (
    <View
      w={item.width}
      bg="portraitSurface"
      borderColor="primaryText"
      borderWidth={1}
      mr={2}
      borderRadius={4}>
      <View
        flex={1}
        w="full"
        borderTopRadius={4}
        // bg="oddLayerSurface"
        customBg="primaryLight"
        alignItems="center"
        justifyContent="flex-end">
        <Icon name="users" color="skinTone" size="4xl" />
        <View position="absolute" top={0} left={3}>
          <Text
            text={(
              GameEngine.getAlignmentAbbr(item.alignment) || item.position
            ).toUpperCase()}
            typeFace="klavikaCondensedBold"
            fontSize="footnote"
            color="primaryText"
          />
        </View>
        <View position="absolute" top={0} right={3}>
          <Text
            text={`#${item.jerseyNumber}`}
            typeFace="klavikaCondensedBold"
            fontSize="footnote"
            color="primaryText"
          />
        </View>
      </View>
      <View
        // h={14}
        // pb={3}
        w="full"
        bg="oddLayerSurface"
        borderTopWidth={1}
        borderTopColor="primaryText"
        mt={-5}
        px={2}>
        <Text
          mt={-2}
          text={item.name}
          typeFace="klavikaCondensedMedium"
          fontSize="caption1"
          color="primaryText"
        />
      </View>
      <View
        alignItems="center"
        pb={4}
        bg="oddLayerSurface"
        borderBottomRadius={4}>
        <ProgressBar
          percentComplete={item.health / 2}
          filledColor={item.theme.getRedGreenGradient(item.health)}
          unfilledColor="black"
          height={6}
          width={item.width - 12}
        />
      </View>
    </View>
  );
};

export const PlayerCarousel: React.FC<PlayerCarouselProps> = props => {
  const flatListRef = React.useRef<
    RNFlatList<{
      id: string;
      alignment: Alignment;
      position: Position;
      jerseyNumber: number;
      health: number;
      name: string;
      borderColor: string;
      theme: Theme;
      width: number;
    }>
  >(null);

  const theme = useTheme();
  const {width} = useWindowDimensions();

  return (
    <View
      h={110}
      w="full"
      bg="oddLayerSurface"
      pb={1}
      borderBottomWidth={1}
      borderBottomColor="primaryText">
      <View
        row
        w="full"
        py={1}
        alignItems="center"
        justifyContent="center"
        bg="white"
        borderColor="primaryText"
        borderTopWidth={1}>
        <View bg="primaryText" h={1} flex={1} mx={5} />
        <Text
          text="PLAYERS IN THE HUDDLE"
          typeFace="sourceSansProBold"
          fontSize="footnote"
          color="primaryText"
        />
        <View bg="primaryText" h={1} flex={1} mx={5} />
      </View>
      <View px={1} flex={1}>
        <FlatList
          myRef={flatListRef}
          data={props.players.map(player => {
            return {
              id: player.id,
              alignment: player.alignment!,
              position: player.position,
              jerseyNumber: player.jerseyNumber,
              health: player.attributes[AttributeKey.Stamina].value,
              name: player.lastName,
              borderColor: 'white',
              theme,
              width: (width - 20) / 5 - 5,
            };
          })}
          renderItem={_RenderCarouselItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          bounces={false}
          decelerationRate="normal"
        />
      </View>
    </View>
  );
};
