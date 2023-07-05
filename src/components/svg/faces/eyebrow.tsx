import {Feature} from './feature';

export const eyebrowSvgXml = {
  eyebrow1: {
    xml: `
	  <path id="eyebrow1" d="M83 13C83 3 73 3 73 3C48 -2 17.46 8.36 3 18C43 13 53 23 78 23C78 23 83 23 83 13Z" fill="$[hairColor]" stroke="#000" stroke-width="1" transform="$[transform]"/>
    `,
    position: {
      left: {x: 98, y: 258},
      right: {x: 302, y: 258},
    },
  } as Feature,
  eyebrow3: {
    xml: `
    <path id="eyebrow3" d="M73 13C77.85 11.79 73 3 63 3C53 3 3 8 3 8C3 8 53 18 73 13Z" fill="$[hairColor]" stroke="#000" stroke-width="1" transform="$[transform]"/>
    `,
    position: {
      left: {x: 101, y: 262},
      right: {x: 299, y: 262},
    },
  } as Feature,
  eyebrow4: {
    xml: `
    <path id="eyebrow4" d="M61 16L61 6L31 1L1 6L1 16L31 11L61 16Z" fill="$[hairColor]" stroke="#000" stroke-width="1" transform="$[transform]"/>
    `,
    position: {
      left: {x: 109, y: 262},
      right: {x: 291, y: 262},
    },
  } as Feature,
  eyebrow5: {
    xml: `
    <path id="eyebrow5" d="M65 16C68 13 65 6 65 6C65 6 45 1 35 1C25 1 3 11 3 11C3 11 0 18 3 21C6 24 25 13 35 13C45 13 62 19 65 16Z" fill="$[hairColor]" stroke="#000" stroke-width="1" transform="$[transform]"/>
    `,
    position: {
      left: {x: 106, y: 259},
      right: {x: 294, y: 259},
    },
  } as Feature,
  eyebrow6: {
    xml: `
    <path id="eyebrow6" d="M67 17C70 14 67 5 67 5C67 5 49 5 39 5C29 5 3 1 3 1C3 1 0 14 3 17C6 20 29 17 39 17C49 17 64 20 67 17Z"  fill="$[hairColor]" stroke="#000" stroke-width="1" transform="$[transform]"/>
    `,
    position: {
      left: {x: 105, y: 260},
      right: {x: 295, y: 260},
    },
  } as Feature,
  eyebrow7: {
    xml: `
    <path id="eyebrow7" d="M71 21C79 13 71 9 71 9C71 9 43 5 35 5C25 5 7 1 7 1C7 1 -5 5 7 17C23 21 15 17 35 17C67 17 68 24 71 21Z"  fill="$[hairColor]" stroke="#000" stroke-width="1" transform="$[transform]"/>
    `,
    position: {
      left: {x: 102, y: 259},
      right: {x: 298, y: 259},
    },
  } as Feature,
  eyebrow8: {
    xml: `
    <path id="eyebrow8" d="M71 25C79 17 71 9 71 9C71 9 43 1 35 1C25 1 7 5 7 5C7 5 -5 13 7 25C23 33 23 21 43 21C63 21 67 29 71 25Z" fill="$[hairColor]" stroke="#000" stroke-width="1" transform="$[transform]"/>
    `,
    position: {
      left: {x: 102, y: 255},
      right: {x: 298, y: 255},
    },
  } as Feature,
  eyebrow9: {
    xml: `
    <path id="eyebrow9" d="M73 21C81 13 73 5 73 5C73 5 45 1 37 1C27 1 1 17 1 17C1 17 21 13 41 13C53 13 69 25 73 21Z" fill="$[hairColor]" stroke="#000" stroke-width="1" transform="$[transform]"/>
    `,
    position: {
      left: {x: 102, y: 259},
      right: {x: 298, y: 259},
    },
  } as Feature,
  eyebrow10: {
    xml: `
    <path id="eyebrow10" d="M71 17C79 9 71 5 71 5C71 5 43 9 35 9C25 9 7 1 7 1C7 1 -5 5 7 17C15 25 15 25 35 25C55 25 68 20 71 17Z" fill="$[hairColor]" stroke="#000" stroke-width="1" transform="$[transform]"/>
    `,
    position: {
      left: {x: 102, y: 257},
      right: {x: 298, y: 257},
    },
  } as Feature,
  eyebrow11: {
    xml: `
    <path id="eyebrow11" d="M73 13C81 5 73 1 73 1C73 1 45 5 37 5C27 5 1 5 1 5C1 5 21 17 41 17C53 17 69 17 73 13Z" fill="$[hairColor]" stroke="#000" stroke-width="1" transform="$[transform]"/>
    `,
    position: {
      left: {x: 101, y: 261},
      right: {x: 299, y: 261},
    },
  } as Feature,
  eyebrow12: {
    xml: `
    <path id="eyebrow12" d="M66 13C70 9 66 5 66 5C66 5 38 5 30 5C14 5 2 1 2 1C2 1 -2 1 10 13L6 21C6 21 18 21 38 21C58 21 62 17 66 13Z" fill="$[hairColor]" stroke="#000" stroke-width="1" transform="$[transform]"/>
    `,
    position: {
      left: {x: 105, y: 259},
      right: {x: 295, y: 259},
    },
  } as Feature,
  eyebrow13: {
    xml: `
    <path
     stroke-width="1"
     stroke="#000000"
     fill="$[hairColor]"
     d="m 72.888465,12.597712 c 5.270626,-4.0160124 2.5653,-8.2669208 2.5653,-8.2669208 C 74.435622,3.4711726 48.446581,4.9938248 39.639657,5.0896091 30.55296,5.1884362 4.4885019,14.790557 1.4461392,17.929457 c -0.010846,2.629467 27.6981998,-1.31733 40.1487128,-1.732126 9.802172,-0.326564 26.40592,0.124613 31.293613,-3.599619 z"
     id="eyebrow9" transform="$[transform]"/>
    `,
    position: {
      left: {x: 101, y: 259},
      right: {x: 299, y: 259},
    },
  } as Feature,
  eyebrow14: {
    xml: `
    <path id="eyebrow12" d="M12.93 8.33C11.42 9.56 8.75 12.57 6.99 15C5.23 17.43 3.61 20.16 3.38 21.06C3.16 21.97 3.22 22.83 3.51 22.98C3.81 23.12 7.95 22.47 12.72 21.52C17.49 20.57 24.3 19.56 27.85 19.29C31.4 19.01 39.48 18.77 45.79 18.76C52.11 18.74 60.35 18.98 64.11 19.29C67.86 19.6 72.5 19.76 74.4 19.65C76.31 19.54 78.96 19.15 80.29 18.78C82.38 18.19 82.62 17.81 82.13 15.87C81.71 14.21 80.39 13.02 76.95 11.21C74.41 9.87 69.09 8.03 65.12 7.12C61.15 6.2 54.13 4.91 49.52 4.25C44.9 3.59 37.61 2.92 33.3 2.76C27.17 2.55 24.39 2.88 20.57 4.28C17.88 5.27 14.44 7.09 12.93 8.33Z" fill="$[hairColor]" stroke="#000" stroke-width="1" transform="$[transform]"/>
    `,
    position: {
      left: {x: 105, y: 259},
      right: {x: 295, y: 259},
    },
  } as Feature,
  eyebrow15: {
    xml: `
    <path id="eyebrow12" d="M12.93 15.05C11.42 15.72 8.75 17.34 6.99 18.66C5.23 19.98 3.61 21.46 3.38 21.95C3.16 22.44 3.22 22.91 3.51 22.99C3.81 23.07 7.95 22.71 12.72 22.2C17.49 21.68 24.3 21.14 27.85 20.99C31.4 20.84 39.48 20.71 45.79 20.7C52.11 20.69 60.35 20.82 64.11 20.99C67.86 21.16 72.5 21.24 74.4 21.18C76.31 21.13 78.96 20.91 80.29 20.71C82.38 20.39 82.62 20.18 82.13 19.14C81.71 18.23 80.39 17.59 76.95 16.61C74.41 15.88 69.09 14.89 65.12 14.39C61.15 13.9 54.13 13.2 49.52 12.84C44.9 12.48 37.61 12.12 33.3 12.03C27.17 11.92 24.39 12.09 20.57 12.86C17.88 13.39 14.44 14.38 12.93 15.05Z" fill="$[hairColor]" stroke="#000" stroke-width="1" transform="$[transform]"/>
    `,
    position: {
      left: {x: 105, y: 259},
      right: {x: 295, y: 259},
    },
  } as Feature,
  eyebrow16: {
    xml: `
    <g transform="$[transform]">
    <path id="eyebrow12" d="M25.63 10.05C24.44 10.72 22.34 12.34 20.95 13.66C19.56 14.98 18.29 16.46 18.11 16.95C17.93 17.44 17.98 17.91 18.21 17.99C18.44 18.07 21.71 17.71 25.47 17.2C29.23 16.68 34.6 16.14 37.39 15.99C40.19 15.84 46.56 15.71 51.53 15.7C56.51 15.69 63.01 15.82 65.97 15.99C68.93 16.16 72.58 16.24 74.09 16.18C75.59 16.13 77.68 15.91 78.72 15.71C80.37 15.39 80.57 15.18 80.18 14.14C79.85 13.23 78.8 12.59 76.09 11.61C74.09 10.88 69.9 9.89 66.77 9.39C63.64 8.9 58.1 8.2 54.47 7.84C50.83 7.48 45.08 7.12 41.69 7.03C36.86 6.92 34.67 7.09 31.65 7.86C29.53 8.39 26.82 9.38 25.63 10.05Z" fill="$[hairColor]" stroke="#000" stroke-width="1"/>
	  <path id="placement" fill="none" d="M0 10L5 10L5 15L0 15L0 10Z" />
    </g>
    `,
    position: {
      left: {x: 105, y: 259},
      right: {x: 295, y: 259},
    },
  } as Feature,
  eyebrow17: {
    xml: `
    <g transform="$[transform]">
    <path id="eyebrow12" d="M22.1 6.48C21.14 7.22 19.39 8.81 18.2 9.98C16.97 11.15 15.73 12.61 15.5 13.11C15.27 13.63 15.24 14.07 15.45 14.07C15.65 14.07 18.51 13.02 21.46 12.42C24.18 12.31 27.88 12.69 29.76 13.08C31.63 13.51 35.83 14.75 39.11 15.85C42.5 16.93 47.05 18.35 49.17 19.04C51.4 19.65 54.47 20.06 55.87 20.03C57.3 19.97 59.4 19.68 60.49 19.42C62.17 19.01 62.39 18.8 62.21 17.77C62.09 16.86 61.36 16.14 59.45 14.87C58.09 13.87 55.15 12.21 52.89 11.15C50.63 10.02 46.56 8.05 43.86 6.8C41.15 5.49 36.84 3.78 34.29 3.07C30.69 2.26 29.05 2.42 26.76 3.58C25.15 4.35 23.05 5.67 22.1 6.48Z" fill="$[hairColor]" stroke="#000" stroke-width="1"/>
	  <path id="placement" fill="none" d="M0 10L5 10L5 15L0 15L0 10Z" />
    </g>
    `,
    position: {
      left: {x: 105, y: 259},
      right: {x: 295, y: 259},
    },
  } as Feature,
  eyebrow18: {
    xml: `
    <g transform="$[transform]">
    <path id="eyebrow12" d="M79 12.9C79 6.79 71.5 6.79 71.5 6.79C52.75 3.74 29.85 10.07 19 15.95C49 12.9 56.5 19 75.25 19C75.25 19 79 19 79 12.9Z" fill="$[hairColor]" stroke="#000" stroke-width="1"/>
	  <path id="placement" fill="none" d="M0 10L5 10L5 15L0 15L0 10Z" />
    </g>
    `,
    position: {
      left: {x: 105, y: 259},
      right: {x: 295, y: 259},
    },
  } as Feature,
  eyebrow19: {
    xml: `
    <g transform="$[transform]">
    <path id="eyebrow12" d="M76.4 16.1C79.25 13.86 76.35 9.74 76.35 9.74C76.35 9.74 59.49 10.28 50.08 9.72C40.59 9.12 14.75 8.86 14.75 8.86C14.75 8.86 12.55 15.51 15.32 16.48C18 17.09 39.86 15.03 49.41 15.59C59.01 16.18 73.45 17.75 76.4 16.1Z" fill="$[hairColor]" stroke="#000" stroke-width="1"/>
	  <path id="placement" fill="none" d="M0 10L5 10L5 15L0 15L0 10Z" />
    </g>
    `,
    position: {
      left: {x: 105, y: 259},
      right: {x: 295, y: 259},
    },
  } as Feature,
  eyebrow20: {
    xml: `
    <g transform="$[transform]">
    <path id="eyebrow12" d="M74.17 18.39C79.48 14.52 72.51 11.12 72.51 11.12C72.51 11.12 51.85 8.34 45.95 8.02C38.39 7.3 23.19 6.92 23.19 6.92C23.19 6.92 10.98 10 18.3 16.95C28.89 19.91 33.01 15.63 49.49 16.04C66.34 16.32 71.23 20.41 74.17 18.39Z" fill="$[hairColor]" stroke="#000" stroke-width="1"/>
	  <path id="placement" fill="none" d="M0 10L5 10L5 15L0 15L0 10Z" />
    </g>
    `,
    position: {
      left: {x: 105, y: 259},
      right: {x: 295, y: 259},
    },
  } as Feature,
};

export type EyebrowType = keyof typeof eyebrowSvgXml;
