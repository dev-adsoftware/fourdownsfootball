import React from 'react';
import { FlatList, View } from 'react-native';
import { Paragraph } from 'react-native-paper';
import { API } from '@aws-amplify/api';
import { useTheme } from '../../providers/theme';
import { useAuth } from '../../providers/auth';

interface Game {
  id: string;
  awayTeamId: string;
  awayScore: number;
}

const GameListItem = ({ item }: { item: Game }) => {
  return (
    <View>
      <Paragraph>{`${item.awayTeamId}: ${item.awayScore}`}</Paragraph>
    </View>
  );
};

export default () => {
  const [currentGames, setCurrentGames] = React.useState([] as Game[]);
  const theme = useTheme();
  const auth = useAuth();

  // React.useEffect(() => {
  //   const getCurrentGames = async () => {
  //     API.get('fourdowns', `/games/username/${auth.user.username}`, {}).then(
  //       (response) => {
  //         console.log(response);
  //         setCurrentGames(response.items);
  //       },
  //     );
  //   };

  //   getCurrentGames();
  // }, []);

  const renderItem = ({ item }: { item: Game }) => {
    return <GameListItem item={item} />;
  };

  return (
    <View style={theme.layout.container}>
      <FlatList
        data={currentGames}
        keyExtractor={(item: Game) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};
