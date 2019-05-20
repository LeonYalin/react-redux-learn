import { BEGIN_API_CALL, API_CALL_ERROR } from "./action.types";

export function beginApiCall() {
  return { type: BEGIN_API_CALL };
}

export function apiCallError(error) {
  return { type: API_CALL_ERROR, error };
}