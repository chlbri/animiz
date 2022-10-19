// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "done.invoke.positionTooltipMachine": {
      type: "done.invoke.positionTooltipMachine";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "error.platform.positionTooltipMachine": {
      type: "error.platform.positionTooltipMachine";
      data: unknown;
    };
    "xstate.after(TIME_TO_HIDE)#show": {
      type: "xstate.after(TIME_TO_HIDE)#show";
    };
    "xstate.after(TIME_TO_SHOW)#tooltip.enter.waiting": {
      type: "xstate.after(TIME_TO_SHOW)#tooltip.enter.waiting";
    };
    "xstate.after(TIME_TO_SHOW)#tooltip.leave.waiting": {
      type: "xstate.after(TIME_TO_SHOW)#tooltip.leave.waiting";
    };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {
    positionTooltipMachine: "done.invoke.positionTooltipMachine";
  };
  missingImplementations: {
    actions: never;
    services: never;
    guards: never;
    delays: never;
  };
  eventsCausingActions: {
    forwardProps:
      | "MOUSE_MOVE"
      | "xstate.after(TIME_TO_SHOW)#tooltip.enter.waiting";
    getPosition: "done.invoke.positionTooltipMachine";
    getTooltipSize: "GET_TOOLTIP";
    hide:
      | "MOUSE_ENTER"
      | "MOUSE_LEAVE"
      | "xstate.after(TIME_TO_HIDE)#show"
      | "xstate.after(TIME_TO_SHOW)#tooltip.leave.waiting"
      | "xstate.init";
    setCoords: "GET_COORDS";
    setMousePosition: "MOUSE_MOVE";
    setWindowDimensions: "GET_VIEWPORT";
  };
  eventsCausingServices: {
    positionTooltipMachine:
      | "MOUSE_MOVE"
      | "xstate.after(TIME_TO_SHOW)#tooltip.enter.waiting";
  };
  eventsCausingGuards: {};
  eventsCausingDelays: {
    TIME_TO_HIDE:
      | "MOUSE_MOVE"
      | "xstate.after(TIME_TO_SHOW)#tooltip.enter.waiting";
    TIME_TO_SHOW: "MOUSE_LEAVE" | "MOUSE_MOVE";
  };
  matchesStates:
    | "enter"
    | "enter.hide"
    | "enter.show"
    | "enter.waiting"
    | "leave"
    | "leave.idle"
    | "leave.waiting"
    | { enter?: "hide" | "show" | "waiting"; leave?: "idle" | "waiting" };
  tags: never;
}
