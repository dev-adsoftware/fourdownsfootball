import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {InjectedThemeProps, withTheme} from '../../hoc/with-theme';

interface Properties extends InjectedThemeProps {
  crownShield: 'crown' | 'shield';
  onSelect: () => Promise<void>;
}

const Component: React.FC<Properties> = props => {
  const {crownShield, onSelect, theme} = props;
  const styles = StyleSheet.create({
    coin: {
      backgroundColor: theme.colors.silver,
      borderColor: theme.colors.black,
      borderRadius: 50,
      borderWidth: 2,
      width: 100,
      height: 100,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 5,
      shadowColor: '#000',
      shadowOpacity: 0.3,
      shadowRadius: 5,
      shadowOffset: {width: 3, height: 3},
      elevation: 3,
    },
  });

  return (
    <Pressable style={[styles.coin]} onPress={onSelect}>
      <FontAwesome5Icon
        name={crownShield === 'crown' ? 'crown' : 'shield-alt'}
        solid
        size={50}
        color={theme.colors.black}
      />
    </Pressable>
  );
};

export const GameCoin = withTheme(Component);
