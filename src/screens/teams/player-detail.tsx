import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useTheme} from '../../providers/theme';
import {TeamsStackParamList} from '../../stacks/teams';

type Properties = {
  route: RouteProp<TeamsStackParamList, 'Team Player Detail'>;
  navigation: NativeStackNavigationProp<TeamsStackParamList>;
};

const TeamPlayerDetailScreen: React.FC<Properties> = ({route, navigation}) => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {color: theme.colors.text, padding: 10, fontSize: 48},
  });

  return (
    <>
      <View style={[styles.container]}>
        <Text style={[styles.text]}>Player {route.params.player.id}</Text>
      </View>
    </>
  );
};

export {TeamPlayerDetailScreen};
