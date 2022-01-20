import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useTheme} from '../../../providers/theme';
import {Button} from '../buttons/button';

type Properties = {
  text: string;
  onConfirm: () => Promise<void>;
};

const Component: React.FC<Properties> = ({text, onConfirm}) => {
  const [isProcessing, setIsProcessing] = React.useState(false);

  const theme = useTheme();

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

export {Component as ConfirmActionForm};
