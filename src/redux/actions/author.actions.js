import { LOAD_AUTHORS_SUCCESS } from "./action.types";
import * as authorApi from '../../api/authorApi';

export function loadAuthorsSuccess(authors) {
  return { type: LOAD_AUTHORS_SUCCESS, authors };
}

export function loadAuthors() {
  return function (dispatch) {
    return authorApi.getAuthors().then(authors => {
      dispatch(loadAuthorsSuccess(authors));
    }).catch(e => {throw e; });
  }
}