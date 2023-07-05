import {Feature} from './feature';

export const smileLineSvgXml = {
  smileLine1: {
    xml: `
    <path id="Shape 9" class="shp0" d="M9 2C9 2 -3.5 10.95 5 36" fill="none" stroke="#000" stroke-width="2" transform="$[transform]" />
    `,
    position: {
      left: {x: 145, y: 416},
      right: {x: 255, y: 416},
    },
  } as Feature,
  smileLine2: {
    xml: `
    <path id="line 2" class="shp0" d="M17 2L2 12L7 27" fill="none" stroke="#000" stroke-width="2" transform="$[transform]" />
    `,
    position: {
      left: {x: 141, y: 421},
      right: {x: 259, y: 421},
    },
  } as Feature,
  smileLine3: {
    xml: `
    <path id="line3" class="shp0" d="M12.33 4.32C12.33 4.32 2.33 7.61 2.33 17.5C2.33 27.39 12.33 30.68 12.33 30.68" fill="none" stroke="#000" stroke-width="2" transform="$[transform]" />
    `,
    position: {
      left: {x: 143, y: 418},
      right: {x: 257, y: 418},
    },
  } as Feature,
  smileLine4: {
    xml: `
    <path id="Shape 10" class="shp0" d="M0 20L6 10L0 1" fill="none" stroke="#000" stroke-width="2" transform="$[transform]" />
    `,
    position: {
      left: {x: 144, y: 424},
      right: {x: 256, y: 424},
    },
  } as Feature,
};

export type SmileLineType = keyof typeof smileLineSvgXml;
