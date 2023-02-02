import React from 'react';
import {useStack} from '../components/navigation/stack-pager';
import {Icon} from '../components/primitives/icon';
import {Pressable} from '../components/primitives/pressable';
import {Text} from '../components/primitives/text';
import {View} from '../components/primitives/view';
import {useData} from '../providers/data';
import {EditNameScreen} from './edit-name';

interface PersonalInformationScreenProps {}

export const PersonalInformationScreen: React.FC<
  PersonalInformationScreenProps
> = props => {
  const data = useData();
  const stack = useStack();
  return (
    <>
      <View flex={1} w="full" bg="white" px={15}>
        <Text
          text="PERSONAL INFORMATION"
          typeFace="klavikaCondensedMediumItalic"
          fontSize="title2"
          py={20}
        />
        <Pressable
          onPress={() => {
            stack.push({component: <EditNameScreen />});
          }}>
          <View row h={40} justifyContent="space-between" alignItems="center">
            <Text text="Name" typeFace="sourceSansProRegular" fontSize="body" />
            <View row justifyContent="flex-end" alignItems="center">
              <Text
                text={`${data.owner?.firstName} ${data.owner?.lastName}`}
                typeFace="sourceSansProSemibold"
                fontSize="body"
                pr={10}
              />
              <Icon name="pencil-alt" color="grayButton" size="2xs" />
            </View>
          </View>
        </Pressable>
        <View row h={40} justifyContent="space-between" alignItems="center">
          <Text text="Email" typeFace="sourceSansProRegular" fontSize="body" />
          <View row justifyContent="flex-end" alignItems="center">
            <Text
              text={data.owner?.email || 'N/A'}
              typeFace="sourceSansProSemibold"
              fontSize="body"
            />
          </View>
        </View>
      </View>
    </>
  );
};
