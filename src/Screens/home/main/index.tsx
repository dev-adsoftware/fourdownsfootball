import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { useAuth } from '../../../providers/auth';
import AuthMain from '../../auth/main';
import { useTheme } from 'react-native-paper';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Splash from '../../splash';
import Dashboard from '../dashboard';
import Teams from '../teams';
import Leagues from '../leagues';
import Ladders from '../ladders';

const Tab = createBottomTabNavigator();

const DashboardIcon = ({
  focused,
  color,
  size,
}: {
  focused: boolean;
  color: string;
  size: number;
}) => {
  return <AwesomeIcon name="rocket" />;
};

export default () => {
  const auth = useAuth();
  const theme = useTheme();

  // React.useEffect(() => {
  //   API.get('fourdowns', '/games/4', {}).then((value: any) => {
  //     console.log(value);
  //   });
  // }, []);

  return (
    <>
      {auth.isLoading ? (
        <>
          <Splash />
        </>
      ) : auth.user.username === 'empty' ? (
        <>
          <AuthMain />
        </>
      ) : (
        <>
          <NavigationContainer theme={theme}>
            <Tab.Navigator>
              <Tab.Screen
                name="Dashboard"
                component={Dashboard}
                options={{
                  tabBarIcon: DashboardIcon,
                }}
              />
              <Tab.Screen name="Teams" component={Teams} />
              <Tab.Screen name="Leagues" component={Leagues} />
              <Tab.Screen name="Ladders" component={Ladders} />
            </Tab.Navigator>
          </NavigationContainer>
        </>
      )}
    </>
  );
};
