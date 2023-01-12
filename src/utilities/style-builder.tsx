import {
  StyleSheet,
  TextStyle,
  ViewStyle,
  TransformsStyle,
  Animated,
} from 'react-native';
import {
  Theme,
  ThemeBorderRadiiKey,
  ThemeBorderWidthKey,
  ThemeColorKey,
  ThemeFontSizeKey,
  ThemeIconSizeKey,
  ThemeSpacingKey,
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
  h?: number;
  w?: number | 'full' | 'fit';
}

export interface MarginProps {
  m?: ThemeSpacingKey;
  mt?: ThemeSpacingKey;
  mr?: ThemeSpacingKey;
  mb?: ThemeSpacingKey;
  ml?: ThemeSpacingKey;
  mx?: ThemeSpacingKey;
  my?: ThemeSpacingKey;
  ms?: ThemeSpacingKey;
}

export interface PaddingProps {
  p?: ThemeSpacingKey;
  pt?: ThemeSpacingKey;
  pr?: ThemeSpacingKey;
  pb?: ThemeSpacingKey;
  pl?: ThemeSpacingKey;
  px?: ThemeSpacingKey;
  py?: ThemeSpacingKey;
  ps?: ThemeSpacingKey;
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
  borderWidth?: ThemeBorderWidthKey;
  borderTopWidth?: ThemeBorderWidthKey;
  borderRightWidth?: ThemeBorderWidthKey;
  borderLeftWidth?: ThemeBorderWidthKey;
  borderBottomWidth?: ThemeBorderWidthKey;
  borderVerticalWidth?: ThemeBorderWidthKey;
  borderHorizontalWidth?: ThemeBorderWidthKey;
}

export interface BorderRadiusProps {
  borderRadius?: ThemeBorderRadiiKey;
  borderTopLeftRadius?: ThemeBorderRadiiKey;
  borderTopRightRadius?: ThemeBorderRadiiKey;
  borderBottomLeftRadius?: ThemeBorderRadiiKey;
  borderBottomRightRadius?: ThemeBorderRadiiKey;
  borderTopRadius?: ThemeBorderRadiiKey;
  borderLeftRadius?: ThemeBorderRadiiKey;
  borderRightRadius?: ThemeBorderRadiiKey;
  borderBottomRadius?: ThemeBorderRadiiKey;
}

export interface OverflowProps {
  overflow?: 'hidden' | 'visible' | 'scroll';
}

export interface IconProps {
  size?: ThemeIconSizeKey;
}

export interface FlexProps
  extends Pick<
    ViewStyle,
    'flex' | 'flexDirection' | 'alignItems' | 'justifyContent'
  > {}

export interface TransformProps extends Pick<TransformsStyle, 'transform'> {}

export interface AnimationProps {
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

export interface DebugProps extends Pick<BackgroundProps, 'bg'> {}

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
      width:
        props.w === 'full' ? '100%' : props.w === 'fit' ? undefined : props.w,
      height: props.h,
    };
    return this;
  }

  public setMarginProps<P extends MarginProps>(props: P): StyleBuilder {
    this.styleObject = {
      ...this.styleObject,
      margin: props.m ? this.theme.spacing[props.m] : undefined,
      marginTop: props.mt
        ? this.theme.spacing[props.mt]
        : props.my
        ? this.theme.spacing[props.my]
        : undefined,
      marginRight: props.mr
        ? this.theme.spacing[props.mr]
        : props.mx
        ? this.theme.spacing[props.mx]
        : undefined,
      marginBottom: props.mb
        ? this.theme.spacing[props.mb]
        : props.my
        ? this.theme.spacing[props.my]
        : undefined,
      marginLeft: props.ml
        ? this.theme.spacing[props.ml]
        : props.mx
        ? this.theme.spacing[props.mx]
        : undefined,
    };
    return this;
  }

  public setPaddingProps<P extends PaddingProps>(props: P): StyleBuilder {
    this.styleObject = {
      ...this.styleObject,
      padding: props.p ? this.theme.spacing[props.p] : undefined,
      paddingTop: props.pt
        ? this.theme.spacing[props.pt]
        : props.py
        ? this.theme.spacing[props.py]
        : undefined,
      paddingRight: props.pr
        ? this.theme.spacing[props.pr]
        : props.px
        ? this.theme.spacing[props.px]
        : undefined,
      paddingBottom: props.pb
        ? this.theme.spacing[props.pb]
        : props.py
        ? this.theme.spacing[props.py]
        : undefined,
      paddingLeft: props.pl
        ? this.theme.spacing[props.pl]
        : props.px
        ? this.theme.spacing[props.px]
        : undefined,
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
      borderWidth: props.borderWidth
        ? this.theme.borderWidths[props.borderWidth]
        : undefined,
      borderTopWidth: props.borderTopWidth
        ? this.theme.borderWidths[props.borderTopWidth]
        : props.borderHorizontalWidth
        ? this.theme.borderWidths[props.borderHorizontalWidth]
        : undefined,
      borderRightWidth: props.borderRightWidth
        ? this.theme.borderWidths[props.borderRightWidth]
        : props.borderVerticalWidth
        ? this.theme.borderWidths[props.borderVerticalWidth]
        : undefined,
      borderBottomWidth: props.borderBottomWidth
        ? this.theme.borderWidths[props.borderBottomWidth]
        : props.borderHorizontalWidth
        ? this.theme.borderWidths[props.borderHorizontalWidth]
        : undefined,
      borderLeftWidth: props.borderLeftWidth
        ? this.theme.borderWidths[props.borderLeftWidth]
        : props.borderVerticalWidth
        ? this.theme.borderWidths[props.borderVerticalWidth]
        : undefined,
    };
    return this;
  }

  public setBorderRadiusProps<P extends BorderRadiusProps>(
    props: P,
  ): StyleBuilder {
    this.styleObject = {
      ...this.styleObject,
      borderRadius: props.borderRadius
        ? this.theme.borderRadii[props.borderRadius]
        : undefined,
      borderTopLeftRadius: props.borderTopLeftRadius
        ? this.theme.borderRadii[props.borderTopLeftRadius]
        : props.borderTopRadius
        ? this.theme.borderRadii[props.borderTopRadius]
        : undefined,
      borderTopRightRadius: props.borderTopRightRadius
        ? this.theme.borderRadii[props.borderTopRightRadius]
        : props.borderTopRadius
        ? this.theme.borderRadii[props.borderTopRadius]
        : undefined,
      borderBottomLeftRadius: props.borderBottomLeftRadius
        ? this.theme.borderRadii[props.borderBottomLeftRadius]
        : props.borderBottomRadius
        ? this.theme.borderRadii[props.borderBottomRadius]
        : undefined,
      borderBottomRightRadius: props.borderBottomRightRadius
        ? this.theme.borderRadii[props.borderBottomRightRadius]
        : props.borderBottomRadius
        ? this.theme.borderRadii[props.borderBottomRadius]
        : undefined,
    };
    return this;
  }

  public setOverflowProps<P extends OverflowProps>(props: P): StyleBuilder {
    this.styleObject = {
      ...this.styleObject,
      overflow: props.overflow || 'hidden',
    };
    return this;
  }

  public setFlexProps<P extends FlexProps>(props: P): StyleBuilder {
    this.styleObject = {
      ...this.styleObject,
      flex: props.flex,
      flexDirection: props.flexDirection,
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
        : this.theme.fontSizes.md,
      ...(props.typeFace ? this.theme.typeFaces[props.typeFace] : {}),
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
