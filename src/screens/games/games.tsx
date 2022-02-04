import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {GamesList} from '../../components/games/list';
import {NewToolbar} from '../../components/toolbars/new';
import {GamesStackParamList} from '../../stacks/games-tab/games';

type Properties = {
  navigation: NativeStackNavigationProp<GamesStackParamList>;
};

const GamesScreen: React.FC<Properties> = ({navigation}) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <NewToolbar onNew={() => navigation.navigate('Request Game Stack')} />
        );
      },
    });
  }, [navigation]);

  return (
    <GamesList
      onPressRequestGame={() => {
        navigation.navigate('Request Game Stack');
      }}
    />
  );
};

export {GamesScreen};
