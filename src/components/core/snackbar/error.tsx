import React from 'react';
import {Animated, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {useTheme} from '../../../providers/theme';
import {LinkButton} from '../buttons/link';

type Properties = {
  text: string;
  visible?: boolean;
  onDismiss: () => void;
};

const Component: React.FC<Properties> = ({text, visible, onDismiss}) => {
  const [hidden, setHidden] = React.useState<boolean>(!visible);

  const {current: opacity} = React.useRef<Animated.Value>(
    new Animated.Value(0.0),
  );

  /* eslint-disable-next-line no-undef */
  const hideTimeout = React.useRef<NodeJS.Timeout | undefined>(undefined);

  React.useEffect(() => {
    return () => {
      if (hideTimeout.current) {
        clearTimeout(hideTimeout.current);
      }
    };
  }, []);

  const scale = 1;
  const duration = 5000;

  React.useLayoutEffect(() => {
    if (visible) {
      if (hideTimeout.current) {
        clearTimeout(hideTimeout.current);
      }
      setHidden(false);
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200 * scale,
        useNativeDriver: true,
      }).start(({finished}) => {
        if (finished) {
          const isInfinity =
            duration === Number.POSITIVE_INFINITY ||
            duration === Number.NEGATIVE_INFINITY;

          if (finished && !isInfinity) {
            hideTimeout.current = setTimeout(onDismiss, duration);
          }
        }
      });
    } else {
      if (hideTimeout.current) {
        clearTimeout(hideTimeout.current);
      }

      Animated.timing(opacity, {
        toValue: 0,
        duration: 100 * scale,
        useNativeDriver: true,
      }).start(({finished}) => {
        if (finished) {
          setHidden(true);
        }
      });
    }
  }, [visible, duration, opacity, scale, onDismiss]);

  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      top: 0,
      width: '100%',
    },
    animation: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      margin: 8,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: theme.colors.separator,
      backgroundColor: theme.colors.secondaryBackground,
    },
    text: {
      marginHorizontal: 16,
      marginVertical: 14,
      flexWrap: 'wrap',
      flex: 1,
      color: theme.colors.error,
    },
    dismissButton: {
      marginRight: 16,
    },
  });

  return hidden ? (
    <></>
  ) : (
    <SafeAreaView style={[styles.container]}>
      <Animated.View
        style={[
          {
            opacity,
            transform: [
              {
                scale: visible
                  ? opacity.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.9, 1],
                    })
                  : 1,
              },
            ],
          },
          styles.animation,
        ]}>
        <Text style={[styles.text]}>{text}</Text>
        <View style={[styles.dismissButton]}>
          <LinkButton text="Dismiss" onPress={onDismiss} />
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

export {Component as ErrorSnackbar};
