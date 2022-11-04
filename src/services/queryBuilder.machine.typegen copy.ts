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
    addAiringStatus: "";
    addCountry: "";
    addFormat: "";
    addParams: "QUERY";
    addText: "";
    addYear: "";
    createURL: "";
  };
  eventsCausingServices: {};
  eventsCausingGuards: {
    hasAiringStatus: "";
    hasCountry: "";
    hasFormat: "";
    hasText: "";
    hasYear: "";
  };
  eventsCausingDelays: {};
  matchesStates:
    | "final"
    | "idle"
    | "params"
    | "params.airingStatus"
    | "params.country"
    | "params.format"
    | "params.text"
    | "params.url"
    | "params.year"
    | {
        params?:
          | "airingStatus"
          | "country"
          | "format"
          | "text"
          | "url"
          | "year";
      };
  tags: never;
}
