type Position = {
  x: number;
  y: number;
};

type Size = {
  width: number;
  height: number;
};

type Coords = {
  left: number;
  top: number;
  right: number;
  bottom: number;
};

export type Context = {
  mousePosition?: Position;
  position?: Position;
  coords?: Coords;
  window?: Size;
  moving?: boolean;
  timeToShow?: number;
  timeToHide?: number;
};

export type Events =
  | { type: 'HIDE' }
  | { type: 'SET_WINDOW_DIMENSIONS'; size: Size }
  | { type: 'SET_COORDS'; coords: Coords }
  | { type: 'MOUSE_MOVE'; position: Position }
