import React from 'react';
import {Svg} from '../../../primitives/svg';
import {DimensionProps} from '../../../utilities/style-builder';
import {bodySvgXml, BodyType} from './body';
import {earSvgXml, EarType} from './ear';
import {eyeSvgXml, EyeType} from './eye';
import {eyeLineSvgXml, EyeLineType} from './eye-line';
import {EyebrowType, eyebrowSvgXml} from './eyebrow';
import {facialHairSvgXml, FacialHairType} from './facial-hair';
import {hairSvgXml, HairType} from './hair';
import {hairBackgroundSvgXml, HairBackgroundType} from './hair-background';
import {headSvgXml, HeadType} from './head';
import {jerseySvgSml, JerseyType} from './jersey';
import {miscLineSvgXml, MiscLineType} from './misc-line';
import {mouthSvgXml, MouthType} from './mouth';
import {noseSvgXml, NoseType} from './nose';
import {smileLineSvgXml, SmileLineType} from './smile-line';

interface FaceSvgProps extends DimensionProps {
  body: BodyType;
  jersey: JerseyType;
  head: HeadType;
  hairBackground: HairBackgroundType;
  ear: EarType;
  eyeLine: EyeLineType;
  smileLine: SmileLineType;
  miscLine: MiscLineType;
  facialHair: FacialHairType;
  eye: EyeType;
  eyebrow: EyebrowType;
  mouth: MouthType;
  nose: NoseType;
  hair: HairType;
  skinColor: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  headShaveColor: string;
  faceShaveColor: string;
  hairColor: string;
}

export const FaceSvg: React.FC<FaceSvgProps> = props => {
  const xml = React.useMemo(() => {
    // @ts-ignore
    return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 600" width="400" height="600">
${hairBackgroundSvgXml[props.hairBackground].xml}
${bodySvgXml[props.body].xml}
${jerseySvgSml[props.jersey].xml}
${earSvgXml[props.ear].xml.replace(
  '$[transform]',
  `translate(${earSvgXml[props.ear].position?.left.x},${
    earSvgXml[props.ear].position?.left.y
  })`,
)}
${earSvgXml[props.ear].xml.replace(
  '$[transform]',
  `translate(${earSvgXml[props.ear].position?.right.x},${
    earSvgXml[props.ear].position?.right.y
  }) scale(-1,1)`,
)}
${headSvgXml[props.head].xml}
${eyeLineSvgXml[props.eyeLine].xml}
${smileLineSvgXml[props.smileLine].xml.replace(
  '$[transform]',
  `translate(${smileLineSvgXml[props.smileLine].position?.left.x},${
    smileLineSvgXml[props.smileLine].position?.left.y
  })`,
)}
${smileLineSvgXml[props.smileLine].xml.replace(
  '$[transform]',
  `translate(${smileLineSvgXml[props.smileLine].position?.right.x},${
    smileLineSvgXml[props.smileLine].position?.right.y
  }) scale(-1,1)`,
)}
${miscLineSvgXml[props.miscLine].xml}
${facialHairSvgXml[props.facialHair].xml}
${eyeSvgXml[props.eye].xml.replace(
  '$[transform]',
  `translate(${eyeSvgXml[props.eye].position?.left.x},${
    eyeSvgXml[props.eye].position?.left.y
  })`,
)}
${eyeSvgXml[props.eye].xml.replace(
  '$[transform]',
  `translate(${eyeSvgXml[props.eye].position?.right.x},${
    eyeSvgXml[props.eye].position?.right.y
  }) scale(-1,1)`,
)}
${eyebrowSvgXml[props.eyebrow].xml.replace(
  '$[transform]',
  `translate(${eyebrowSvgXml[props.eyebrow].position?.left.x},${
    eyebrowSvgXml[props.eyebrow].position?.left.y
  })`,
)}
${eyebrowSvgXml[props.eyebrow].xml.replace(
  '$[transform]',
  `translate(${eyebrowSvgXml[props.eyebrow].position?.right.x},${
    eyebrowSvgXml[props.eyebrow].position?.right.y
  }) scale(-1,1)`,
)}
${mouthSvgXml[props.mouth].xml.replace(
  '$[transform]',
  `translate(${mouthSvgXml[props.mouth].position?.left.x},${
    mouthSvgXml[props.mouth].position?.left.y
  })`,
)}
${noseSvgXml[props.nose].xml.replace(
  '$[transform]',
  `translate(${noseSvgXml[props.nose].position?.left.x},${
    noseSvgXml[props.nose].position?.left.y
  })`,
)}
${hairSvgXml[props.hair].xml.replace(
  '$[transform]',
  'translate(400,0) scale(-1,1)',
)}
</svg>
`;
  }, [
    props.hairBackground,
    props.body,
    props.jersey,
    props.ear,
    props.head,
    props.eyeLine,
    props.smileLine,
    props.miscLine,
    props.facialHair,
    props.eye,
    props.eyebrow,
    props.mouth,
    props.nose,
    props.hair,
  ]);
  return (
    <Svg
      xml={xml
        .replace(/\$\[skinColor\]/g, props.skinColor)
        .replace(/\$\[primary\]/g, props.primaryColor)
        .replace(/\$\[secondary\]/g, props.secondaryColor)
        .replace(/\$\[accent\]/g, props.accentColor)
        .replace(/\$\[headShave\]/g, props.headShaveColor)
        .replace(/\$\[faceShave\]/g, props.faceShaveColor)
        .replace(/\$\[hairColor\]/g, props.hairColor)}
      w={props.w}
      h={props.h}
    />
  );
};

//translate(368,290) scale(-1,1)
