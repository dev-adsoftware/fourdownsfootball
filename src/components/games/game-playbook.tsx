import React from 'react';
import {Pressable, SectionList, StyleSheet, Text, View} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {InjectedThemeProps, withTheme} from '../../hoc/with-theme';
import {ProgressBar} from '../core/progress-indicators/progress-bar';
import {AnimatedPieChart} from '../svg/animated-pie-chart';

interface Properties extends InjectedThemeProps {
  onClose: () => void;
}

const Component: React.FC<Properties> = props => {
  const {onClose, theme} = props;
  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.background,
      width: '100%',
      height: '100%',
      borderWidth: 1,
      borderColor: theme.colors.separator,
      borderRadius: 5,
    },
    headerContainer: {
      height: 35,
      width: '100%',
      // backgroundColor: theme.colors.secondaryBackground,
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,
      flexDirection: 'row',
      // alignItems: 'center',
    },
    headerTitleContainer: {
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
    headerTitleText: {
      ...theme.typography.caption1,
      fontWeight: 'bold',
    },
    headerCloseButtonContainer: {
      width: 35,
      height: 35,
      backgroundColor: theme.colors.blue,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 5,
      borderWidth: 2,
      borderColor: theme.colors.separator,
      marginTop: -6,
      marginRight: -6,
    },
    gridContainer: {
      //   height: '100%',
      //   height: 300,
      flex: 1,
      width: '100%',
      paddingHorizontal: 3,
      paddingBottom: 10,
      //   backgroundColor: theme.colors.red,
    },
    sectionHeader: {
      width: '100%',
      flexDirection: 'row',
      paddingHorizontal: 5,
      marginTop: 15,
      marginBottom: 1,
    },
    sectionHeaderText: {
      ...theme.typography.caption2,
      fontWeight: 'bold',
    },
    row: {
      width: '100%',
      height: 80,
      flexDirection: 'row',
      marginBottom: 2,
    },
    cell: {
      flex: 1,
      borderWidth: 1,
      borderColor: theme.colors.separator,
      height: '100%',
      margin: 2,
      borderRadius: 5,
      backgroundColor: theme.colors.secondaryBackground,
    },
    playHeaderContainer: {
      width: '100%',
      height: 20,
      backgroundColor: theme.colors.black,
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.separator,
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,
    },
    playHeaderCategoryContainer: {
      height: '100%',
      backgroundColor: theme.colors.white,
      justifyContent: 'center',
      paddingLeft: 5,
      borderTopLeftRadius: 5,
    },
    playHeaderCategoryText: {
      ...theme.typography.caption1,
      color: theme.colors.black,
      fontWeight: 'bold',
    },
    playHeaderCategorySlant: {
      height: '100%',
      backgroundColor: theme.colors.black,
      marginTop: 1,
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
      borderTopRightRadius: 5,
      borderTopRightColor: theme.colors.separator,
    },
    playHeaderNameText: {
      ...theme.typography.caption1,
      color: theme.colors.white,
      fontWeight: 'bold',
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
      paddingTop: 5,
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
      marginTop: 2,
    },
    playContentRPBar: {
      flex: 1,
    },
  });

  const sections = [
    {
      title: 'coin toss',
      data: [[{name: 'heads'}, {name: 'tails'}]],
    },
    {
      title: 'special teams',
      data: [
        [{name: 'kickoff'}, {name: 'punt'}],
        [{name: 'field goal'}, {name: 'qb kneel'}],
      ],
    },
    {
      title: 'single back',
      data: [
        [{name: 'dive'}, {name: 'off tackle'}],
        [{name: 'y corner'}, {name: 'x streak'}],
        [{name: 'curls'}, {name: 'toss sweep'}],
      ],
    },
    {
      title: 'i formation',
      data: [
        [{name: 'slam'}, {name: 'slant'}],
        [{name: 'counter'}, {name: 'deep outs'}],
        [{name: 'flood strong'}, {name: 'streaks'}],
      ],
    },
  ];

  const getRedGreenGradient = (percent: number): string => {
    if (percent <= 50) {
      return `rgba(255,${0 + ((percent * 2) / 100) * 255},0,1)`;
    }
    return `rgba(${255 - (((percent - 50) * 2) / 100) * 255},255,0,1)`;
  };

  const renderPlay = ({
    categoryAbbr,
    name,
  }: {
    categoryAbbr: string;
    name: string;
  }) => {
    return (
      <View style={[styles.cell]}>
        <View style={[styles.playHeaderContainer]}>
          <View style={[styles.playHeaderCategoryContainer]}>
            <Text style={[styles.playHeaderCategoryText]}>{categoryAbbr}</Text>
          </View>
          <View style={[styles.playHeaderCategorySlant]} />
          <View style={[styles.playHeaderNameContainer]}>
            <Text style={[styles.playHeaderNameText]}>{name}</Text>
          </View>
        </View>
        <View style={[styles.playContentContainer]}>
          <View style={[styles.playContentSummaryContainer]}>
            <View style={[styles.playContentCaptionContainer]}>
              <Text style={[styles.playContentCaptionText]}>AVG GAIN</Text>
              <View style={[styles.playContentBodyContainer]}>
                <Text style={[styles.playContentBodyText]}>14.2</Text>
                <Text style={[styles.playContentBodyUnitsText]}>YDS</Text>
              </View>
              <View style={[styles.playContentRPBarContainer]}>
                <View style={[styles.playContentRPBar]}>
                  <ProgressBar
                    percentComplete={100 - 0}
                    filledColor={getRedGreenGradient(100 - 0)}
                    unfilledColor={theme.colors.black}
                    height={8}
                  />
                </View>
              </View>
            </View>
          </View>
          <AnimatedPieChart
            slices={[
              {
                startDegrees: 30,
                endDegrees: 30,
                color: '#AA0000',
              },
              {
                startDegrees: 130,
                endDegrees: 130,
                color: '#FF0000',
              },
              {
                startDegrees: 150,
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
          />
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.container]}>
      <View style={[styles.headerContainer]}>
        <View style={[styles.headerTitleContainer]}>
          <Text style={[styles.headerTitleText]}>PLAYBOOK</Text>
        </View>
        <Pressable
          style={[styles.headerCloseButtonContainer]}
          onPress={onClose}>
          <FontAwesome5Icon name="times" color={theme.colors.white} />
        </Pressable>
      </View>
      <View style={[styles.gridContainer]}>
        <SectionList
          sections={sections}
          keyExtractor={(item, index) => `${item}-${index}`}
          renderItem={({item, section}) => {
            return (
              <View style={[styles.row]}>
                {renderPlay({
                  categoryAbbr: section.title.toUpperCase().slice(0, 2),
                  name: item[0].name.toUpperCase(),
                })}
                {renderPlay({
                  categoryAbbr: section.title.toUpperCase().slice(0, 2),
                  name: item[1].name.toUpperCase(),
                })}
              </View>
            );
          }}
          renderSectionHeader={({section: {title}}) => (
            <View style={[styles.sectionHeader]}>
              <Text style={styles.sectionHeaderText}>
                {title.toUpperCase()}
              </Text>
            </View>
          )}
        />
        {/* <View style={[styles.sectionHeader]}>
          <Text style={[styles.sectionHeaderText]}>COIN TOSS</Text>
        </View>
        <View style={[styles.row]}>
          <View style={[styles.cell]} />
          <View style={[styles.cell]} />
        </View>
        <View style={[styles.sectionHeader]}>
          <Text style={[styles.sectionHeaderText]}>SPECIAL TEAMS</Text>
        </View>
        <View style={[styles.row]}>
          <View style={[styles.cell]} />
          <View style={[styles.cell]} />
        </View>
        <View style={[styles.row]}>
          <View style={[styles.cell]} />
          <View style={[styles.cell]} />
        </View>
        <View style={[styles.sectionHeader]}>
          <Text style={[styles.sectionHeaderText]}>OFFENSE</Text>
        </View>
        <View style={[styles.row]}>
          <View style={[styles.cell]} />
          <View style={[styles.cell]} />
        </View>
        <View style={[styles.row]}>
          <View style={[styles.cell]} />
          <View style={[styles.cell]} />
        </View>
        <View style={[styles.row]}>
          <View style={[styles.cell]} />
          <View style={[styles.cell]} />
        </View>
        <View style={[styles.row]}>
          <View style={[styles.cell]} />
          <View style={[styles.cell]} />
        </View>
      </View> */}
      </View>
    </View>
  );
};

export const GamePlaybook = withTheme(Component);
