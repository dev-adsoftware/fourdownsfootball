import React from 'react';
import { FlatList, View, StyleSheet, Text, RefreshControl } from 'react-native';
import { useAuth } from '../../providers/auth';
import { useTheme } from '../../providers/theme';
import { TeamSummaryView } from '@dev-adsoftware/fourdownsfootball-dtos';
import { TeamApi } from '../../apis/team.api';
import { useData } from '../../providers/data';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

type TeamSummaryProps = {
  city: string;
  state: string;
  country: string;
  abbreviation: string;
  nickname: string;
};

export default () => {
  const [refreshing, setRefreshing] = React.useState(false);

  const auth = useAuth();
  const theme = useTheme();
  const data = useData();
  const navigation = useNavigation();

  const styles = StyleSheet.create({});

  const teamApi = new TeamApi();

  // const TeamSummary = ({
  //   city,
  //   state,
  //   country,
  //   abbreviation,
  //   nickname,
  // }: TeamSummaryProps) => {
  const TeamSummary = ({ team }: { team: TeamSummaryView }) => {
    console.log(team);
    return (
      <>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Detail', { team });
          }}>
          <View style={theme.layout.flatList.item}>
            <Text style={theme.layout.flatList.itemLeft}>
              {team.attributes.city} {team.attributes.nickname}
            </Text>
          </View>
        </TouchableOpacity>
      </>
    );
  };

  const renderTeam = ({ item }: { item: TeamSummaryView }) => (
    <TeamSummary
      team={item}
      // city={item.attributes.city}
      // state={item.attributes.state}
      // country={item.attributes.country}
      // abbreviation={item.attributes.abbreviation}
      // nickname={item.attributes.nickname}
    />
  );

  const itemSeparator = () => <View style={theme.layout.flatList.separator} />;

  const onRefresh = async () => {
    setRefreshing(true);
    await data.teams.refresh();
    setRefreshing(false);
  };

  return (
    <>
      <View style={theme.layout.container}>
        <FlatList
          style={theme.layout.flatList.container}
          data={data.teams.data.sort(teamApi.citySortFn)}
          renderItem={renderTeam}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={itemSeparator}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>
    </>
  );
};
