// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "": { type: "" };
    "xstate.after(THROTTLE_TIME)#(machine).idle": {
      type: "xstate.after(THROTTLE_TIME)#(machine).idle";
    };
    "xstate.init": { type: "xstate.init" };
    "xstate.stop": { type: "xstate.stop" };
  };
  invokeSrcNameMap: {};
  missingImplementations: {
    actions: never;
    services: never;
    guards: never;
    delays: never;
  };
  eventsCausingActions: {
    assignPrevious: "" | "INPUTS" | "__RESET__" | "xstate.stop";
    edit: "INPUTS";
    input: "INPUTS";
    reset: "__RESET__";
    resetEditing: "xstate.after(THROTTLE_TIME)#(machine).idle";
    sendParentInput: "INPUTS";
    startQuery: "";
  };
  eventsCausingServices: {};
  eventsCausingGuards: {
    currentEqualsPrevious: "";
    isEditing: "xstate.after(THROTTLE_TIME)#(machine).idle";
  };
  eventsCausingDelays: {
    THROTTLE_TIME: "" | "INPUTS" | "__RESET__" | "xstate.init";
  };
  matchesStates: "checking" | "done" | "idle";
  tags: never;
}
