import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {NotificationsList} from '../../components/notifications/list';
import {useData} from '../../providers/data';
import {NotificationsStackParamList} from '../../stacks/notifications';

type Properties = {
  navigation: NativeStackNavigationProp<NotificationsStackParamList>;
};

const NotificationsScreen: React.FC<Properties> = ({navigation}) => {
  const {ownerDashboard} = useData();

  return (
    <NotificationsList
      notifications={ownerDashboard.item?.notifications || []}
      isLoading={ownerDashboard.isLoading}
      onRefresh={ownerDashboard.refresh}
      navigation={navigation}
    />
  );
};

export {NotificationsScreen};
