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
    addParams: "";
    filterAiringStatus: "";
    filterCountry: "";
    filterFormat: "";
    filterGenres: "";
    filterText: "";
    filterYear: "";
    initialize: "";
  };
  eventsCausingServices: {};
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
