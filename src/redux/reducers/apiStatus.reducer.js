import { BEGIN_API_CALL } from "../actions/action.types";
import initialState from "./initialState";

function actionTypeEndsInProgress(type) {
  return type.substring(type.length - 8) === 'SUCCESS';
}

export default function apiCallsStatusReducer(state = initialState.apiCallsInProgress, action) {
  if (action.type === BEGIN_API_CALL) {
    return state + 1;
  } else if (actionTypeEndsInProgress(action.type)) {
    return state - 1;
  } else {
    return 0;
  }
}