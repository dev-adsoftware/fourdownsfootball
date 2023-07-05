import {omit} from 'lodash';
import React from 'react';
import {
  Svg as RNSvg,
  Path,
  PathProps,
  SvgXml,
  XmlProps,
  CircleProps,
  Circle,
  MarkerProps,
  Defs,
  Marker,
  RectProps,
  TextProps,
  Rect,
  Text,
  TextPathProps,
  TextPath,
  LineProps,
  Line,
  PolygonProps,
  Polygon,
  G,
} from 'react-native-svg';
import {MarkerUnits} from 'react-native-svg/lib/typescript/elements/Marker';
import {ThemeColorKey, ThemeTeamColorKey, useTheme} from '../providers/theme';
import {
  DimensionProps,
  MarginProps,
  StyleBuilder,
} from '../utilities/style-builder';

interface SvgXmlProps extends DimensionProps, MarginProps {
  xml: XmlProps['xml'];
}

interface SvgChild {
  id: string;
}

export interface SvgMarkerProps extends SvgChild, Omit<MarkerProps, 'id'> {
  type: 'marker';
}

export interface SvgColorProps {
  fill?: ThemeColorKey | ThemeTeamColorKey;
  stroke?: ThemeColorKey | ThemeTeamColorKey;
}

export type SvgColorPropKeys = 'fill' | 'stroke';

export interface SvgPathProps
  extends SvgChild,
    SvgColorProps,
    Omit<PathProps, keyof SvgColorProps | 'id'> {
  type: 'path';
}

export interface SvgCircleProps
  extends SvgChild,
    SvgColorProps,
    Omit<CircleProps, 'fill' | 'stroke' | 'id'> {
  type: 'circle';
}

export interface SvgRectProps
  extends SvgChild,
    SvgColorProps,
    Omit<RectProps, 'fill' | 'stroke' | 'id' | 'height' | 'width'> {
  type: 'rect';
  h: RectProps['height'];
  w: RectProps['width'];
}

export interface SvgTextProps
  extends SvgChild,
    SvgColorProps,
    Omit<TextProps, 'fill' | 'stroke' | 'id'> {
  type: 'text';
  text: string;
  path?: {d: PathProps['d']; startOffset?: TextPathProps['startOffset']};
}

export interface SvgLineProps
  extends SvgChild,
    SvgColorProps,
    Omit<LineProps, 'fill' | 'stroke' | 'id'> {
  type: 'line';
}
export interface SvgPolygonProps
  extends SvgChild,
    SvgColorProps,
    Omit<PolygonProps, 'fill' | 'stroke' | 'id'> {
  type: 'polygon';
}

export type SvgElementType =
  | SvgPathProps
  | SvgCircleProps
  | SvgRectProps
  | SvgTextProps
  | SvgLineProps
  | SvgPolygonProps;

interface SvgElementProps extends DimensionProps {
  viewBoxWidth?: DimensionProps['w'];
  viewBoxHeight?: DimensionProps['h'];
  defs?: SvgMarkerProps[];
  elements: SvgElementType[];
}

export const svgTriangleMarker: SvgMarkerProps = {
  type: 'marker',
  id: 'TriangleMarker',
  viewBox: '0 0 10 10',
  refX: '0',
  refY: '5',
  markerUnits: 'strokeWidth' as MarkerUnits,
  markerWidth: '10',
  orient: 'auto',
  children: [
    <Path
      key="TriangleMarkerPath"
      d="M 0 0 L 10 5 L 0 10 z"
      fill="context-stroke"
    />,
  ],
};

type SvgProps = SvgXmlProps | SvgElementProps;

export const Svg: React.FC<SvgProps> = props => {
  const theme = useTheme();

  const style = React.useMemo(() => {
    return new StyleBuilder(theme).setMarginProps(props as MarginProps).build();
  }, [theme, props]);

  if ((props as SvgXmlProps).xml) {
    const typedProps = props as SvgXmlProps;

    return (
      <SvgXml
        xml={typedProps.xml}
        width={typedProps.w}
        height={typedProps.h}
        style={style.ss}
      />
    );
  } else {
    const typedProps = props as SvgElementProps;

    return (
      <RNSvg
        viewBox={`0 0 ${typedProps.viewBoxWidth || typedProps.w} ${
          typedProps.viewBoxHeight || typedProps.h
        }`}
        height={typedProps.h}
        width={typedProps.w}>
        {typedProps.defs ? (
          <Defs>
            {typedProps.defs?.map(def => {
              if (def.type === 'marker') {
                return (
                  <Marker key={def.id} {...omit(def, 'children')}>
                    {def.children}
                  </Marker>
                );
              }
            })}
          </Defs>
        ) : (
          <></>
        )}
        {typedProps.elements.map(element => {
          if (element.type === 'path') {
            return (
              <Path
                key={element.id}
                fill={theme.getColor(element.fill)}
                stroke={theme.getColor(element.stroke)}
                {...omit(element, ['fill', 'stroke'])}
              />
            );
          }
          if (element.type === 'circle') {
            return (
              <Circle
                key={element.id}
                fill={theme.getColor(element.fill)}
                stroke={theme.getColor(element.stroke)}
                {...omit(element, ['fill', 'stroke'])}
              />
            );
          }
          if (element.type === 'rect') {
            return (
              <Rect
                key={element.id}
                fill={theme.getColor(element.fill)}
                stroke={theme.getColor(element.stroke)}
                width={element.w}
                height={element.h}
                {...omit(element, ['fill', 'stroke'])}
              />
            );
          }
          if (element.type === 'text') {
            return (
              <G key={`${element.id}Group`}>
                {element.path ? (
                  <Defs key={`${element.id}Defs`}>
                    <Path
                      key={`${element.id}DefsPath`}
                      id={`${element.id}PathDef`}
                      d={element.path.d}
                    />
                  </Defs>
                ) : (
                  <></>
                )}
                <Text
                  key={element.id}
                  fill={theme.getColor(element.fill)}
                  stroke={theme.getColor(element.stroke)}
                  {...omit(element, ['fill', 'stroke', 'text'])}>
                  {element.path ? (
                    <TextPath
                      href={`#${element.id}PathDef`}
                      startOffset={element.path.startOffset}>
                      {element.text}
                    </TextPath>
                  ) : (
                    element.text
                  )}
                </Text>
              </G>
            );
          }
          if (element.type === 'line') {
            return (
              <Line
                key={element.id}
                stroke={theme.getColor(element.stroke)}
                {...omit(element, ['fill', 'stroke'])}
              />
            );
          }
          if (element.type === 'polygon') {
            return (
              <Polygon
                key={element.id}
                stroke={theme.getColor(element.stroke)}
                fill={theme.getColor(element.fill)}
                {...omit(element, ['fill', 'stroke'])}
              />
            );
          }
        })}
      </RNSvg>
    );
  }
};
