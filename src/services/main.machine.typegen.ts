// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {};
  missingImplementations: {
    actions: "changeTheme";
    services: never;
    guards: never;
    delays: never;
  };
  eventsCausingActions: {
    changeTheme: "CHANGE_THEME";
  };
  eventsCausingServices: {};
  eventsCausingGuards: {};
  eventsCausingDelays: {};
  matchesStates: "idle" | "working" | "working.theme" | { working?: "theme" };
  tags: never;
}
