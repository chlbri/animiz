// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "": { type: "" };
    "done.invoke.(machine).extraction:invocation[0]": {
      type: "done.invoke.(machine).extraction:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "xstate.init": { type: "xstate.init" };
    "xstate.stop": { type: "xstate.stop" };
  };
  invokeSrcNameMap: {
    extractParams: "done.invoke.(machine).extraction:invocation[0]";
  };
  missingImplementations: {
    actions: "wakeExtractParams";
    services: never;
    guards: never;
    delays: never;
  };
  eventsCausingActions: {
    extractParams: "" | "done.invoke.(machine).extraction:invocation[0]";
    filterAiringStatus: "";
    filterCountry: "";
    filterFormat: "";
    filterGenres: "";
    filterText: "";
    filterYear: "";
    initialize:
      | ""
      | "done.invoke.(machine).extraction:invocation[0]"
      | "xstate.stop";
    wakeExtractParams: "ASSIGN_URL";
  };
  eventsCausingServices: {
    extractParams: "ASSIGN_URL";
  };
  eventsCausingGuards: {
    hasAiringStatus: "";
    hasCountry: "";
    hasFormat: "";
    hasGenres: "";
    hasText: "";
    hasYear: "";
  };
  eventsCausingDelays: {};
  matchesStates:
    | "extraction"
    | "final"
    | "idle"
    | "params"
    | "params.airingStatus"
    | "params.country"
    | "params.format"
    | "params.genres"
    | "params.text"
    | "params.year"
    | {
        params?:
          | "airingStatus"
          | "country"
          | "format"
          | "genres"
          | "text"
          | "year";
      };
  tags: never;
}
