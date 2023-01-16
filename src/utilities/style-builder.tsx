import {
  StyleSheet,
  TextStyle,
  ViewStyle,
  TransformsStyle,
  Animated,
} from 'react-native';
import {
  Theme,
  ThemeColorKey,
  ThemeFontSizeKey,
  ThemeIconSizeKey,
  ThemeTypeFacesKey,
} from '../providers/theme';

export interface PositionProps {
  position?: ViewStyle['position'];
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
}
export interface DimensionProps {
  h?: ViewStyle['height'];
  w?: ViewStyle['width'];
}

export interface MarginProps {
  m?: ViewStyle['margin'];
  mt?: ViewStyle['margin'];
  mr?: ViewStyle['margin'];
  mb?: ViewStyle['margin'];
  ml?: ViewStyle['margin'];
  mx?: ViewStyle['margin'];
  my?: ViewStyle['margin'];
  ms?: ViewStyle['margin'];
}

export interface PaddingProps {
  p?: ViewStyle['padding'];
  pt?: ViewStyle['padding'];
  pr?: ViewStyle['padding'];
  pb?: ViewStyle['padding'];
  pl?: ViewStyle['padding'];
  px?: ViewStyle['padding'];
  py?: ViewStyle['padding'];
  ps?: ViewStyle['padding'];
}

export interface BackgroundProps {
  bg?: ThemeColorKey;
}

export interface ColorProps {
  color?: ThemeColorKey;
}

export interface BorderProps {
  borderColor?: ThemeColorKey;
  borderTopColor?: ThemeColorKey;
  borderRightColor?: ThemeColorKey;
  borderBottomColor?: ThemeColorKey;
  borderLeftColor?: ThemeColorKey;
  borderVerticalColor?: ThemeColorKey;
  borderHorizontalColor?: ThemeColorKey;
  borderWidth?: ViewStyle['borderWidth'];
  borderTopWidth?: ViewStyle['borderWidth'];
  borderRightWidth?: ViewStyle['borderWidth'];
  borderLeftWidth?: ViewStyle['borderWidth'];
  borderBottomWidth?: ViewStyle['borderWidth'];
  borderVerticalWidth?: ViewStyle['borderWidth'];
  borderHorizontalWidth?: ViewStyle['borderWidth'];
}

export interface BorderRadiusProps {
  borderRadius?: ViewStyle['borderRadius'] | 'circle';
  borderTopLeftRadius?: ViewStyle['borderRadius'] | 'circle';
  borderTopRightRadius?: ViewStyle['borderRadius'] | 'circle';
  borderBottomLeftRadius?: ViewStyle['borderRadius'] | 'circle';
  borderBottomRightRadius?: ViewStyle['borderRadius'] | 'circle';
  borderTopRadius?: ViewStyle['borderRadius'] | 'circle';
  borderLeftRadius?: ViewStyle['borderRadius'] | 'circle';
  borderRightRadius?: ViewStyle['borderRadius'] | 'circle';
  borderBottomRadius?: ViewStyle['borderRadius'] | 'circle';
}

export interface OverflowProps {
  overflow?: 'hidden' | 'visible' | 'scroll';
}

export interface IconProps {
  size?: ThemeIconSizeKey;
}

export interface FlexProps
  extends Pick<ViewStyle, 'alignItems' | 'justifyContent'> {
  flex?: ViewStyle['flex'] | 'none';
  row?: boolean;
}

export interface TransformProps extends Pick<TransformsStyle, 'transform'> {}

export interface AnimationProps {
  animated?: boolean;
  rotate?: {animatedValue: Animated.Value; range: string[]};
  translateX?: {animatedValue: Animated.Value; range: number[]};
  translateY?: {animatedValue: Animated.Value; range: number[]};
  scale?: {animatedValue: Animated.Value; range: number[]};
}

export interface OpacityProps extends Pick<ViewStyle, 'opacity'> {}

export interface TextProps
  extends Pick<
    TextStyle,
    'lineHeight' | 'textAlign' | 'textAlignVertical' | 'textTransform'
  > {
  fontSize?: ThemeFontSizeKey;
  typeFace?: ThemeTypeFacesKey;
}

export interface DebugProps {
  debugColor?: ViewStyle['backgroundColor'];
}

export class StyleBuilder {
  public styleObject: ViewStyle | TextStyle;
  public animatedStyleObjects: Animated.AnimatedProps<
    ViewStyle['transform'] | TextStyle['transform']
  > = [];

  constructor(public readonly theme: Theme) {}

  public setPositionProps<P extends PositionProps>(props: P): StyleBuilder {
    this.styleObject = {
      ...this.styleObject,
      position: props.position,
      top: props.top,
      right: props.right,
      bottom: props.bottom,
      left: props.left,
    };
    return this;
  }

  public setDimensionProps<P extends DimensionProps>(props: P): StyleBuilder {
    this.styleObject = {
      ...this.styleObject,
      width: props.w === 'full' ? '100%' : props.w,
      height: props.h,
    };
    return this;
  }

  public setMarginProps<P extends MarginProps>(props: P): StyleBuilder {
    this.styleObject = {
      ...this.styleObject,
      margin: props.m,
      marginTop: props.mt || props.my,
      marginRight: props.mr || props.mx,
      marginBottom: props.mb || props.my,
      marginLeft: props.ml || props.mx,
    };
    return this;
  }

  public setPaddingProps<P extends PaddingProps>(props: P): StyleBuilder {
    this.styleObject = {
      ...this.styleObject,
      padding: props.p,
      paddingTop: props.pt || props.py,
      paddingRight: props.pr || props.px,
      paddingBottom: props.pb || props.py,
      paddingLeft: props.pl || props.px,
    };
    return this;
  }

  public setBackgroundProps<P extends BackgroundProps>(props: P): StyleBuilder {
    this.styleObject = {
      ...this.styleObject,
      backgroundColor: props.bg ? this.theme.colors[props.bg] : undefined,
    };
    return this;
  }

  public setColorProps<P extends ColorProps>(props: P): StyleBuilder {
    this.styleObject = {
      ...this.styleObject,
      color: props.color ? this.theme.colors[props.color] : undefined,
    };
    return this;
  }

  public setBorderProps<P extends BorderProps>(props: P): StyleBuilder {
    this.styleObject = {
      ...this.styleObject,
      borderColor: props.borderColor
        ? this.theme.colors[props.borderColor]
        : undefined,
      borderTopColor: props.borderTopColor
        ? this.theme.colors[props.borderTopColor]
        : props.borderHorizontalColor
        ? this.theme.colors[props.borderHorizontalColor]
        : undefined,
      borderRightColor: props.borderRightColor
        ? this.theme.colors[props.borderRightColor]
        : props.borderVerticalColor
        ? this.theme.colors[props.borderVerticalColor]
        : undefined,
      borderBottomColor: props.borderBottomColor
        ? this.theme.colors[props.borderBottomColor]
        : props.borderHorizontalColor
        ? this.theme.colors[props.borderHorizontalColor]
        : undefined,
      borderLeftColor: props.borderLeftColor
        ? this.theme.colors[props.borderLeftColor]
        : props.borderVerticalColor
        ? this.theme.colors[props.borderVerticalColor]
        : undefined,
      borderTopWidth:
        props.borderTopWidth || props.borderVerticalWidth || props.borderWidth,
      borderRightWidth:
        props.borderRightWidth ||
        props.borderVerticalWidth ||
        props.borderWidth,
      borderBottomWidth:
        props.borderBottomWidth ||
        props.borderHorizontalWidth ||
        props.borderWidth,
      borderLeftWidth:
        props.borderLeftWidth || props.borderVerticalWidth || props.borderWidth,
    };
    return this;
  }

  public setBorderRadiusProps<P extends BorderRadiusProps>(
    props: P,
  ): StyleBuilder {
    const convertCircleToNumber = (
      value: ViewStyle['borderRadius'] | 'circle',
    ): ViewStyle['borderRadius'] => {
      return value === 'circle' ? 9999 : value;
    };
    this.styleObject = {
      ...this.styleObject,
      borderTopLeftRadius:
        convertCircleToNumber(props.borderTopLeftRadius) ||
        convertCircleToNumber(props.borderTopRadius) ||
        convertCircleToNumber(props.borderRadius),
      borderTopRightRadius:
        convertCircleToNumber(props.borderTopRightRadius) ||
        convertCircleToNumber(props.borderTopRadius) ||
        convertCircleToNumber(props.borderRadius),
      borderBottomLeftRadius:
        convertCircleToNumber(props.borderBottomLeftRadius) ||
        convertCircleToNumber(props.borderBottomRadius) ||
        convertCircleToNumber(props.borderRadius),
      borderBottomRightRadius:
        convertCircleToNumber(props.borderBottomRightRadius) ||
        convertCircleToNumber(props.borderBottomRadius) ||
        convertCircleToNumber(props.borderRadius),
    };
    return this;
  }

  public setOverflowProps<P extends OverflowProps>(props: P): StyleBuilder {
    this.styleObject = {
      ...this.styleObject,
      overflow: props.overflow,
    };
    return this;
  }

  public setFlexProps<P extends FlexProps>(props: P): StyleBuilder {
    this.styleObject = {
      ...this.styleObject,
      flex: props.flex === 'none' ? undefined : props.flex,
      flexDirection: props.row ? 'row' : 'column',
      alignItems: props.alignItems,
      justifyContent: props.justifyContent,
    };
    return this;
  }

  public setTransformProps<P extends TransformProps>(props: P): StyleBuilder {
    this.styleObject = {
      transform: props.transform,
    };
    return this;
  }

  public setAnimationProps<P extends AnimationProps>(props: P): StyleBuilder {
    if (props.rotate) {
      this.animatedStyleObjects?.push({
        rotate: props.rotate.animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [props.rotate.range[0], props.rotate.range[1]],
        }),
      });
    }
    if (props.translateX) {
      this.animatedStyleObjects?.push({
        translateX: props.translateX.animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [props.translateX.range[0], props.translateX.range[1]],
        }),
      });
    }
    if (props.translateY) {
      this.animatedStyleObjects?.push({
        translateY: props.translateY.animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [props.translateY.range[0], props.translateY.range[1]],
        }),
      });
    }
    if (props.scale) {
      this.animatedStyleObjects?.push({
        scale: props.scale.animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [props.scale.range[0], props.scale.range[1]],
        }),
      });
    }

    return this;
  }

  public setOpacityProps<P extends OpacityProps>(props: P): StyleBuilder {
    this.styleObject = {
      ...this.styleObject,
      opacity: props.opacity,
    };
    return this;
  }

  public setTextProps<P extends TextProps>(props: P): StyleBuilder {
    this.styleObject = {
      ...this.styleObject,
      lineHeight: props.lineHeight,
      textAlign: props.textAlign,
      textAlignVertical: props.textAlignVertical,
      textTransform: props.textTransform,
      fontSize: props.fontSize
        ? this.theme.fontSizes[props.fontSize]
        : this.theme.fontSizes.body,
      ...(props.typeFace ? this.theme.typeFaces[props.typeFace] : {}),
    };

    return this;
  }

  public setDebugProps<P extends DebugProps>(props: P): StyleBuilder {
    this.styleObject = {
      ...this.styleObject,
      backgroundColor: props.debugColor || this.styleObject.backgroundColor,
    };
    return this;
  }

  public build() {
    return StyleSheet.create<{ss: ViewStyle | TextStyle}>({
      ss: this.styleObject,
    });
  }

  public buildAnimatedStyles() {
    return this.animatedStyleObjects;
  }
}
