import { LOAD_AUTHORS_SUCCESS } from "./action.types";
import * as authorApi from '../../api/authorApi';
import { beginApiCall, apiCallError } from "./apiStatus.actions";

export function loadAuthorsSuccess(authors) {
  return { type: LOAD_AUTHORS_SUCCESS, authors };
}

export function loadAuthors() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return authorApi.getAuthors().then(authors => {
      dispatch(loadAuthorsSuccess(authors));
    }).catch(e => {
      dispatch(apiCallError(e));
      throw e;
    });
  }
}