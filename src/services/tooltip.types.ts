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
  position?: string;
  coords?: Coords;
  viewPort?: Size;
  toolTipSize?: Size;
  timeToShow?: number;
  timeToHide?: number;
};

export type Events =
  | { type: 'MOUSE_LEAVE' }
  | { type: 'MOUSE_ENTER' }
  | { type: 'GET_TOOLTIP'; size: Size }
  | { type: 'GET_VIEWPORT'; size: Size }
  | { type: 'GET_COORDS'; coords: Coords }
  | { type: 'MOUSE_MOVE'; position: Position };

export type Services = {
  positionTooltipMachine: { data: string | undefined };
};
