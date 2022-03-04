import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {GamePlayField} from '../../components/games/game-play-field';
import {useData} from '../../providers/data';
import {useTheme} from '../../providers/theme';
import {GameDetailExtendedTeamDto} from '../../services/dtos/queries/game-detail/game-detail-query-response.dto';
import {GameDetailTabParamList} from '../../stacks/game-detail';

type Properties = {
  navigation: NativeStackNavigationProp<GameDetailTabParamList>;
};

const GamePlayScreen: React.FC<Properties> = () => {
  const {activeGame} = useData();
  const theme = useTheme();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    text: {
      color: theme.colors.text,
      padding: 10,
      ...theme.typography.largeTitle,
    },
  });

  const getAvatarAbbreviation = (team?: GameDetailExtendedTeamDto) => {
    if (!team) {
      return '?';
    }

    return `${team.town.name.slice(0, 1).toUpperCase()}${team.nickname
      .slice(0, 1)
      .toUpperCase()}`;
  };

  return (
    <>
      <View style={[styles.container]}>
        <GamePlayField
          awayTeamAbbr={getAvatarAbbreviation(activeGame.item?.awayTeam)}
          awayTeamColor={
            activeGame.item?.awayTeam
              ? (
                  theme.colors as {
                    [x: string]: string;
                  }
                )[activeGame.item.awayTeam.primaryColor.toLowerCase()]
              : theme.colors.red
          }
          homeTeamAbbr={getAvatarAbbreviation(activeGame.item?.homeTeam)}
          homeTeamColor={
            activeGame.item?.homeTeam
              ? (
                  theme.colors as {
                    [x: string]: string;
                  }
                )[activeGame.item.homeTeam.primaryColor.toLowerCase()]
              : theme.colors.blue
          }
          ballOn={35 || activeGame.item?.ballOn}
          distance={5 || activeGame.item?.distance}
          driveStartYardLine={20}
          lastPlay={{gainLoss: 15, playType: 'run'}}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            marginHorizontal: 10,
          }}>
          <View
            style={{
              padding: 10,
              width: '100%',
              borderBottomWidth: 1,
              borderBottomColor: theme.colors.separator,
            }}>
            <Text
              style={{
                ...theme.typography.footnote,
                color: theme.colors.secondaryText,
              }}>
              (Pregame) Awaiting coin toss decision
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            paddingTop: 10,
            alignItems: 'center',
          }}>
          <View
            style={{
              paddingLeft: 20,
              flex: 1,
            }}>
            <FontAwesome5Icon
              // style={[styles.itemPlayerImage]}
              name="user"
              solid
              size={28}
              color={theme.colors.black}
            />
          </View>
          <View style={{flex: 7, marginRight: 10}}>
            <Text
              style={{
                ...theme.typography.subheading,
                textAlign: 'left',
              }}>
              {activeGame.item?.awayTeam.nickname} are the away team so the coin
              toss decision is yours.{'\n\n'}
              Select crown or shield.
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            paddingTop: 30,
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              backgroundColor: 'silver',
              borderColor: 'black',
              borderWidth: 2,
              borderRadius: 50,
              width: 100,
              height: 100,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 10,
            }}>
            {/* <Text style={{...theme.typography.largeTitle, color: 'black'}}>
              H
            </Text> */}
            <FontAwesome5Icon
              // style={[styles.itemPlayerImage]}
              name="crown"
              solid
              size={50}
              color={theme.colors.black}
            />
          </View>
          <View
            style={{
              backgroundColor: 'silver',
              borderColor: 'black',
              borderRadius: 50,
              borderWidth: 2,
              width: 100,
              height: 100,
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: 10,
            }}>
            {/* <Text style={{...theme.typography.largeTitle, color: 'black'}}>
              T
            </Text>
             */}
            <FontAwesome5Icon
              // style={[styles.itemPlayerImage]}
              name="shield-alt"
              solid
              size={50}
              color={theme.colors.black}
            />
          </View>
        </View>
      </View>
    </>
  );
};

export {GamePlayScreen};
