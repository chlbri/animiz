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
    addGenre: "";
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
    hasGenre: "";
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
    | "params.url"
    | "params.year"
    | {
        params?:
          | "airingStatus"
          | "country"
          | "format"
          | "genres"
          | "text"
          | "url"
          | "year";
      };
  tags: never;
}
