import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {SectionList, StyleSheet, Text, Pressable, View} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {SectionListItemSeparator} from '../../components/core/section-list/sectionlist-item-separator';
import {SectionListSectionSeparator} from '../../components/core/section-list/sectionlist-section-separator';
import {useTheme} from '../../providers/theme';
import {MoreStackParamList} from '../../stacks/more';

type Properties = {
  navigation: NativeStackNavigationProp<MoreStackParamList>;
};

const Component: React.FC<Properties> = ({navigation}) => {
  const sections: {
    title: string;
    data: [{heading: string; option: keyof MoreStackParamList}];
  }[] = [
    {
      title: 'ACTIONS',
      data: [
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
      width: '100%',
      backgroundColor: theme.colors.background,
      borderTopWidth: 1,
      borderTopColor: theme.colors.separator,
    },
    itemRow: {
      backgroundColor: theme.colors.background,
      paddingLeft: 10,
      paddingVertical: 10,
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 0,
    },
    itemGrid: {
      flex: 1,
      color: theme.colors.text,
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
      fontSize: 12,
      paddingLeft: 10,
      marginTop: 0,
      marginBottom: 0,
      paddingTop: 10,
      paddingBottom: 3,
      textAlignVertical: 'bottom',
    },
  });

  const renderItem = ({
    item,
  }: {
    item: {
      heading: string;
      option: keyof MoreStackParamList;
    };
  }) => {
    return (
      <Pressable
        onPress={() => {
          navigation.navigate(item.option);
        }}
        style={[styles.itemRow]}>
        <Text style={[styles.itemGrid]}>{item.heading}</Text>
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
    );
  };

  return (
    <SectionList
      style={[styles.listContainer]}
      sections={sections}
      keyExtractor={(item, index) => item.heading + index}
      renderItem={renderItem}
      renderSectionHeader={({section: {title}}) => (
        <Text style={[styles.listSectionHeader]}>{title}</Text>
      )}
      ItemSeparatorComponent={SectionListItemSeparator}
      SectionSeparatorComponent={SectionListSectionSeparator}
    />
  );
};

export {Component as MoreMainScreen};
