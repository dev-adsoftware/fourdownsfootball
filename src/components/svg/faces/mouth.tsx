import {Feature} from './feature';

export const mouthSvgXml = {
  angry: {
    xml: `
	  <path id="angry" fill="#ffffff" stroke="#000000" stroke-width="5" d="M40 9C50 9 65 -1 70 4C75 9 80 19 75 24C70 29 50 24 40 24C30 24 10 29 5 24C0 19 5 9 10 4C15 -1 30 9 40 9Z" transform="$[transform]" />
    `,
    position: {
      left: {x: 160, y: 425},
      right: {x: 0, y: 0},
    },
  } as Feature,
  closed: {
    xml: `
    <path id="closed" fill="none" stroke="#000000" stroke-width="5" d="M170 440L180 430L220 430L230 440" transform="$[transform]"/>
    `,
    position: {
      left: {x: 0, y: 0},
      right: {x: 0, y: 0},
    },
  } as Feature,
  mouth1: {
    xml: `
    <path id="mouth" fill="#ffffff" stroke="#000000" stroke-width="5" d="M32 3C42 3 47 3 57 8C62 13 62 13 57 18C52 23 42 18 32 18C22 18 12 23 7 18C2 13 2 13 7 8C17 3 22 3 32 3Z" transform="$[transform]"/>
    `,
    position: {
      left: {x: 168, y: 429},
      right: {x: 0, y: 0},
    },
  } as Feature,
  mouth2: {
    xml: `
    <g id="mouth-02" transform="$[transform]">
		<path id="color" opacity="0.05" fill="#501414" d="M167 382C167 382 177 373.14 200 373C216.67 372.9 234 382 234 382C234 382 222.67 403.31 200 404C177.68 404.68 167 382 167 382Z" />
		<path id="teeth" fill="#ffffff" d="M176 384C176 384 190 380 200 380C210 380 224 384 224 384C224 384 216 392 200 392C184 392 176 384 176 384Z" />
		<path id="stroke" fill="none" stroke="#000000" stroke-width="4" d="M176 384C176 384 190 380 200 380C210 380 224 384 224 384C224 384 216 392 200 392C184 392 176 384 176 384Z" />
		<path id="Shape 1" fill="none" stroke="#000000" stroke-width="1" d="M180 376C196 372 204 372 220 376" />
		<path id="Shape 2" fill="none" stroke="#000000" stroke-width="4" d="M166 382C166 382 171 385.19 176 384M234 382C234 382 229 385.19 224 384" />
		<path id="Shape 3" fill="none" stroke="#000000" stroke-width="1" d="M185.71 400.69C200.86 404.83 202 404.55 214.86 400.12" />
	  </g>
    `,
    position: {
      left: {x: 0, y: 55},
      right: {x: 0, y: 0},
    },
  } as Feature,
  mouth3: {
    xml: `
    <g id="lips" transform="$[transform]">
		<path id="lips" opacity="0.05" fill="#501414" d="M1 3C1 3 12 1.14 35 1C51.67 0.9 69 3 69 3C69 3 57.67 26.31 35 27C12.68 27.68 1 3 1 3Z" />
		<path id="teeth" fill="#ffffff" d="M11 5C11 5 25 6.71 35 6.71C45 6.71 59 5 59 5C59 5 51 15 35 15C19 15 11 5 11 5Z" />
		<path id="mouth-03-stroke" fill="none" stroke="#000000" stroke-width="4" d="M11 5C11 5 25 6.71 35 6.71C45 6.71 59 5 59 5C59 5 51 15 35 15C19 15 11 5 11 5ZM1 3C1 3 6 6.19 11 5M69 3C69 3 64 6.19 59 5M20.71 23.69C35.86 27.83 37 27.55 49.86 23.12" />
	  </g>
    `,
    position: {
      left: {x: 165, y: 412},
      right: {x: 0, y: 0},
    },
  } as Feature,
  mouth4: {
    xml: `
    <g id="lips copy" transform="$[transform]">
		<path id="lips" opacity="0.05" fill="#501414" d="M168 384C168 384 177 370.23 200 369.97C217.4 369.77 232 383.17 232 383.17C232 383.17 227.71 406.41 200 406.98C172.71 407.54 168 384 168 384Z" />
		<path id="teeth" fill="#ffffff" d="M168 384C180 380 216 380 232 384C212 388 222 388 200 388C180 388 184 388 168 384Z" />
		<path id="mouth-05-stroke" fill="none" stroke="#000000" stroke-width="3" d="M168 384C180 380 216 380 232 384C212 388 222 388 200 388C180 388 184 388 168 384ZM181.71 402.12C196.23 407.78 206.43 407.83 219.43 401.41M220.29 374.88C205.77 369.22 193 368.54 180 374.97" />
	  </g>
    `,
    position: {
      left: {x: 0, y: 55},
      right: {x: 0, y: 0},
    },
  } as Feature,
  mouth5: {
    xml: `
    <g id="lips copy" transform="$[transform]">
		<path id="Shape 4 copy" opacity="0.05" fill="#501414" d="M168 384C168 384 177 370.23 200 369.97C217.4 369.77 232 383.17 232 383.17C232 383.17 227.71 406.41 200 406.98C172.71 407.54 168 384 168 384Z" />
		<path id="mouth-06-stroke" fill="none" stroke="#000000" stroke-width="4" d="M181.71 402.12C196.23 407.78 206.43 407.83 219.43 401.41M220.29 374.88C205.77 369.22 193 368.54 180 374.97M176 384C184 381.83 192 384 200 384C208 384 216 381.83 224 384M236 380C236 380 236 384 224 384M164 380C164 380 164 384 176 384" />
	  </g>
    `,
    position: {
      left: {x: 0, y: 55},
      right: {x: 0, y: 0},
    },
  } as Feature,
  mouth6: {
    xml: `
    <g id="lips copy" transform="$[transform]">
		<path id="lip-color" opacity="0.05" fill="#501414" d="M168 384C168 384 177 370.23 200 369.97C217.4 369.77 232 383.17 232 383.17C232 383.17 227.71 406.41 200 406.98C172.71 407.54 168 384 168 384Z" />
		<path id="lip-stroke" fill="none" stroke="#000000" stroke-width="2" d="M181.71 402.12C196.23 407.78 206.43 407.83 219.43 401.41M220.29 374.88C205.77 369.22 193 368.54 180 374.97" />
		<path id="thin-stroke" fill="none" stroke="#000000" stroke-width="4" d="M165 390C165 390 185 385 200 385C215 385 235 389 235 389" />
	  </g>
    `,
    position: {
      left: {x: 0, y: 55},
      right: {x: 0, y: 0},
    },
  } as Feature,
  mouth7: {
    xml: `
    <g id="lips copy" transform="$[transform]">
		<path id="lips" opacity="0.05" fill="#501414" d="M168 384C168 384 177 370.23 200 369.97C217.4 369.77 232 383.17 232 383.17C232 383.17 227.71 411.43 200 412C172.71 412.56 168 384 168 384Z" />
		<path id="mouth" fill="#000000" stroke="#000000" d="M168 384C180 380 216 380 232 384C224 392 222 400 200 400C180 400 176 392 168 384Z" />
		<path id="teeth" fill="#ffffff" d="M168 384C180 380 216 380 232 384C212 388 222 388 200 388C180 388 184 388 168 384ZM180 396C180 396 194 395 200 395C206 395 220 396 220 396C220 396 216 400 200 400C188 400 180 396 180 396Z" />
		<path id="mouth-14-stroke" fill="none" stroke="#000000" stroke-width="4" d="M168 384C180 380 216 380 232 384C224 392 222 400 200 400C180 400 176 392 168 384ZM184 408C196 414 204 414 216 408M220.29 374.88C205.77 369.22 193 368.54 180 374.97" />
	  </g>
    `,
    position: {
      left: {x: 0, y: 55},
      right: {x: 0, y: 0},
    },
  } as Feature,
  mouth8: {
    xml: `
    <g id="lips copy" transform="$[transform]">
		<path id="lips" opacity="0.05" fill="#501414" d="M168 384C168 384 177 370.23 200 369.97C217.4 369.77 232 383.17 232 383.17C232 383.17 227.71 411.43 200 412C172.71 412.56 168 384 168 384Z" />
		<path id="mouth" fill="#000000" stroke="#000000" d="M168 384C180 380 216 380 232 384C224 392 222 400 200 400C180 400 176 392 168 384Z" />
		<path id="teeth" fill="#ffffff" d="M168 384C182.08 378.27 221.75 380.27 232.25 384.6C212.25 389.27 201.75 386.6 201.75 386.6L201.92 381.43L197.25 381.1L197.42 386.27C197.42 386.27 184 388 168 384ZM172.42 390.6C172.42 390.6 194 393.77 200 393.77C206 393.77 226.92 390.77 226.92 390.77C226.92 390.77 216 400 200 400C188 400 172.42 390.6 172.42 390.6Z" />
		<path id="mouth-15-stroke" fill="none" stroke="#000000" stroke-width="4" d="M168 384C180 380 216 380 232 384C224 392 222 400 200 400C180 400 176 392 168 384ZM184 408C196 414 204 414 216 408" />
	  </g>
    `,
    position: {
      left: {x: 0, y: 45},
      right: {x: 0, y: 0},
    },
  } as Feature,
  side: {
    xml: `
    <path id="side" fill="none" stroke="#000000" stroke-width="5" d="M1 22L61 12L51 2" transform="$[transform]"/>
    `,
    position: {
      left: {x: 167, y: 428},
      right: {x: 0, y: 0},
    },
  } as Feature,
  smileClosed: {
    xml: `
    <path id="smile-closed" fill="none" stroke="#000000" stroke-width="5" d="M170 430C170 430 180 440 200 440C220 440 230 430 230 430" transform="$[transform]"/>
    `,
    position: {
      left: {x: 0, y: 5},
      right: {x: 0, y: 0},
    },
  } as Feature,
  smile1: {
    xml: `
    <path id="smile" fill="#ffffff" stroke="#000000" stroke-width="5" d="M170 430C170 430 180 450 200 450C220 450 230 430 230 430L170 430Z" transform="$[transform]"/>
    `,
    position: {
      left: {x: 0, y: 0},
      right: {x: 0, y: 0},
    },
  } as Feature,
  smile2: {
    xml: `
    <path id="smile2" fill="#ffffff" stroke="#000000" stroke-width="5" d="M11 8C11 8 4.33 28 31 28C57.67 28 51 8 51 8C51 8 41 4.37 31 4.37C21 4.37 11 8 11 8ZM61 3L51 8M1 3L11 8" transform="$[transform]"/>
    `,
    position: {
      left: {x: 169, y: 425},
      right: {x: 0, y: 0},
    },
  } as Feature,
  smile3: {
    xml: `
    <path id="smile3" fill="#ffffff" stroke="#000000" stroke-width="5" d="M5 3C5 3 18.33 23 45 23C71.67 23 85 3 85 3C85 3 65 5.22 45 5.22C25 5.22 5 3 5 3Z" transform="$[transform]"/>
    `,
    position: {
      left: {x: 155, y: 427},
      right: {x: 0, y: 0},
    },
  } as Feature,
  smile4: {
    xml: `
    <path d="M198.19,431.84c-7.3-1.3-14.7-2.5-22-3.9a67,67,0,0,1-10.6-3c-4.5-1.6-8.6-3.4-11.8,2.2-.5.9-3.1.6-4.7.9.2-1.5-.1-3.2.6-4.5,2.2-4.6,4.6-9.1,7.1-13.5.7-1.2,2.1-2.1,3.2-3.1.6,1.4,1.7,2.8,1.6,4.1a53.4,53.4,0,0,1-1.7,8.1c27.8,8.4,55.3,8.3,83.4.2-.1-1.3-.2-2.8-.2-4.2s.2-2.8.5-5.8c2,2.2,3.2,3.2,3.9,4.5,2,3.8,4,7.6,5.7,11.6.5,1.2.2,2.7.3,4-1.5-.2-3.3.1-4.4-.7-1.6-1.1-2.6-2.9-3.3-3.6-12.7,2.3-24.7,4.6-36.8,6.8C205.49,431.84,201.89,431.84,198.19,431.84Z" transform="$[transform]"/>
    `,
    position: {
      left: {x: 0, y: 15},
      right: {x: 0, y: 0},
    },
  } as Feature,
  straight: {
    xml: `
    <path id="straight" fill="none" stroke="#000000" stroke-width="5" d="M180 430L220 430" transform="$[transform]"/>
    `,
    position: {
      left: {x: 0, y: 5},
      right: {x: 0, y: 0},
    },
  } as Feature,
};

export type MouthType = keyof typeof mouthSvgXml;
