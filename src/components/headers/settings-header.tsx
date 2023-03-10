import React from 'react';
import {Icon} from '../../primitives/icon';
import {Text} from '../../primitives/text';
import {View} from '../../primitives/view';
import {CircleAbbrAvatar} from '../avatars/circle-abbr-avatar';
import {TextButton} from '../buttons/text-button';
import {LogoSvg} from '../svg/logo-svg';

interface SettingsHeaderProps {
  firstName: string;
  lastName: string;
}

export const SettingsHeader: React.FC<SettingsHeaderProps> = props => {
  return (
    <>
      <View row>
        <View h={100} w={100} alignItems="center" justifyContent="center">
          <CircleAbbrAvatar
            text={props.firstName.slice(0, 1).toUpperCase() || '?'}
            size={75}
          />
        </View>
        <View py={10}>
          <Text
            text={`${props.firstName.toUpperCase()} ${props.lastName.toUpperCase()}`}
            fontSize={24}
            typeFace="klavikaCondensedMedium"
          />
          <View row>
            <View w={20} pt={2} alignItems="center">
              <LogoSvg size={20} />
            </View>
            <View pl={5} justifyContent="flex-start">
              <Text
                text="BETA TESTER MEMBERSHIP"
                fontSize={15}
                typeFace="klavikaCondensedMedium"
              />
              <Text
                text="Unlimited Games / Billing Period"
                fontSize={14}
                typeFace="sourceSansProRegular"
              />
            </View>
          </View>
          <View row mt={5}>
            <View w={20} pt={3} alignItems="center">
              <Icon icon="football-ball" size={10} color="primary" />
            </View>
            <View pl={5} justifyContent="flex-start">
              <Text
                text="ANDALE FALCONS (I.1)"
                fontSize={15}
                typeFace="klavikaCondensedMedium"
              />
            </View>
          </View>
        </View>
      </View>
      <View px={20}>
        <TextButton text="BUY GAMES" onPress={() => {}} />
      </View>
    </>
  );
};
