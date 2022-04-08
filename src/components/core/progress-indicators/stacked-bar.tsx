import React from 'react';
import {StyleSheet, View} from 'react-native';
import {InjectedThemeProps, withTheme} from '../../../hoc/with-theme';

interface Properties extends InjectedThemeProps {
  sections: {percent: number; color: string}[];
  height?: number;
}

const Component: React.FC<Properties> = props => {
  const {sections, height = 15, theme} = props;
  const styles = StyleSheet.create({
    progressBar: {
      width: '100%',
      flexDirection: 'row',
      borderWidth: 1,
      borderColor: theme.colors.separator,
      alignItems: 'center',
      height: height,
    },
    section: {height: '100%'},
  });

  return (
    <View style={[styles.progressBar]}>
      {sections.map(section => {
        return (
          <View
            style={[
              styles.section,
              {
                width: `${section.percent}%`,
                backgroundColor: section.color,
              },
            ]}
          />
        );
      })}
    </View>
  );
};

export const StackedBar = withTheme(Component);
