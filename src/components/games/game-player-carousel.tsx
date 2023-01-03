import React from 'react';
import {Dimensions, FlatList, StyleSheet, Text, View} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {ProgressBar} from '../core/progress-indicators/progress-bar';
import {InjectedThemeProps, withTheme} from '../../hoc/with-styles';
import {PlayerSnapshotDto} from '../../services/dtos';
import {Alignment} from '../../services/dtos/types/alignment';
import {GameEngine} from '../../utilities/game-engine';
import {AttributeKey} from '../../services/dtos/types/attribute-key';

interface Properties extends InjectedThemeProps {
  players: (PlayerSnapshotDto & {alignment?: Alignment})[];
}

const Component: React.FC<Properties> = props => {
  const {players, theme} = props;
  const styles = StyleSheet.create({
    gamePlayPlayersOnFieldCarouselContainer: {
      height: 110,
      width: '100%',
      backgroundColor: 'rgba(0,0,0,0.6)',
      //   flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingHorizontal: 3,
      paddingVertical: 3,
    },
    gamePlayPlayersOnFieldCarouselItemContainer: {
      height: '100%',
      width: (Dimensions.get('window').width - 20) / 5 - 5,
      backgroundColor: theme.colors.secondaryBackground,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: theme.colors.white,
      marginHorizontal: 1,
    },
    gamePlayPlayersOnFieldCarouselItemPositionContainer: {
      width: '100%',
      height: 15,
      backgroundColor: theme.colors.secondaryBackground,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
    },
    gamePlayPlayersOnFieldCarouselItemPortraitContainer: {
      width: '100%',
      flex: 1,
      backgroundColor: theme.colors.secondaryBackground,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      alignItems: 'center',
      justifyContent: 'flex-end',
      marginBottom: -5,
    },
    gamePlayPlayersOnFieldCarouselItemPositionText: {
      ...theme.typography.caption2,
      color: theme.colors.text,
      fontWeight: 'bold',
      position: 'absolute',
      left: 0,
      top: 0,
      paddingLeft: 5,
      paddingTop: 2,
    },
    gamePlayPlayersOnFieldCarouselItemJerseyNumberText: {
      ...theme.typography.caption2,
      color: theme.colors.text,
      fontWeight: 'bold',
      position: 'absolute',
      right: 0,
      top: 0,
      paddingRight: 5,
      paddingTop: 2,
    },
    gamePlayPlayersOnFieldCarouselItemStatusContainer: {
      width: '100%',
      height: 15,
      paddingHorizontal: 3,
      backgroundColor: theme.colors.secondaryBackground,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      alignItems: 'center',
    },
    gamePlayPlayersOnFieldCarouselItemNameContainer: {
      width: '100%',
      height: 15,
      backgroundColor: theme.colors.secondaryBackground,
      borderTopWidth: 1,
      borderTopColor: theme.colors.secondaryText,
      alignItems: 'center',
      paddingHorizontal: 2,
    },
    gamePlayPlayersOnFieldCarouselItemNameText: {
      ...theme.typography.caption2,
      color: theme.colors.text,
      fontWeight: 'bold',
      letterSpacing: -0.5,
    },
  });

  const getRedGreenGradient = (percent: number): string => {
    if (percent <= 50) {
      return `rgba(255,${0 + ((percent * 2) / 100) * 255},0,1)`;
    }
    return `rgba(${255 - (((percent - 50) * 2) / 100) * 255},255,0,1)`;
  };

  const renderCarouselItem = ({
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
    };
  }) => {
    return (
      <View
        style={[
          styles.gamePlayPlayersOnFieldCarouselItemContainer,
          {borderColor: item.borderColor},
        ]}>
        <View
          style={[styles.gamePlayPlayersOnFieldCarouselItemPortraitContainer]}>
          <FontAwesome5Icon
            name="user"
            color={theme.colors.text}
            solid
            size={54}
          />
          <Text style={[styles.gamePlayPlayersOnFieldCarouselItemPositionText]}>
            {(
              GameEngine.getAlignmentAbbr(item.alignment) || item.position
            ).toUpperCase()}
          </Text>
          <Text
            style={[styles.gamePlayPlayersOnFieldCarouselItemJerseyNumberText]}>
            {`#${item.jerseyNumber}`}
          </Text>
        </View>
        <View style={[styles.gamePlayPlayersOnFieldCarouselItemNameContainer]}>
          <Text
            style={[styles.gamePlayPlayersOnFieldCarouselItemNameText]}
            numberOfLines={1}>
            {item.name}
          </Text>
        </View>
        <View
          style={[styles.gamePlayPlayersOnFieldCarouselItemStatusContainer]}>
          <ProgressBar
            percentComplete={item.health}
            filledColor={getRedGreenGradient(item.health)}
            unfilledColor={theme.colors.black}
            height={10}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.gamePlayPlayersOnFieldCarouselContainer]}>
      <FlatList
        data={players.map(player => {
          return {
            id: player.id,
            alignment: player.alignment,
            position: player.position,
            jerseyNumber: player.jerseyNumber,
            health: player.attributes[AttributeKey.Stamina].value,
            name: player.lastName,
            borderColor: theme.colors.white,
          };
        })}
        renderItem={renderCarouselItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        bounces={true}
        decelerationRate="normal"
      />
    </View>
  );
};

export const GamePlayerCarousel = withTheme(Component);
