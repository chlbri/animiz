// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "": { type: "" };
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
    assignProps: "GET_PROPS";
    positionBottom: "";
    positionLeft: "";
    positionRight: "";
    positionTop: "";
  };
  eventsCausingServices: {};
  eventsCausingGuards: {
    allPropsAreDefined: "";
    isLeft: "";
    isTop: "";
  };
  eventsCausingDelays: {};
  matchesStates: "checking" | "final" | "idle" | "positionX" | "positionY";
  tags: never;
}
