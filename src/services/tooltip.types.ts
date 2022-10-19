export type Position = {
  x: number;
  y: number;
};

export type Size = {
  width: number;
  height: number;
};

export type Coords = {
  left: number;
  top: number;
  width: number;
  height: number;
};

export type Context = {
  mousePosition?: Position;
  position?: Position;
  coords?: Coords;
  viewPort?: Size;
  toolTipSize?: Size;
  timeToShow?: number;
  timeToHide?: number;
};

export type Events =
  | { type: 'MOUSE_ENTER' | 'MOUSE_LEAVE' }
  | { type: 'GET_TOOLTIP'; size: Size }
  | { type: 'GET_VIEWPORT'; size: Size }
  | { type: 'GET_COORDS'; coords: Coords }
  | { type: 'MOUSE_MOVE'; position: Position };

export type Services = {
  positionTooltip: { data: Position | undefined };
};
