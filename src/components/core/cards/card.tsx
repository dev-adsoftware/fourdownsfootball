import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {InjectedThemeProps, withTheme} from '../../../hoc/with-theme';

interface Properties extends InjectedThemeProps {
  heading: string;
  children: React.ReactNode;
}

const Component: React.FC<Properties> = props => {
  const {heading, children, theme} = props;
  const styles = StyleSheet.create({
    cardContainer: {
      backgroundColor: theme.colors.background,
      marginTop: 5,
      marginHorizontal: 5,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: theme.colors.separator,
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowRadius: 3,
      shadowOffset: {width: 0, height: 3},
      elevation: 3,
      padding: 15,
    },
    cardHeader: {
      paddingBottom: 10,
      marginBottom: 10,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.separator,
    },
    cardHeaderText: {
      ...theme.typography.footnote,
      color: theme.colors.text,
      fontWeight: 'bold',
      letterSpacing: 1,
    },
  });

  return (
    <View style={[styles.cardContainer]}>
      <View style={[styles.cardHeader]}>
        <Text style={[styles.cardHeaderText]}>{heading}</Text>
      </View>
      {children}
    </View>
  );
};

export const Card = withTheme(Component);
