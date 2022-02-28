import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {InjectedThemeProps, withTheme} from '../../../hoc/with-theme';
import {Button} from '../buttons/button';

interface Properties extends InjectedThemeProps {
  text: string;
  isProcessingExternal?: boolean;
  onConfirm: () => Promise<void>;
}

const Component: React.FC<Properties> = props => {
  const {text, isProcessingExternal, onConfirm, theme} = props;

  const [isProcessing, setIsProcessing] = React.useState(isProcessingExternal);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: 20,
    },
    buttonContainer: {
      width: 200,
    },
    text: {
      marginVertical: 20,
      textAlign: 'center',
      color: theme.colors.text,
    },
  });

  React.useEffect(() => {
    return () => setIsProcessing(false);
  }, []);

  return (
    <View style={[styles.container]}>
      <Text style={[styles.text]}>{text}</Text>
      <View style={[styles.buttonContainer]}>
        <Button
          text="Confirm"
          isLoading={isProcessing}
          onPress={async () => {
            setIsProcessing(true);
            await onConfirm();
          }}
        />
      </View>
    </View>
  );
};

export const ConfirmActionForm = withTheme(Component);
