import React from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {InjectedThemeProps, withTheme} from '../../hoc/with-theme';
import {GameDetailExtendedPlaySnapshotDto} from '../../services/dtos/queries/game-detail/game-detail-query-response.dto';
import {PlaySubCategory} from '../../services/dtos/types/play-sub-category';
import {GameEngine} from '../../utilities/game-engine';
import {StackedBar} from '../core/progress-indicators/stacked-bar';
import {FullWidthDarkSeparator} from '../core/separators/full-width-dark-separator';
import {AnimatedPieChart} from '../svg/animated-pie-chart';

interface Properties extends InjectedThemeProps {
  selectedPlay: GameDetailExtendedPlaySnapshotDto;
  isSplit: boolean;
  chanceResult?: number;
  onPressPlaybook: () => void;
  onSubmit: () => Promise<void>;
}

const Component: React.FC<Properties> = props => {
  const {
    selectedPlay,
    isSplit = false,
    chanceResult,
    onPressPlaybook,
    onSubmit,
    theme,
  } = props;

  const animationButtonTranslate = React.useRef(
    new Animated.Value(isSplit ? 1 : 0),
  ).current;
  const animationPlayContainerTranslate = React.useRef(
    new Animated.Value(isSplit ? 1 : 0),
  ).current;

  const animateControlPanel = React.useCallback(
    (onFinished: () => void) => {
      animationButtonTranslate.setValue(0);
      animationPlayContainerTranslate.setValue(0);

      Animated.parallel([
        Animated.timing(animationButtonTranslate, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
          easing: Easing.linear,
        }),
        Animated.spring(animationPlayContainerTranslate, {
          toValue: 1,
          friction: 7,
          useNativeDriver: true,
        }),
      ]).start(finished => {
        if (finished) {
          onFinished();
        }
      });
    },
    [animationButtonTranslate, animationPlayContainerTranslate],
  );

  React.useEffect(() => {
    if (isSplit) {
      animationButtonTranslate.setValue(1);
      animationPlayContainerTranslate.setValue(1);
    } else {
      animationButtonTranslate.setValue(0);
      animationPlayContainerTranslate.setValue(0);
    }
  }, [animationButtonTranslate, animationPlayContainerTranslate, isSplit]);

  const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: 80,
      marginBottom: 5,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    playbookIconContainer: {
      width: '20%',
      height: '100%',
      backgroundColor: theme.colors.background,
      borderTopLeftRadius: 10,
      borderBottomLeftRadius: 10,
      borderTopRightRadius: 3,
      borderBottomRightRadius: 3,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.colors.black,
      shadowColor: theme.colors.black,
      shadowOpacity: 0.9,
      shadowRadius: 2,
      shadowOffset: {width: 3, height: 3},
    },
    playContainer: {
      flex: 1,
      height: '100%',
      backgroundColor: theme.colors.background,
      borderRadius: 3,
      borderWidth: 1,
      borderColor: theme.colors.black,
      shadowColor: theme.colors.black,
      shadowOpacity: 0.9,
      shadowRadius: 2,
      shadowOffset: {width: 3, height: 3},
    },
    playHeaderContainer: {
      width: '100%',
      height: 20,
      backgroundColor: theme.colors.black,
      flexDirection: 'row',
      alignItems: 'center',
      borderTopLeftRadius: 3,
      borderTopRightRadius: 3,
    },
    playHeaderCategoryContainer: {
      height: '100%',
      backgroundColor: theme.colors.white,
      justifyContent: 'center',
      paddingLeft: 5,
      borderTopLeftRadius: 3,
    },
    playHeaderCategoryText: {
      ...theme.typography.caption1,
      color: theme.colors.black,
      fontWeight: 'bold',
    },
    playHeaderCategorySlant: {
      height: '100%',
      backgroundColor: theme.colors.black,
      marginVertical: 1,
      borderTopWidth: 20,
      borderTopColor: theme.colors.white,
      borderRightWidth: 20,
      borderRightColor: 'transparent',
      transform: [{scaleX: 0.5}, {translateX: -10}],
    },
    playHeaderNameContainer: {
      height: '100%',
      flex: 1,
      backgroundColor: theme.colors.black,
      justifyContent: 'center',
      marginLeft: -5,
    },
    playHeaderNameText: {
      ...theme.typography.caption1,
      color: theme.colors.white,
      fontWeight: 'bold',
    },
    playHeaderSettingsIconContainer: {
      height: '100%',
      width: 20,
      backgroundColor: theme.colors.blue,
      justifyContent: 'center',
      alignItems: 'center',
      borderTopRightRadius: 3,
    },
    playContentContainer: {
      width: '100%',
      flex: 1,
      backgroundColor: theme.colors.fill,
      flexDirection: 'row',
      alignItems: 'center',
    },
    playContentSummaryContainer: {
      height: '100%',
      flex: 1,
    },
    playContentCaptionContainer: {
      paddingLeft: 10,
      paddingTop: 3,
    },
    playContentCaptionText: {
      ...theme.typography.caption2,
      //   fontWeight: 'bold',
    },
    playContentBodyContainer: {
      flexDirection: 'row',
      alignItems: 'flex-end',
    },
    playContentBodyText: {
      ...theme.typography.title3,
      fontWeight: 'bold',
    },
    playContentBodyUnitsText: {
      ...theme.typography.caption2,
      //   fontWeight: 'bold',
      paddingLeft: 2,
      marginBottom: 2,
    },
    playContentRouteDistributionBarContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    playContentRouteDistributionBar: {
      flex: 1,
      marginTop: 1,
    },
    submitContainer: {
      width: '20%',
      height: '100%',
      backgroundColor: theme.colors.green,
      borderTopRightRadius: 10,
      borderBottomRightRadius: 10,
      borderTopLeftRadius: 3,
      borderBottomLeftRadius: 3,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.colors.black,
      shadowColor: theme.colors.black,
      shadowOpacity: 0.9,
      shadowRadius: 2,
      shadowOffset: {width: 3, height: 3},
    },
  });

  const reducePlayChances = React.useCallback(() => {
    return GameEngine.reducePlayChances(selectedPlay.playChances);
  }, [selectedPlay.playChances]);

  return (
    <>
      <View style={[styles.container]}>
        <Animated.View
          style={[
            styles.playbookIconContainer,
            {
              transform: [
                {
                  translateX: animationButtonTranslate.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-2, -Dimensions.get('screen').width / 2],
                  }),
                },
              ],
            },
          ]}>
          <Pressable onPress={onPressPlaybook}>
            <FontAwesome5Icon
              name="book"
              color={theme.colors.brown}
              size={54}
            />
          </Pressable>
        </Animated.View>
        {/* <FullHeightDarkSeparator /> */}
        <Animated.View
          style={[
            styles.playContainer,
            {
              transform: [
                {
                  translateY: animationPlayContainerTranslate.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -100],
                  }),
                },
              ],
            },
          ]}>
          <View style={[styles.playHeaderContainer]}>
            <View style={[styles.playHeaderCategoryContainer]}>
              <Text style={[styles.playHeaderCategoryText]}>
                {GameEngine.getPlaySubCategoryAbbr(
                  selectedPlay.subCategory,
                ).toUpperCase()}
              </Text>
            </View>
            <View style={[styles.playHeaderCategorySlant]} />
            <View style={[styles.playHeaderNameContainer]}>
              <Text style={[styles.playHeaderNameText]}>
                {selectedPlay.name.toUpperCase()}
              </Text>
            </View>
            <View style={[styles.playHeaderSettingsIconContainer]}>
              <FontAwesome5Icon name="cog" color={theme.colors.white} />
            </View>
          </View>
          <FullWidthDarkSeparator />
          <View style={[styles.playContentContainer]}>
            <View style={[styles.playContentSummaryContainer]}>
              <View style={[styles.playContentCaptionContainer]}>
                <Text style={[styles.playContentCaptionText]}>AVG GAIN</Text>
                <View style={[styles.playContentBodyContainer]}>
                  <Text style={[styles.playContentBodyText]}>
                    {String(
                      GameEngine.calcAvgGain(selectedPlay.playChances) || '---',
                    )}
                  </Text>
                  <Text style={[styles.playContentBodyUnitsText]}>YDS</Text>
                </View>
                {selectedPlay.subCategory === PlaySubCategory.Pass ? (
                  <View
                    style={[styles.playContentRouteDistributionBarContainer]}>
                    <View style={[styles.playContentRouteDistributionBar]}>
                      <StackedBar
                        sections={[
                          {percent: 60, color: 'red'},
                          {percent: 30, color: 'orange'},
                          {percent: 10, color: 'purple'},
                        ]}
                        height={8}
                      />
                    </View>
                  </View>
                ) : (
                  <></>
                )}
              </View>
            </View>
            <AnimatedPieChart
              slices={reducePlayChances()}
              size={50}
              arrowDegrees={chanceResult}
            />
          </View>
        </Animated.View>
        {/* <FullHeightDarkSeparator /> */}
        <Animated.View
          style={[
            styles.submitContainer,
            {
              transform: [
                {
                  translateX: animationButtonTranslate.interpolate({
                    inputRange: [0, 1],
                    outputRange: [2, Dimensions.get('screen').width / 2],
                  }),
                },
              ],
            },
          ]}>
          <Pressable
            onPress={() => {
              animateControlPanel(onSubmit);
            }}>
            <FontAwesome5Icon
              name="arrow-right"
              color={theme.colors.white}
              size={54}
            />
          </Pressable>
        </Animated.View>
      </View>
    </>
  );
};

export const GameControlPanel = withTheme(Component);
