import {StyleSheet, TextStyle, ViewStyle, Animated} from 'react-native';
import {DEFAULT_FONT_SIZE} from '../constants';
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
  customBg?: string;
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

export interface TransformProps {
  rotate?: string;
  translateX?: number;
  translateY?: number;
  scale?: number;
  scaleX?: number;
}

export type AnimatedValueType =
  | Animated.Value
  | Animated.AnimatedInterpolation<number | string>;

export interface AnimationProps {
  animated?: boolean;
  animatedRotate?: {
    animatedValue: AnimatedValueType;
    range: string[];
  };
  animatedTranslateX?: {animatedValue: AnimatedValueType; range: number[]};
  animatedTranslateY?: {animatedValue: AnimatedValueType; range: number[]};
  animatedScale?: {animatedValue: AnimatedValueType; range: number[]};
  animatedScaleX?: {animatedValue: AnimatedValueType; range: number[]};
  animatedOpacity?: {animatedValue: AnimatedValueType; range: number[]};
  animatedHeight?: {animatedValue: AnimatedValueType; range: number[]};
  animatedWidth?: {animatedValue: AnimatedValueType; range: number[]};
}

export interface OpacityProps extends Pick<ViewStyle, 'opacity'> {}

export interface ZIndexProps {
  zIndex?: ViewStyle['zIndex'] | 'top';
}

export interface ViewProps
  extends FlexProps,
    DimensionProps,
    PositionProps,
    PaddingProps,
    MarginProps,
    BackgroundProps,
    BorderProps,
    BorderRadiusProps,
    ZIndexProps,
    OpacityProps {}

export interface TextProps
  extends Pick<
    TextStyle,
    | 'lineHeight'
    | 'textAlign'
    | 'textAlignVertical'
    | 'textTransform'
    | 'textShadowColor'
    | 'textShadowOffset'
    | 'textShadowRadius'
  > {
  fontSize?: ThemeFontSizeKey;
  typeFace?: ThemeTypeFacesKey;
}

export interface DebugProps {
  debugColor?: ViewStyle['backgroundColor'];
}

export class StyleBuilder {
  public styleObject: ViewStyle | TextStyle;
  public staticTransformStyleObjects:
    | ViewStyle['transform']
    | ViewStyle['transform'];
  public animatedStyleObjects: {
    transform: Animated.AnimatedProps<
      ViewStyle['transform'] | TextStyle['transform']
    >;
    others: Animated.AnimatedProps<{
      opacity: ViewStyle['opacity'] | TextStyle['opacity'];
      height: ViewStyle['height'] | TextStyle['height'];
      width: ViewStyle['width'] | TextStyle['width'];
    }>;
  } = {
    transform: [],
    others: {opacity: undefined, height: undefined, width: undefined},
  };

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
      backgroundColor: props.bg
        ? this.theme.colors[props.bg]
        : props.customBg || undefined,
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
        props.borderTopWidth ||
        props.borderHorizontalWidth ||
        props.borderWidth,
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
        convertCircleToNumber(props.borderLeftRadius) ||
        convertCircleToNumber(props.borderRadius),
      borderTopRightRadius:
        convertCircleToNumber(props.borderTopRightRadius) ||
        convertCircleToNumber(props.borderTopRadius) ||
        convertCircleToNumber(props.borderRightRadius) ||
        convertCircleToNumber(props.borderRadius),
      borderBottomLeftRadius:
        convertCircleToNumber(props.borderBottomLeftRadius) ||
        convertCircleToNumber(props.borderBottomRadius) ||
        convertCircleToNumber(props.borderLeftRadius) ||
        convertCircleToNumber(props.borderRadius),
      borderBottomRightRadius:
        convertCircleToNumber(props.borderBottomRightRadius) ||
        convertCircleToNumber(props.borderBottomRadius) ||
        convertCircleToNumber(props.borderRightRadius) ||
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

  public setAnimationProps<P extends AnimationProps>(
    props: P,
    animated?: boolean,
  ): StyleBuilder {
    if (!animated) {
      return this;
    }

    this.animatedStyleObjects.transform = [];
    if (props.animatedRotate) {
      this.animatedStyleObjects?.transform.push({
        rotate: props.animatedRotate.animatedValue.interpolate({
          inputRange: props.animatedRotate.range.map((_, i) => i),
          outputRange: [
            props.animatedRotate.range[0],
            props.animatedRotate.range[1],
          ],
        }),
      });
    }
    if (props.animatedTranslateX) {
      this.animatedStyleObjects?.transform.push({
        translateX: props.animatedTranslateX.animatedValue.interpolate({
          inputRange: props.animatedTranslateX.range.map((_, i) => i),
          outputRange: props.animatedTranslateX.range,
        }),
      });
    }
    if (props.animatedTranslateY) {
      this.animatedStyleObjects?.transform.push({
        translateY: props.animatedTranslateY.animatedValue.interpolate({
          inputRange: props.animatedTranslateY.range.map((_, i) => i),
          outputRange: props.animatedTranslateY.range,
        }),
      });
    }
    if (props.animatedScale) {
      this.animatedStyleObjects?.transform.push({
        scale: props.animatedScale.animatedValue.interpolate({
          inputRange: props.animatedScale.range.map((_, i) => i),
          outputRange: props.animatedScale.range,
        }),
      });
    }
    if (props.animatedScaleX) {
      this.animatedStyleObjects?.transform.push({
        scaleX: props.animatedScaleX.animatedValue.interpolate({
          inputRange: props.animatedScaleX.range.map((_, i) => i),
          outputRange: props.animatedScaleX.range,
        }),
      });
    }
    if (props.animatedOpacity) {
      this.animatedStyleObjects.others = {
        ...this.animatedStyleObjects.others,
        opacity: props.animatedOpacity.animatedValue.interpolate<number>({
          inputRange: props.animatedOpacity.range.map((_, i) => i),
          outputRange: props.animatedOpacity.range,
        }),
      };
    }
    if (props.animatedHeight) {
      this.animatedStyleObjects.others = {
        ...this.animatedStyleObjects.others,
        height: props.animatedHeight.animatedValue.interpolate<number>({
          inputRange: props.animatedHeight.range.map((_, i) => i),
          outputRange: props.animatedHeight.range,
        }),
      };
    }
    if (props.animatedWidth) {
      this.animatedStyleObjects.others = {
        ...this.animatedStyleObjects.others,
        width: props.animatedWidth.animatedValue.interpolate<number>({
          inputRange: props.animatedWidth.range.map((_, i) => i),
          outputRange: props.animatedWidth.range,
        }),
      };
    }

    return this;
  }

  public setStaticTransformProps<P extends TransformProps>(
    props: P,
    animated?: boolean,
  ): StyleBuilder {
    if (animated) {
      return this;
    }

    this.staticTransformStyleObjects = [];
    if (props.rotate) {
      this.staticTransformStyleObjects?.push({
        rotate: props.rotate,
      });
    }
    if (props.translateX) {
      this.staticTransformStyleObjects?.push({
        translateX: props.translateX,
      });
    }
    if (props.translateY) {
      this.staticTransformStyleObjects?.push({
        translateY: props.translateY,
      });
    }
    if (props.scale) {
      this.staticTransformStyleObjects?.push({
        scale: props.scale,
      });
    }
    if (props.scaleX) {
      this.staticTransformStyleObjects?.push({
        scaleX: props.scaleX,
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

  public setZIndexProps<P extends ZIndexProps>(props: P): StyleBuilder {
    this.styleObject = {
      ...this.styleObject,
      zIndex: props.zIndex === 'top' ? 9999 : props.zIndex,
    };
    return this;
  }

  public setViewProps<P extends ViewProps>(props: P): StyleBuilder {
    return this.setFlexProps(props)
      .setDimensionProps(props)
      .setPositionProps(props)
      .setPaddingProps(props)
      .setMarginProps(props)
      .setBackgroundProps(props)
      .setBorderProps(props)
      .setBorderRadiusProps(props)
      .setZIndexProps(props)
      .setOpacityProps(props);
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
        : DEFAULT_FONT_SIZE,
      ...(props.typeFace ? this.theme.typeFaces[props.typeFace] : {}),
      textShadowColor: props.textShadowColor,
      textShadowOffset: props.textShadowOffset,
      textShadowRadius: props.textShadowRadius,
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

  public buildStaticTransformStyles() {
    return this.staticTransformStyleObjects
      ? this.staticTransformStyleObjects
      : undefined;
  }
}
