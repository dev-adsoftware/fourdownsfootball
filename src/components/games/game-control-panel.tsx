import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {InjectedThemeProps, withTheme} from '../../hoc/with-theme';
import {StackedBar} from '../core/progress-indicators/stacked-bar';
import {FullHeightDarkSeparator} from '../core/separators/full-height-dark-separator';
import {FullWidthDarkSeparator} from '../core/separators/full-width-dark-separator';
import {AnimatedPieChart} from '../svg/animated-pie-chart';

interface Properties extends InjectedThemeProps {
  onPressPlaybook: () => void;
}

const Component: React.FC<Properties> = props => {
  const {onPressPlaybook, theme} = props;
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: 80,
      marginBottom: 5,
      borderWidth: 1,
      borderRadius: 10,
      borderColor: theme.colors.black,
      shadowColor: theme.colors.black,
      shadowOpacity: 0.9,
      shadowRadius: 2,
      shadowOffset: {width: 3, height: 3},
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
      justifyContent: 'center',
      alignItems: 'center',
    },
    playContainer: {
      flex: 1,
      height: '100%',
      backgroundColor: theme.colors.background,
    },
    playHeaderContainer: {
      width: '100%',
      height: 20,
      backgroundColor: theme.colors.black,
      flexDirection: 'row',
      alignItems: 'center',
    },
    playHeaderCategoryContainer: {
      height: '100%',
      backgroundColor: theme.colors.white,
      justifyContent: 'center',
      paddingLeft: 5,
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
    playContentRPBarContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    playContentRPBarLabel: {
      ...theme.typography.caption2,
      //   fontWeight: 'bold',
      marginRight: 5,
      marginBottom: 1,
    },
    playContentRPBar: {
      flex: 1,
      marginTop: 1,
    },
    submitContainer: {
      width: '20%',
      height: '100%',
      backgroundColor: theme.colors.green,
      borderTopRightRadius: 10,
      borderBottomRightRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  return (
    <>
      <View style={[styles.container]}>
        <Pressable
          style={[styles.playbookIconContainer]}
          onPress={onPressPlaybook}>
          <FontAwesome5Icon name="book" color={theme.colors.brown} size={54} />
        </Pressable>
        <FullHeightDarkSeparator />
        <View style={[styles.playContainer]}>
          <View style={[styles.playHeaderContainer]}>
            <View style={[styles.playHeaderCategoryContainer]}>
              <Text style={[styles.playHeaderCategoryText]}>LP</Text>
            </View>
            <View style={[styles.playHeaderCategorySlant]} />
            <View style={[styles.playHeaderNameContainer]}>
              <Text style={[styles.playHeaderNameText]}>HB FLAT</Text>
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
                  <Text style={[styles.playContentBodyText]}>14.2</Text>
                  <Text style={[styles.playContentBodyUnitsText]}>YDS</Text>
                </View>
                <View style={[styles.playContentRPBarContainer]}>
                  {/* <Text style={[styles.playContentRPBarLabel]}>RP</Text> */}
                  <View style={[styles.playContentRPBar]}>
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
              </View>
            </View>
            <AnimatedPieChart
              slices={[
                {
                  startDegrees: 0,
                  endDegrees: 0,
                  color: '#AA0000',
                },
                {
                  startDegrees: 180,
                  endDegrees: 210,
                  color: '#FF0000',
                },
                {
                  startDegrees: 180,
                  endDegrees: 150,
                  color: '#00BB00',
                },
                {
                  startDegrees: 0,
                  endDegrees: 0,
                  color: '#00EE00',
                },
              ]}
              size={50}
              arrowDegrees={150}
            />
          </View>
        </View>
        <FullHeightDarkSeparator />
        <View style={[styles.submitContainer]}>
          <FontAwesome5Icon
            name="arrow-right"
            color={theme.colors.white}
            size={54}
          />
        </View>
      </View>
    </>
  );
};

export const GameControlPanel = withTheme(Component);
