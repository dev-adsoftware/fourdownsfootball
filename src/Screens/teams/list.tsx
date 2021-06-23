import React from 'react';
import { FlatList, View, StyleSheet, Text } from 'react-native';
import { useAuth } from '../../providers/auth';
import { useTheme } from '../../providers/theme';
import { TeamSummaryView } from '@dev-adsoftware/fourdownsfootball-dtos';
import { TeamApi } from '../../apis/team.api';

type TeamSummaryProps = {
  city: string;
  state: string;
  country: string;
  abbreviation: string;
  nickname: string;
};

export default () => {
  const [teams, setTeams] = React.useState([] as TeamSummaryView[]);

  const auth = useAuth();
  const theme = useTheme();

  const styles = StyleSheet.create({});

  React.useEffect(() => {
    const getTeams = async () => {
      const teamsFetched = await new TeamApi().list(auth.owner.id);
      console.log(teamsFetched);
      setTeams(
        teamsFetched.items.sort(
          (a: TeamSummaryView, b: TeamSummaryView): number => {
            return a.attributes.city > b.attributes.city ? 1 : -1;
          },
        ),
      );
    };

    getTeams();
  }, []);

  const TeamSummary = ({
    city,
    state,
    country,
    abbreviation,
    nickname,
  }: TeamSummaryProps) => {
    return (
      <>
        <View style={theme.layout.flatList.item}>
          <Text style={theme.layout.flatList.itemLeft}>
            {city} {nickname}
          </Text>
        </View>
      </>
    );
  };

  const renderTeam = ({ item }: { item: TeamSummaryView }) => (
    <TeamSummary
      city={item.attributes.city}
      state={item.attributes.state}
      country={item.attributes.country}
      abbreviation={item.attributes.abbreviation}
      nickname={item.attributes.nickname}
    />
  );

  const itemSeparator = () => <View style={theme.layout.flatList.separator} />;

  return (
    <>
      <View style={theme.layout.container}>
        <FlatList
          style={theme.layout.flatList.container}
          data={teams}
          renderItem={renderTeam}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={itemSeparator}
        />
      </View>
    </>
  );
};
