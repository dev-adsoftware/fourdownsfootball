import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TeamDto, TownDto} from '../../../services/dtos';
import {InjectedThemeProps, withTheme} from '../../../hoc/with-theme';

interface Properties extends InjectedThemeProps {
  town?: TownDto;
  team?: TeamDto;
  size?: number;
}

const Component: React.FC<Properties> = props => {
  const {town, team, size = 34, theme} = props;
  const styles = StyleSheet.create({
    container: {
      borderWidth: 1,
      borderColor: theme.colors.black,
      width: size,
      height: size,
      borderRadius: Math.round(size / 2),
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: (theme.colors as {[x: string]: string})[
        (team?.primaryColor || 'green').toLowerCase()
      ],
      marginHorizontal: size <= 34 ? 5 : 10,
      marginVertical: size <= 34 ? 1 : 3,
    },
    avatarText: {
      ...(size <= 34 ? theme.typography.caption2 : theme.typography.body),
      color: theme.colors.white,
      fontWeight: 'bold',
    },
  });

  const getAvatarAbbreviation = () => {
    if (!town || !team) {
      return '?';
    }
    return `${town.name.slice(0, 1)}${team.nickname.slice(0, 1)}`;
  };

  return (
    <View style={[styles.container]}>
      <Text style={[styles.avatarText]}>{getAvatarAbbreviation()}</Text>
    </View>
  );
};

export const TeamAvatar = withTheme(Component);
