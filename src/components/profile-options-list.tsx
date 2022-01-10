import React from 'react';
import {SectionList, Text, TouchableOpacity, View} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {SectionListItemSeparator} from './sectionlist-item-separator';
import {SectionListSectionSeparator} from './sectionlist-section-separator';

type Properties = {onPressProfileOption: (option: string) => void};

const Component: React.FC<Properties> = ({onPressProfileOption}) => {
  const [sections, setSections] = React.useState<
    {
      title: string;
      data: {heading: string; option: string; adminOnly: boolean}[];
    }[]
  >([]);

  React.useEffect(() => {
    setSections([
      {
        title: 'Actions',
        data: [
          {
            heading: 'Sign out',
            option: 'Sign Out',
            adminOnly: false,
          },
        ],
      },
    ]);
  }, []);

  const renderItem = ({
    item,
  }: {
    item: {
      heading: string;
      option: string;
    };
  }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          onPressProfileOption(item.option);
        }}
        style={{
          backgroundColor: 'white',
          paddingLeft: 10,
          paddingVertical: 5,
          flexDirection: 'row',
          alignItems: 'center',
          marginRight: 0,
        }}>
        <Text style={{flex: 5}}>{item.heading}</Text>

        {item.option ? (
          <View style={{flex: 1, alignItems: 'flex-end', marginRight: 15}}>
            <FontAwesome5Icon name="chevron-right" size={12} color="#a0a0a0" />
          </View>
        ) : (
          <></>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SectionList
      style={[{width: '100%'}, {backgroundColor: '#f0f0f0f0'}]}
      sections={sections}
      keyExtractor={(item, index) => item.heading + index}
      renderItem={renderItem}
      renderSectionHeader={({section: {title}}) => (
        <Text
          style={{
            backgroundColor: '#f0f0f0',
            paddingLeft: 5,
            marginTop: 0,
            marginBottom: 0,
            paddingVertical: 5,
          }}>
          {title}
        </Text>
      )}
      ItemSeparatorComponent={SectionListItemSeparator}
      SectionSeparatorComponent={SectionListSectionSeparator}
    />
  );
};

export {Component as ProfileOptionsList};
