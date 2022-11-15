import React from 'react';
import {Pressable, SectionList, StyleSheet, Text, View} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {InjectedThemeProps, withTheme} from '../../hoc/with-theme';
import {GameDetailExtendedPlaySnapshotDto} from '../../services/dtos/queries/game-detail/game-detail-query-response.dto';
import {Formation} from '../../services/dtos/types/formation';
import {PlaySubCategory} from '../../services/dtos/types/play-sub-category';
import {GameEngine} from '../../utilities/game-engine';
import {ProgressBar} from '../core/progress-indicators/progress-bar';
import {AnimatedPieChart} from '../svg/animated-pie-chart';

interface Properties extends InjectedThemeProps {
  plays: GameDetailExtendedPlaySnapshotDto[];
  onSelect: (playId: string) => void;
  onClose: () => void;
}

const Component: React.FC<Properties> = props => {
  const {plays, onSelect, onClose, theme} = props;

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
      flex: 1,
      width: '100%',
      paddingHorizontal: 3,
      paddingBottom: 10,
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
    emptyCell: {
      flex: 1,
      // borderWidth: 1,
      // borderColor: theme.colors.separator,
      height: '100%',
      margin: 2,
      // borderRadius: 5,
      // backgroundColor: theme.colors.secondaryBackground,
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

  const accumulator: {
    title: Formation;
    count: number;
    data: {
      playId: string;
      name: string;
      subCategory: PlaySubCategory;
      avgGain?: number;
      showRepetitionPenalty: boolean;
      currentRepetitionPenalty: number;
      chances?: {
        darkRedSlice: number;
        redSlice: number;
        greenSlice: number;
        lightGreenSlice: number;
      };
    }[][];
  }[] = [];

  const playSections = plays.reduce((previousValue, currentValue) => {
    const section = previousValue.filter(value => {
      return value.title === currentValue.formation;
    });

    if (section.length === 0) {
      previousValue.push({
        title: currentValue.formation,
        count: 0,
        data: [],
      });
    }

    const thisSection = previousValue.filter(value => {
      return value.title === currentValue.formation;
    })[0];

    if (thisSection.count % 2 === 1) {
      thisSection.data[thisSection.data.length - 1].push({
        playId: currentValue.id,
        name: currentValue.name,
        subCategory: currentValue.subCategory,
        showRepetitionPenalty: currentValue.repetitionPenalty > 0,
        currentRepetitionPenalty:
          100 - currentValue.playAptitude.currentRepetitionPenalty,
        chances:
          currentValue.playChances.length > 0
            ? GameEngine.reducePlayChances(currentValue.playChances)
            : undefined,
        avgGain: GameEngine.calcAvgGain(currentValue.playChances),
      });
    } else {
      thisSection.data.push([
        {
          playId: currentValue.id,
          name: currentValue.name,
          subCategory: currentValue.subCategory,
          showRepetitionPenalty: currentValue.repetitionPenalty > 0,
          currentRepetitionPenalty:
            100 - currentValue.playAptitude.currentRepetitionPenalty,
          chances:
            currentValue.playChances.length > 0
              ? GameEngine.reducePlayChances(currentValue.playChances)
              : undefined,
          avgGain: GameEngine.calcAvgGain(currentValue.playChances),
        },
      ]);
    }

    thisSection.count += 1;

    return previousValue;
  }, accumulator);

  const getRedGreenGradient = (percent: number): string => {
    if (percent <= 50) {
      return `rgba(255,${0 + ((percent * 2) / 100) * 255},0,1)`;
    }
    return `rgba(${255 - (((percent - 50) * 2) / 100) * 255},255,0,1)`;
  };

  const renderPlay = ({
    playId,
    categoryAbbr,
    name,
    avgGain,
    showRepetitionPenalty,
    currentRepetitionPenalty,
    slices,
  }: {
    playId: string;
    categoryAbbr: string;
    name: string;
    avgGain?: number;
    showRepetitionPenalty: boolean;
    currentRepetitionPenalty: number;
    slices?: {
      darkRedSlice: number;
      redSlice: number;
      greenSlice: number;
      lightGreenSlice: number;
    };
  }) => {
    return (
      <Pressable
        style={[styles.cell]}
        onPress={() => {
          onSelect(playId);
          onClose();
        }}>
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
                <Text style={[styles.playContentBodyText]}>
                  {avgGain ? String(avgGain) : '---'}
                </Text>
                <Text style={[styles.playContentBodyUnitsText]}>YDS</Text>
              </View>
              {showRepetitionPenalty ? (
                <View style={[styles.playContentRPBarContainer]}>
                  <View style={[styles.playContentRPBar]}>
                    <ProgressBar
                      percentComplete={100 - currentRepetitionPenalty}
                      filledColor={getRedGreenGradient(
                        100 - currentRepetitionPenalty,
                      )}
                      unfilledColor={theme.colors.black}
                      height={8}
                    />
                  </View>
                </View>
              ) : (
                <></>
              )}
            </View>
          </View>
          {slices ? <AnimatedPieChart slices={slices} size={50} /> : <></>}
        </View>
      </Pressable>
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
          sections={playSections}
          keyExtractor={(item, index) => `${item}-${index}`}
          renderItem={({item}) => {
            return (
              <View style={[styles.row]}>
                {renderPlay({
                  playId: item[0].playId,
                  categoryAbbr: GameEngine.getPlaySubCategoryAbbr(
                    item[0].subCategory,
                  ).toUpperCase(),
                  name: item[0].name.toUpperCase(),
                  showRepetitionPenalty: item[0].showRepetitionPenalty,
                  currentRepetitionPenalty: item[0].currentRepetitionPenalty,
                  slices: item[0].chances,
                  avgGain: item[0].avgGain,
                })}
                {item.length > 1 ? (
                  renderPlay({
                    playId: item[1].playId,
                    categoryAbbr: item[1].subCategory.toUpperCase(),
                    name: item[1].name.toUpperCase(),
                    showRepetitionPenalty: item[1].showRepetitionPenalty,
                    currentRepetitionPenalty: item[1].currentRepetitionPenalty,
                    slices: item[1].chances,
                    avgGain: item[1].avgGain,
                  })
                ) : (
                  <View style={[styles.emptyCell]} />
                )}
              </View>
            );
          }}
          renderSectionHeader={({section: {title}}) => (
            <View style={[styles.sectionHeader]}>
              <Text style={styles.sectionHeaderText}>
                {GameEngine.getFormationName(title).toUpperCase()}
              </Text>
            </View>
          )}
          stickySectionHeadersEnabled={false}
        />
      </View>
    </View>
  );
};

export const GamePlaybook = withTheme(Component);
