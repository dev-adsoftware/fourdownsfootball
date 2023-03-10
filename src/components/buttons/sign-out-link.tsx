import React from 'react';
import {View} from '../../primitives/view';
import {useAuth} from '../../providers/auth';
import {ConfirmActionScreen} from '../../screens/confirm-action';
import {Spinner} from '../activity-indicators/spinner';
import {useFadeInScreen} from '../navigation/fade-in-screen';
import {Link} from './link';

interface SignOutLinkProps {}

export const SignOutLink: React.FC<SignOutLinkProps> = _props => {
  const [isSigningOut, setIsSigningOut] = React.useState(false);

  const auth = useAuth();
  const {push: pushFadeInScreen} = useFadeInScreen();

  React.useEffect(() => {
    if (isSigningOut) {
      auth.signOut();

      pushFadeInScreen({
        component: (
          <View flex={1} alignItems="center" justifyContent="center">
            <View>
              <Spinner />
            </View>
          </View>
        ),
      });
    }
  }, [isSigningOut, auth, pushFadeInScreen]);

  return (
    <Link
      text="SIGN OUT"
      onPress={() => {
        pushFadeInScreen({
          component: (
            <ConfirmActionScreen
              icon="sign-out-alt"
              questionText={'Are you sure you want\nto sign out?'}
              buttonText="Sign out"
              onConfirm={async () => {
                setIsSigningOut(true);
              }}
            />
          ),
        });
      }}
    />
  );
};
