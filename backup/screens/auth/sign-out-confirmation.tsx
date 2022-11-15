import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {ConfirmActionForm} from '../../components/core/forms/confirm-action-form';
import {useAuth} from '../../providers/auth';
import {useData} from '../../providers/data';
import {MainTabParamList} from '../../stacks/main-tab';

type Properties = {
  navigation: NativeStackNavigationProp<MainTabParamList>;
};

const Screen: React.FC<Properties> = ({navigation}) => {
  const [signingOut, setIsSigningOut] = React.useState(false);

  const auth = useAuth();
  const data = useData();

  React.useEffect(() => {
    return () => {
      if (signingOut) {
        data.clearAll();
        auth.signOut();
      }
    };
  }, [signingOut, data, auth]);

  return (
    <ConfirmActionForm
      text="Are you sure you want to sign out?"
      isProcessingExternal={signingOut}
      onConfirm={async () => {
        setIsSigningOut(true);
        setTimeout(() => {
          navigation.reset({
            index: 0,
            routes: [{name: 'Games Stack'}],
          });
        }, 200);
      }}
    />
  );
};

export {Screen as SignOutConfirmationScreen};
