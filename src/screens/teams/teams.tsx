import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {TeamsList} from '../../components/teams/list';
import {NewToolbar} from '../../components/toolbars/new';
import {TeamsStackParamList} from '../../stacks/teams';

type Properties = {
  navigation: NativeStackNavigationProp<TeamsStackParamList>;
};

const TeamsScreen: React.FC<Properties> = ({navigation}) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <NewToolbar onNew={() => navigation.navigate('Team Request', {})} />
        );
      },
    });
  }, [navigation]);

  return <TeamsList navigation={navigation} />;
};

export {TeamsScreen};
