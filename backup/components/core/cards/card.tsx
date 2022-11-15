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
      marginTop: 10,
      marginHorizontal: 8,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: theme.colors.background || theme.colors.separator,
      shadowColor: '#000',
      shadowOpacity: 0.9,
      shadowRadius: 5,
      shadowOffset: {width: 3, height: 3},
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
      {heading.length > 0 ? (
        <View style={[styles.cardHeader]}>
          <Text style={[styles.cardHeaderText]}>{heading}</Text>
        </View>
      ) : (
        <></>
      )}
      {children}
    </View>
  );
};

export const Card = withTheme(Component);
