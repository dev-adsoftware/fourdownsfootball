import {Feature} from './feature';

export const earSvgXml = {
  ear1: {
    xml: `
    <path id="ear1" d="M43 13C43 13 23 3 13 3C3 3 3 23 3 33C3 43 6 53 16 63C26 73 43 53 43 53L43 13Z" fill="$[skinColor]" stroke="#000" stroke-width="6" transform="$[transform]"/>
    `,
    position: {
      left: {x: 32, y: 290},
      right: {x: 368, y: 290},
    },
  } as Feature,
  ear2: {
    xml: `
    <path id="ear2" d="M40 14C40 14 10 -1 5 4C0 9 5 34 10 44C15 54 5 69 40 64L40 14Z" fill="$[skinColor]" stroke="#000" stroke-width="6" transform="$[transform]"/>
    `,
    position: {
      left: {x: 33, y: 291},
      right: {x: 367, y: 291},
    },
  } as Feature,
  ear3: {
    xml: `
    <path id="ear3" d="M43 8C43 8 3 -12 3 28C3 73 43 58 43 58L43 8Z" fill="$[skinColor]" stroke="#000" stroke-width="6" transform="$[transform]"/>
    `,
    position: {
      left: {x: 32, y: 294},
      right: {x: 368, y: 294},
    },
  } as Feature,
};

export type EarType = keyof typeof earSvgXml;
