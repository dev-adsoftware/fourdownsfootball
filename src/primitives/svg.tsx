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
} from 'react-native-svg';
import {MarkerUnits} from 'react-native-svg/lib/typescript/elements/Marker';
import {ThemeColorKey, useTheme} from '../providers/theme';
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

export interface SvgPathProps
  extends SvgChild,
    Omit<PathProps, 'fill' | 'stroke' | 'id'> {
  type: 'path';
  fill?: ThemeColorKey;
  stroke?: ThemeColorKey;
}

export interface SvgCircleProps
  extends SvgChild,
    Omit<CircleProps, 'fill' | 'id'> {
  type: 'circle';
  fill?: ThemeColorKey;
}

interface SvgElementProps extends DimensionProps {
  defs?: SvgMarkerProps[];
  elements: (SvgPathProps | SvgCircleProps)[];
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
        viewBox={`0 0 ${typedProps.w} ${typedProps.h}`}
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
                {...omit(element, ['fill'])}
              />
            );
          }
        })}
      </RNSvg>
    );
  }
};
