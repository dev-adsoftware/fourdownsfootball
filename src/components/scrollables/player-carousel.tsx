import React from 'react';
import {FlatList as RNFlatList, useWindowDimensions} from 'react-native';
import {Theme, useTheme} from '../../providers/theme';
import {PlayerSnapshotDto} from '../../services/dtos';
import {Alignment} from '../../services/dtos/types/alignment';
import {AttributeKey} from '../../services/dtos/types/attribute-key';
import {Position} from '../../services/dtos/types/position';
import {GameEngine} from '../../utilities/game-engine';
import {FlatList} from '../../primitives/flatlist';
import {Text} from '../../primitives/text';
import {View} from '../../primitives/view';
import {ProgressBar} from '../progress-indicators/progress-bar';
import {FaceSvg} from '../svg/faces/face-svg';

interface PlayerCarouselProps {
  players: (PlayerSnapshotDto & {alignment?: Alignment})[];
}

const PORTRAIT_HEADER_FONT_SIZE = 12;
const PORTRAIT_NAME_FONT_SIZE = 12;

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
      // bg="portraitSurface"
      customBg="skyblue"
      borderColor="darkText"
      borderWidth={2}
      mr={2}
      borderRadius={4}>
      <View
        flex={1}
        w="full"
        borderTopRadius={4}
        // p={0}
        // bg="oddLayerSurface"
        // customBg="primaryLight"
        alignItems="center"
        justifyContent="flex-end">
        {/* <Icon icon="users" color="skinTone" size={20} /> */}
        <View ml={20}>
          <FaceSvg
            w={item.width * 0.62}
            h={item.width * 0.68 * 1.5}
            body="body3"
            jersey="jersey5"
            head="head1"
            hairBackground="longHairBackground"
            ear="ear2"
            eyeLine="eyeLine4"
            smileLine="smileLine4"
            miscLine="freckles1"
            facialHair="beard1"
            eye="eye19"
            eyebrow="eyebrow20"
            mouth="straight"
            nose="nose1"
            hair="afro2"
            skinColor="#bb876f"
            primaryColor="yellow"
            secondaryColor="red"
            accentColor="blue"
            headShaveColor="rgba(0,0,0,0)"
            faceShaveColor="rgba(0,0,0,0)"
            hairColor="#57330f"
          />
        </View>
        <View position="absolute" top={0} left={2}>
          <Text
            text={(
              GameEngine.getAlignmentAbbr(item.alignment) || item.position
            ).toUpperCase()}
            // text="OLB"
            typeFace="klavikaCondensedBold"
            fontSize={PORTRAIT_HEADER_FONT_SIZE}
            color="darkText"
          />
        </View>
        <View position="absolute" top={12} left={3}>
          <Text
            text={`${item.jerseyNumber}`}
            typeFace="klavikaCondensedBold"
            fontSize={PORTRAIT_HEADER_FONT_SIZE}
            color="darkText"
          />
        </View>
      </View>
      <View
        // h={14}
        // pb={3}
        w="full"
        bg="oddLayerSurface"
        borderTopWidth={1}
        borderTopColor="darkText"
        mt={-5}
        px={2}>
        <Text
          mt={-1}
          numberOfLines={1}
          text={item.name}
          typeFace="sourceSansProSemibold"
          fontSize={PORTRAIT_NAME_FONT_SIZE}
          color="darkText"
        />
      </View>
      <View
        alignItems="center"
        pb={2}
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
      borderBottomColor="darkText">
      <View
        row
        w="full"
        py={1}
        alignItems="center"
        justifyContent="center"
        bg="white"
        borderColor="darkText"
        borderTopWidth={1}>
        <View bg="darkText" h={1} flex={1} mx={5} />
        <Text
          text="PLAYERS IN THE HUDDLE"
          typeFace="sourceSansProBold"
          fontSize={13}
          color="darkText"
        />
        <View bg="darkText" h={1} flex={1} mx={5} />
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