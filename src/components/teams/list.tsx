import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {useAuth} from '../../providers/auth';
import {useTheme} from '../../providers/theme';
import {Team, TeamsService} from '../../services/teams';
import {Button} from '../core/buttons/button';

type Properties = {
  onPressTeam: (teamId: string) => void;
  onPressCreateTeam: () => void;
};

const TeamsList: React.FC<Properties> = ({onPressCreateTeam}) => {
  const [teams, setTeams] = React.useState<Team[]>([]);
  const auth = useAuth();
  const theme = useTheme();

  const fetchTeams = React.useCallback(async () => {
    const teamsService = new TeamsService();
    setTeams((await teamsService.listByOwner(auth.owner?.id as string)).items);
  }, [auth.owner?.id]);

  React.useEffect(() => {
    fetchTeams();
  }, [fetchTeams]);

  const styles = StyleSheet.create({
    emptyContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    oopsCircle: {
      borderWidth: 2,
      borderColor: theme.colors.error,
      width: 50,
      height: 50,
      borderRadius: 25,
      alignItems: 'center',
      marginVertical: 10,
    },
    oopsIcon: {marginTop: 12},
    oopsText: {color: theme.colors.text, marginBottom: 20},
    createButton: {
      backgroundColor: theme.colors.blue,
      marginVertical: 30,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    createButtonIcon: {
      marginRight: 10,
    },
    createButtonText: {
      color: 'white',
      fontWeight: 'bold',
    },
  });

  return teams.length === 0 ? (
    <View style={[styles.emptyContainer]}>
      <View style={[styles.oopsCircle]}>
        <FontAwesome5Icon
          style={[styles.oopsIcon]}
          name="exclamation"
          color={theme.colors.error}
          size={24}
        />
      </View>
      <Text style={[styles.oopsText]}>Oops! You don't own any teams.</Text>
      <Button
        text="Create New"
        iconLeft="plus"
        onPress={() => {
          onPressCreateTeam();
        }}
      />
    </View>
  ) : (
    <></>
  );
};

export {TeamsList};
