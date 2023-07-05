export interface Feature {
  xml: string;
  position?: {
    left: {x: number; y: number};
    right: {x: number; y: number};
  };
}
