import React from 'react';
import {StackHeader, useStack} from '../components/navigation/stack-pager';
import {Icon} from '../primitives/icon';
import {Text} from '../primitives/text';
import {View} from '../primitives/view';
import {useData} from '../providers/data';
import {EditNameScreen} from './edit-name';

interface PersonalInformationScreenProps {}

const FORM_LABEL_FONT_SIZE = 17;

export const PersonalInformationScreen: React.FC<
  PersonalInformationScreenProps
> = () => {
  const data = useData();
  const stack = useStack();
  return (
    <>
      <View flex={1} w="full" bg="white" px={15}>
        <StackHeader headerText="PERSONAL INFORMATION" />
        <View
          onPress={() => {
            stack.push({component: <EditNameScreen />});
          }}>
          <View row h={40} justifyContent="space-between" alignItems="center">
            <Text
              text="Name"
              typeFace="sourceSansProRegular"
              fontSize={FORM_LABEL_FONT_SIZE}
            />
            <View row justifyContent="flex-end" alignItems="center">
              <Text
                text={`${data.owner?.firstName} ${data.owner?.lastName}`}
                typeFace="sourceSansProSemibold"
                fontSize={FORM_LABEL_FONT_SIZE}
                pr={10}
              />
              <Icon icon="pencil-alt" color="grayButton" size={10} />
            </View>
          </View>
        </View>
        <View row h={40} justifyContent="space-between" alignItems="center">
          <Text
            text="Email"
            typeFace="sourceSansProRegular"
            fontSize={FORM_LABEL_FONT_SIZE}
          />
          <View row justifyContent="flex-end" alignItems="center">
            <Text
              text={data.owner?.email || 'N/A'}
              typeFace="sourceSansProSemibold"
              fontSize={FORM_LABEL_FONT_SIZE}
            />
          </View>
        </View>
      </View>
    </>
  );
};
