import React from 'react';
import { View } from 'react-native';
import { Paragraph } from 'react-native-paper';
import { useTheme } from '../../providers/theme';
import { TeamSummaryView } from '@dev-adsoftware/fourdownsfootball-dtos';

import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type StackParamList = {
  Detail: { team: TeamSummaryView };
};

type ScreenRouteProp = RouteProp<StackParamList, 'Detail'>;

type ScreenNavigationProp = StackNavigationProp<StackParamList, 'Detail'>;

type Props = {
  route: ScreenRouteProp;
  navigation: ScreenNavigationProp;
};

export default ({ route }: Props) => {
  const theme = useTheme();
  console.log('in detail');
  console.log(route.params.team);
  return (
    <>
      <View style={theme.layout.container}>
        <Paragraph>
          Team detail {route.params.team.attributes.nickname}
        </Paragraph>
      </View>
    </>
  );
};
