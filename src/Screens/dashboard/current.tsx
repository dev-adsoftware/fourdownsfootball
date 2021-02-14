import React from 'react';
import { View } from 'react-native';
import { Paragraph } from 'react-native-paper';
import { API } from 'aws-amplify';
import { useTheme } from '../../providers/theme';
import { useAuth } from '../../providers/auth';

export default () => {
  const theme = useTheme();
  const auth = useAuth();

  React.useEffect(() => {
    const getCurrentGames = async () => {
      API.get('fourdowns', `/games/username/${auth.user.username}`, {}).then(
        (response) => {
          console.log(response);
        },
      );
    };

    getCurrentGames();
  }, []);

  return (
    <View style={theme.layout.container}>
      <Paragraph>Games in progress</Paragraph>
    </View>
  );
};
