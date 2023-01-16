import React from 'react';
import {
  Svg as RNSvg,
  Path,
  PathProps,
  SvgXml,
  XmlProps,
} from 'react-native-svg';
import {useTheme} from '../../providers/theme';
import {
  BackgroundProps,
  BorderProps,
  DimensionProps,
  MarginProps,
  StyleBuilder,
} from '../../utilities/style-builder';

interface SvgXmlProps extends DimensionProps, MarginProps {
  xml: XmlProps['xml'];
}

interface SvgPathProps
  extends DimensionProps,
    MarginProps,
    BackgroundProps,
    BorderProps {
  path: PathProps['d'];
}

type SvgProps = SvgXmlProps | SvgPathProps;

export const Svg: React.FC<SvgProps> = props => {
  const theme = useTheme();

  const style = React.useMemo(() => {
    const _props: MarginProps = {
      ...props,
    };
    return new StyleBuilder(theme).setMarginProps(_props).build();
  }, [theme, props]);

  if ((props as SvgXmlProps).xml) {
    const xmlProps = props as SvgXmlProps;

    return (
      <SvgXml
        xml={xmlProps.xml}
        width={xmlProps.w}
        height={xmlProps.h}
        style={style.ss}
      />
    );
  } else {
    const pathProps = props as SvgPathProps;

    return (
      <RNSvg
        viewBox={`0 0 ${pathProps.w} ${pathProps.h}`}
        height={pathProps.h}
        width={pathProps.w}>
        <Path
          d={pathProps.path}
          fill={pathProps.bg ? theme.colors[pathProps.bg] : undefined}
          strokeWidth={pathProps.borderWidth}
          stroke={
            pathProps.borderColor
              ? theme.colors[pathProps.borderColor]
              : undefined
          }
        />
      </RNSvg>
    );
  }
};
