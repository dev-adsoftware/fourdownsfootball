import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {ConfirmActionForm} from '../../components/core/forms/confirm-action-form';
import {useData} from '../../providers/data';
import {MainTabParamList} from '../../stacks/main-tab';

type Properties = {
  navigation: NativeStackNavigationProp<MainTabParamList>;
};

const Screen: React.FC<Properties> = ({navigation}) => {
  const [clearingLocalData, setIsClearingLocalData] = React.useState(false);

  const {localStore} = useData();

  return (
    <ConfirmActionForm
      text="Are you sure you want to clear local data?"
      isProcessingExternal={clearingLocalData}
      onConfirm={async () => {
        setIsClearingLocalData(true);
        await localStore.clear();
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

export {Screen as ClearLocalDataConfirmationScreen};
