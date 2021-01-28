/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
import { StackNavigationProp } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import { API } from 'aws-amplify';
import React from 'react';
import { View, Text } from 'react-native';
// import { UserTimesIcon } from '../../components/icons';
import { useAuth } from '../../providers/auth';
import { Auth } from 'aws-amplify';
import { PrimaryButton } from '../../components/buttons';
import SignIn from '../signin';

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
          <PrimaryButton
            text="Log out"
            onPress={async () => {
              try {
                await Auth.signOut();
              } catch (e) {
                console.error(e);
              }
              auth.setUser({ username: 'empty' });
            }}
          />
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
          <SignIn />
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
