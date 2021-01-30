/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
import { StackNavigationProp } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { View, Text, Button } from 'react-native';
import { useAuth } from '../../providers/auth';
import { Auth } from 'aws-amplify';
// import { Button } from 'react-native-paper';
import AuthMain from '../auth/main';

const Stack = createStackNavigator();

export interface HomeScreenProps {
  navigation: StackNavigationProp<{}>;
}

function Test({ navigation }: HomeScreenProps) {
  const auth = useAuth();
  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View>
          <Button
            title="Sign Out"
            onPress={async () => {
              try {
                await Auth.signOut();
              } catch (e) {
                console.error(e);
              }
              auth.setUser({ username: 'empty' });
            }}
          />
          {/* Sign Out
          </Button> */}
        </View>
      ),
    });
  }, [navigation, auth]);

  return (
    <>
      <View>
        <Text>Home</Text>
      </View>
    </>
  );
}

export default (/*{ navigation }: HomeScreenProps*/) => {
  const auth = useAuth();
  console.log(auth.user.username);

  // React.useEffect(() => {
  //   navigation.setOptions({
  //     headerRight: () => (
  //       <View>
  //         <Text>hello</Text>
  //       </View>
  //     ),
  //   });
  // }, [navigation]);

  // API.get('fourdowns', '/games/4', {}).then((value: any) => {
  //   console.log(value);
  // });

  return (
    <>
      {auth.user.username === 'empty' ? (
        <>
          <AuthMain />
        </>
      ) : (
        <>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="Home" component={Test} />
            </Stack.Navigator>
          </NavigationContainer>
        </>
      )}
    </>
  );
};
