import React from 'react';
import {Animated, Easing} from 'react-native';
import {Path, PathProps} from 'react-native-svg';
import {svgPathProperties} from 'svg-path-properties';
import {InjectedThemeProps, withTheme} from '../../hoc/with-styles';

interface Properties extends InjectedThemeProps {
  path: string;
}

const Component: React.FC<Properties> = props => {
  const {path, theme} = props;

  const pathProps = new svgPathProperties(path);
  const strokeDashoffset = React.useRef(
    new Animated.Value(pathProps.getTotalLength()),
  ).current;
  const pathRef = React.useRef<React.Component<PathProps, any, any> | null>(
    null,
  );

  React.useEffect(() => {
    strokeDashoffset.addListener(animatedValue => {
      if (pathRef && pathRef.current) {
        (pathRef as any).current.setNativeProps({
          strokeDashoffset: animatedValue.value,
        });
      }
    });

    Animated.timing(strokeDashoffset, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start(() => {
      console.log('animation done');
    });
  }, [strokeDashoffset]);

  return (
    <Path
      ref={pathRef}
      strokeDasharray={[pathProps.getTotalLength(), pathProps.getTotalLength()]}
      strokeWidth="2"
      stroke={theme.colors.black}
      d={path}
    />
  );
};

export const AnimatedPath = withTheme(Component);
