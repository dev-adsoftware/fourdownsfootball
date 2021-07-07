import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, HelperText, TextInput } from 'react-native-paper';
import { useAuth } from '../../providers/auth';
import { useTheme } from '../../providers/theme';
import { TeamApi } from '../../apis/team.api';
import { TeamAttributes } from '@dev-adsoftware/fourdownsfootball-dtos';
import { useData } from '../../providers/data';

export default () => {
  const [city, setCity] = React.useState('');
  const [state, setState] = React.useState('');
  const [country, setCountry] = React.useState('');
  const [abbreviation, setAbbreviation] = React.useState('');
  const [nickname, setNickname] = React.useState('');
  const [pluralNickname, setPluralNickname] = React.useState('');
  const [shortNickname, setShortNickname] = React.useState('');
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const auth = useAuth();
  const theme = useTheme();
  const data = useData();
  const navigation = useNavigation();

  const teamApi = new TeamApi();

  const styles = StyleSheet.create({
    form: {
      width: 340,
    },
    input: {
      width: '100%',
    },
  });

  return (
    <>
      <View style={theme.layout.container}>
        <View style={styles.form}>
          <View style={[theme.layout.form.row, theme.layout.center]}>
            <TextInput
              style={styles.input}
              textAlign="left"
              label="City"
              mode="flat"
              autoCapitalize="words"
              returnKeyType="next"
              value={city}
              onChangeText={(text: string) => setCity(text)}
            />
          </View>
          <View style={[theme.layout.form.row, theme.layout.center]}>
            <TextInput
              style={styles.input}
              textAlign="left"
              label="State"
              mode="flat"
              autoCapitalize="characters"
              returnKeyType="next"
              value={state}
              onChangeText={(text: string) => setState(text)}
            />
          </View>
          <View style={[theme.layout.form.row, theme.layout.center]}>
            <TextInput
              style={styles.input}
              textAlign="left"
              label="Country"
              mode="flat"
              autoCapitalize="characters"
              returnKeyType="next"
              value={country}
              onChangeText={(text: string) => setCountry(text)}
            />
          </View>
          <View style={[theme.layout.form.row, theme.layout.center]}>
            <TextInput
              style={styles.input}
              textAlign="left"
              label="Abbreviation"
              mode="flat"
              autoCapitalize="characters"
              returnKeyType="next"
              value={abbreviation}
              onChangeText={(text: string) => setAbbreviation(text)}
            />
          </View>
          <View style={[theme.layout.form.row, theme.layout.center]}>
            <TextInput
              style={styles.input}
              textAlign="left"
              label="Nickname"
              mode="flat"
              autoCapitalize="words"
              returnKeyType="next"
              value={nickname}
              onChangeText={(text: string) => {
                setNickname(text);
                setPluralNickname(text);
                setShortNickname(text);
              }}
            />
          </View>
          {error.length > 0 ? (
            <>
              <View style={[theme.layout.form.row, theme.layout.center]}>
                <HelperText type="error">Error: {error}</HelperText>
              </View>
            </>
          ) : (
            <></>
          )}
          <View style={[theme.layout.form.row, theme.layout.center]}>
            <Button
              mode="contained"
              loading={loading}
              onPress={async () => {
                if (city.length === 0) {
                  setError('City is required.');
                } else if (state.length === 0) {
                  setError('State is required.');
                } else if (country.length === 0) {
                  setError('Country is required.');
                } else if (abbreviation.length === 0) {
                  setError('Abbreviation is required.');
                } else if (nickname.length === 0) {
                  setError('Nickname is required.');
                } else {
                  try {
                    setLoading(true);
                    await teamApi.create(
                      auth.owner.id,
                      new TeamAttributes().init({
                        city,
                        state,
                        country,
                        abbreviation,
                        nickname,
                        pluralNickname,
                        shortNickname,
                      }),
                    );
                    await data.teams.refresh();
                    navigation.navigate('Main');
                  } catch (e) {
                    setError(e.message);
                    setLoading(false);
                  }
                }
              }}>
              Create
            </Button>
          </View>
        </View>
      </View>
    </>
  );
};
