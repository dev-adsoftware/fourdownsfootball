import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet, Text, Pressable, View, FlatList} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {Card} from '../../components/core/cards/card';
import {SectionListItemSeparator} from '../../components/core/section-list/sectionlist-item-separator';
import {useTheme} from '../../providers/theme';
import {MoreStackParamList} from '../../stacks/more';

type Properties = {
  navigation: NativeStackNavigationProp<MoreStackParamList>;
};

const Component: React.FC<Properties> = ({navigation}) => {
  const sections: {
    groupHeader: string;
    groupItems: [{heading: string; option: keyof MoreStackParamList}];
  }[] = [
    {
      groupHeader: 'ACTIONS',
      groupItems: [
        {
          heading: 'Sign out',
          option: 'Sign Out',
        },
      ],
    },
  ];

  const theme = useTheme();

  const styles = StyleSheet.create({
    listContainer: {
      backgroundColor: theme.colors.secondaryBackground,
    },
    itemContentRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    itemGrid: {
      flex: 1,
      color: theme.colors.text,
      ...theme.typography.body,
    },
    itemGridRight: {
      alignItems: 'flex-end',
      marginRight: 15,
    },
    itemSelectContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    itemSelectText: {
      marginRight: 20,
      color: theme.colors.secondaryText,
    },
    listSectionHeader: {
      backgroundColor: theme.colors.secondaryBackground,
      color: theme.colors.secondaryText,
      ...theme.typography.subheading,
      paddingLeft: 10,
      marginTop: 0,
      marginBottom: 0,
      paddingTop: 10,
      paddingBottom: 3,
      textAlignVertical: 'bottom',
    },
    footerPadding: {
      backgroundColor: theme.colors.secondaryBackground,
      height: 1,
      marginTop: 10,
    },
  });

  const renderItem = ({
    item,
  }: {
    item: {
      groupHeader: string;
      groupItems: {
        heading: string;
        option: keyof MoreStackParamList;
      }[];
    };
  }) => {
    return (
      <Card heading={item.groupHeader}>
        {item.groupItems.map(
          (
            groupItem: {heading: string; option: keyof MoreStackParamList},
            index: number,
          ) => {
            return (
              <View key={`${item.groupHeader}-${groupItem.option}-${index}`}>
                <Pressable
                  onPress={() => {
                    navigation.navigate(groupItem.option);
                  }}
                  style={[styles.itemContentRow]}>
                  <Text style={[styles.itemGrid]}>{groupItem.heading}</Text>
                  <View style={[styles.itemGrid, styles.itemGridRight]}>
                    <View style={[styles.itemSelectContainer]}>
                      <Text style={[styles.itemSelectText]} />
                      <FontAwesome5Icon
                        name="chevron-right"
                        size={12}
                        color={theme.colors.secondaryText}
                      />
                    </View>
                  </View>
                </Pressable>
                {index < item.groupItems.length - 1 ? (
                  <SectionListItemSeparator />
                ) : (
                  <></>
                )}
              </View>
            );
          },
        )}
      </Card>
    );
  };

  return (
    <FlatList
      style={[styles.listContainer]}
      data={sections}
      keyExtractor={item => item.groupHeader}
      renderItem={renderItem}
      ListFooterComponent={<View style={[styles.footerPadding]} />}
    />
  );
};

export {Component as MoreMainScreen};
