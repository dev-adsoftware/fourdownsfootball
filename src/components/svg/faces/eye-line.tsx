import {Feature} from './feature';

export const eyeLineSvgXml = {
  eyeLine1: {
    xml: `
    <g transform="translate(0 -20)">
	<path id="eyeline1" class="eyeline1" d="M220 290C220 290 210 290 210 270M180 290C180 290 190 290 190 270" fill="none" stroke="#000" stroke-width="2"/>
    </g>
    `,
  } as Feature,
  eyeLine2: {
    xml: `
    <g transform="translate(0 -20)">
	<path id="eyeline2" class="eyeline2" d="M300 340C300 340 305 345 310 345M296.75 342.53C296.75 342.53 300 355 305 355M100 340C100 340 95 345 90 345M103.25 342.53C103.25 342.53 100 355 95 355" fill="none" stroke="#000" stroke-width="2"/>
    </g>
    `,
  } as Feature,
  eyeLine3: {
    xml: `
    <g transform="translate(0 -20)">
	<path id="eyeline3" class="eyeline3" d="M240 360C240 360 250 370 265 370M160 360C160 360 150 370 135 370" fill="none" stroke="#000" stroke-width="2"/>
    </g>
    `,
  } as Feature,
  eyeLine4: {
    xml: `
    <g transform="translate(0 -20)">
	<path id="eyeline4" class="eyeline4" d="M240 360C240 360 265 370 280 360M160 360C160 360 135 370 120 360" fill="none" stroke="#000" stroke-width="2"/>
    </g>
    `,
  } as Feature,
  eyeLine5: {
    xml: `
    <g transform="translate(0 -20)">
	<path id="eyeline5" class="eyeline5" d="M240 375C240 375 260 365 285 375M160 375C160 375 140 365 115 375" fill="none" stroke="#000" stroke-width="2"/>
    </g>
    `,
  } as Feature,
  eyeLine6: {
    xml: `
    <g transform="translate(0 -20)">
	<path id="eyeline6" class="eyeline6" d="M235 305C235 305 245 295 280 295M165 305C165 305 155 295 120 295" fill="none" stroke="#000" stroke-width="2"/>
    </g>
    `,
  } as Feature,
};

export type EyeLineType = keyof typeof eyeLineSvgXml;
