// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "xstate.after(TIME_TO_HIDE)#(machine).show": {
      type: "xstate.after(TIME_TO_HIDE)#(machine).show";
    };
    "xstate.after(TIME_TO_SHOW)#(machine).middle": {
      type: "xstate.after(TIME_TO_SHOW)#(machine).middle";
    };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {};
  missingImplementations: {
    actions: never;
    services: never;
    guards: never;
    delays: never;
  };
  eventsCausingActions: {
    setCoords: "SET_COORDS";
    setMousePosition: "MOUSE_MOVE";
    setWindowDimensions: "SET_WINDOW_DIMENSIONS";
    stopMoving:
      | "HIDE"
      | "xstate.after(TIME_TO_HIDE)#(machine).show"
      | "xstate.init";
  };
  eventsCausingServices: {};
  eventsCausingGuards: {};
  eventsCausingDelays: {
    TIME_TO_HIDE: "MOUSE_MOVE" | "xstate.after(TIME_TO_SHOW)#(machine).middle";
    TIME_TO_SHOW: "MOUSE_MOVE";
  };
  matchesStates: "hide" | "middle" | "show";
  tags: never;
}
