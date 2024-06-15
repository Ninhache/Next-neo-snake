import { Logger } from "tslog";

// https://www.npmjs.com/package/tslog/v/3.2.0
export function getLogger(name: string) {
  return new Logger({
    name,
    type: "pretty",
    prettyLogTemplate:
      "[{{dd}}/{{mm}}/{{yyyy}} {{hh}}:{{MM}}:{{ss}}.{{ms}}] {{logLevelName}} [{{name}}] ",
    prettyLogTimeZone: "local",
  });
}
