import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Animated,
  Easing,
} from 'react-native';
import {GameControlPanel} from '../../components/games/game-control-panel';
import {GameField} from '../../components/games/game-field';
import {GameMomentumBar} from '../../components/games/game-momentum-bar';
import {GamePlaybook} from '../../components/games/game-playbook';
import {useData} from '../../providers/data';
import {useTheme} from '../../providers/theme';
import {GameDetailTabParamList} from '../../stacks/game-detail';
import {GameEngine} from '../../utilities/game-engine';
import {GamePlayerCarousel} from '../../components/games/game-player-carousel';

type Properties = {
  navigation: NativeStackNavigationProp<GameDetailTabParamList>;
};

const GamePlayScreen: React.FC<Properties> = () => {
  const [playbookOpacity, setPlaybookOpacity] = React.useState(0);

  const animationPlaybookOpacity = React.useRef(new Animated.Value(0)).current;
  const fadePlaybook = React.useCallback(
    (inOut: 'in' | 'out') => {
      console.log('fading playbook');
      if (!animationPlaybookOpacity.hasListeners()) {
        animationPlaybookOpacity.setValue(inOut === 'in' ? 0 : 1);
        animationPlaybookOpacity.addListener(animatedValue => {
          setPlaybookOpacity(animatedValue.value);
        });
        Animated.timing(animationPlaybookOpacity, {
          toValue: inOut === 'in' ? 1 : 0,
          duration: 50,
          useNativeDriver: true,
          easing: Easing.linear,
        }).start(() => {
          animationPlaybookOpacity.removeAllListeners();
        });
      }
    },
    [animationPlaybookOpacity],
  );

  const {activeGame, ownerDashboard} = useData();
  const theme = useTheme();
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    gameFieldContainer: {
      backgroundColor: theme.colors.grass,
      width: '100%',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    overlayContainer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      height: 195,
      width: '100%',
      // marginTop: -195,
      alignItems: 'center',
      justifyContent: 'space-between',
      zIndex: 1,
    },
    controlPanelContainer: {
      width: '80%',
    },
    playbookOverlayContainer: {
      position: 'absolute',
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      zIndex: 99,
      backgroundColor: 'rgba(0,0,0,0.8)',
      padding: 15,
    },
    playbookContainer: {
      backgroundColor: theme.colors.background,
      width: '100%',
      height: '100%',
      borderWidth: 1,
      borderColor: theme.colors.separator,
      borderRadius: 5,
    },
    playbookHeaderContainer: {
      height: 35,
      width: '100%',
      // backgroundColor: theme.colors.secondaryBackground,
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,
      flexDirection: 'row',
      // alignItems: 'center',
    },
    playbookHeaderTitleContainer: {
      flex: 1,
      height: 25,
      // flexDirection: 'row',
      backgroundColor: theme.colors.secondaryBackground,
      borderTopLeftRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 5,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.separator,
    },
    playbookHeaderTitleText: {
      ...theme.typography.caption1,
      fontWeight: 'bold',
    },
    playbookHeaderCloseButtonContainer: {
      width: 35,
      height: 35,
      backgroundColor: theme.colors.blue,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderTopRightRadius: 5,
      borderBottomLeftRadius: 5,
      borderWidth: 2,
      borderColor: theme.colors.separator,
      marginTop: -1,
      marginRight: -1,
    },
    playbookGridContainer: {
      height: '100%',
      width: '100%',
      paddingHorizontal: 3,
    },
    playbookSectionHeader: {
      width: '100%',
      flexDirection: 'row',
      paddingHorizontal: 5,
      marginTop: 5,
      marginBottom: 1,
    },
    playbookSectionHeaderText: {
      ...theme.typography.caption2,
      fontWeight: 'bold',
    },
    playbookRow: {
      width: '100%',
      height: 70,
      flexDirection: 'row',
      marginBottom: 2,
    },
    playbookColumn: {
      flex: 1,
      borderWidth: 1,
      borderColor: theme.colors.separator,
      height: '100%',
      margin: 2,
      borderRadius: 5,
      backgroundColor: theme.colors.secondaryBackground,
    },
  });

  return (
    <>
      {activeGame.item ? (
        activeGame.item?.state === 'loading' ? (
          <ActivityIndicator />
        ) : (
          <View style={[styles.container]}>
            <GameMomentumBar
              teamName={
                GameEngine.getOpposingTeam(
                  activeGame.item,
                  ownerDashboard.item.id,
                ).nickname
              }
              teamPrimaryColor={
                GameEngine.getOpposingTeam(
                  activeGame.item,
                  ownerDashboard.item.id,
                ).primaryColor
              }
              momentum={27}
              timeRemaining={2 * 24 * 60 * 60 + 22 * 60 * 60 + 4 * 60 + 4}
              actionIconName="user-friends"
              onActionPressed={async () => {
                console.log('checking opponent roster');
              }}
            />
            <View style={[styles.gameFieldContainer]}>
              <GameField
                ballOn={50}
                opponentTeamName={
                  GameEngine.getOpposingTeam(
                    activeGame.item,
                    ownerDashboard.item.id,
                  ).nickname
                }
                opponentTeamPrimaryColor={
                  GameEngine.getOpposingTeam(
                    activeGame.item,
                    ownerDashboard.item.id,
                  ).primaryColor
                }
                myTeamName={
                  GameEngine.getOwnerTeam(
                    activeGame.item,
                    ownerDashboard.item.id,
                  ).nickname
                }
                myTeamPrimaryColor={
                  GameEngine.getOwnerTeam(
                    activeGame.item,
                    ownerDashboard.item.id,
                  ).primaryColor
                }
              />
              <View style={[styles.overlayContainer]}>
                <View style={[styles.controlPanelContainer]}>
                  <GameControlPanel
                    onPressPlaybook={() => fadePlaybook('in')}
                  />
                </View>
                <GamePlayerCarousel />
              </View>
            </View>
            <GameMomentumBar
              teamName={
                GameEngine.getOwnerTeam(activeGame.item, ownerDashboard.item.id)
                  .nickname
              }
              teamPrimaryColor={
                GameEngine.getOwnerTeam(activeGame.item, ownerDashboard.item.id)
                  .primaryColor
              }
              momentum={0}
              timeRemaining={2 * 24 * 60 * 60 + 5 * 60 * 60 + 34 * 60 + 15}
              actionIconName="cog"
              onActionPressed={async () => {
                console.log('checking settings');
              }}
            />
            {playbookOpacity > 0 ? (
              <View
                style={[
                  styles.playbookOverlayContainer,
                  {opacity: playbookOpacity},
                ]}>
                <GamePlaybook onClose={() => fadePlaybook('out')} />
              </View>
            ) : (
              <></>
            )}
          </View>
        )
      ) : (
        <></>
      )}
    </>
  );
};

export {GamePlayScreen};