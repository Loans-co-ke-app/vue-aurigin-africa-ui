import { APP_NAME } from "./app-name";

const prefix = APP_NAME;
type AppStates = "aurigin-afica-app-authState" //| "aurigin-afica-app-cartState";

export const stateKeys: Record<AppStates, string> = {
  "aurigin-afica-app-authState": `${prefix}-authState`,
  // "aurigin-afica-app-cartState": `${prefix}-cartState`,
};
