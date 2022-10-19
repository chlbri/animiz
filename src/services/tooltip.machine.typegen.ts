// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "": { type: "" };
    "done.invoke.tooltip.enter.show.position:invocation[0]": {
      type: "done.invoke.tooltip.enter.show.position:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "xstate.after(TIME_TO_HIDE)#tooltip.enter.show": {
      type: "xstate.after(TIME_TO_HIDE)#tooltip.enter.show";
    };
    "xstate.after(TIME_TO_SHOW)#tooltip.enter.waiting": {
      type: "xstate.after(TIME_TO_SHOW)#tooltip.enter.waiting";
    };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {
    positionTooltip: "done.invoke.tooltip.enter.show.position:invocation[0]";
  };
  missingImplementations: {
    actions: never;
    services: never;
    guards: never;
    delays: never;
  };
  eventsCausingActions: {
    getPosition: "done.invoke.tooltip.enter.show.position:invocation[0]";
    getTooltipSize: "GET_TOOLTIP";
    hide:
      | "MOUSE_ENTER"
      | "MOUSE_LEAVE"
      | "xstate.after(TIME_TO_HIDE)#tooltip.enter.show"
      | "xstate.init";
    setCoords: "GET_COORDS";
    setMousePosition: "MOUSE_MOVE";
    setWindowDimensions: "GET_VIEWPORT";
  };
  eventsCausingServices: {
    positionTooltip: "";
  };
  eventsCausingGuards: {
    allValuesAreDefined: "";
  };
  eventsCausingDelays: {
    TIME_TO_HIDE:
      | "MOUSE_MOVE"
      | "xstate.after(TIME_TO_SHOW)#tooltip.enter.waiting";
    TIME_TO_SHOW: "MOUSE_MOVE";
  };
  matchesStates:
    | "enter"
    | "enter.hide"
    | "enter.show"
    | "enter.show.checking"
    | "enter.show.position"
    | "enter.waiting"
    | "leave"
    | {
        enter?:
          | "hide"
          | "show"
          | "waiting"
          | { show?: "checking" | "position" };
      };
  tags: never;
}
