// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "": { type: "" };
    "done.invoke.(machine).parsing:invocation[0]": {
      type: "done.invoke.(machine).parsing:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "error.platform.(machine).parsing:invocation[0]": {
      type: "error.platform.(machine).parsing:invocation[0]";
      data: unknown;
    };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {
    parse: "done.invoke.(machine).parsing:invocation[0]";
  };
  missingImplementations: {
    actions:
      | "assignSearchParams"
      | "generateEntries"
      | "generateObject"
      | "assignData"
      | "escalateError";
    services: "parse";
    guards: never;
    delays: never;
  };
  eventsCausingActions: {
    assignData: "done.invoke.(machine).parsing:invocation[0]";
    assignSearchParams: "EXTRACT";
    escalateError: "error.platform.(machine).parsing:invocation[0]";
    generateEntries: "";
    generateObject: "";
  };
  eventsCausingServices: {
    parse: "";
  };
  eventsCausingGuards: {};
  eventsCausingDelays: {};
  matchesStates: "error" | "extraction" | "idle" | "parsing" | "success";
  tags: never;
}
