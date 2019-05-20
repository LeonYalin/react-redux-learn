import { BEGIN_API_CALL } from "./action.types";

export function beginApiCall() {
  return { type: BEGIN_API_CALL };
}