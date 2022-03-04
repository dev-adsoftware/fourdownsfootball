import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {TeamsList} from '../../components/teams/list';
import {NewToolbar} from '../../components/toolbars/new';
import {useData} from '../../providers/data';
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

  const {ownerDashboard} = useData();

  return (
    <TeamsList
      teams={ownerDashboard.item?.teams || []}
      teamRequests={(ownerDashboard.item?.teamRequests || []).filter(
        teamRequest => {
          return teamRequest.status !== 'Complete';
        },
      )}
      isLoading={ownerDashboard.isLoading}
      onRefresh={ownerDashboard.refresh}
      navigation={navigation}
    />
  );
};

export {TeamsScreen};
