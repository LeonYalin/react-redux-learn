import { LOAD_COURSES_SUCCESS, CREATE_COURSE_SUCCESS, UPDATE_COURSE_SUCCESS, DELETE_COURSE_OPTIMISTIC } from "./action.types";
import * as courseApi from '../../api/courseApi';
import { beginApiCall, apiCallError } from "./apiStatus.actions";

export function loadCoursesSuccess(courses) {
  return { type: LOAD_COURSES_SUCCESS, courses };
}

export function updateCourseSuccess(course) {
  return { type: UPDATE_COURSE_SUCCESS, course };
}

export function saveCourseSuccess(course) {
  return { type: CREATE_COURSE_SUCCESS, course };
}

export function deleteCourseOptimistic(course) {
  return { type: DELETE_COURSE_OPTIMISTIC, course };
}

export function loadCourses() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return courseApi.getCourses().then(courses => {
      dispatch(loadCoursesSuccess(courses));
    }).catch(e => {
      dispatch(apiCallError(e));
      throw e;
    });
  }
}

export function saveCourse(course) {
  // eslint-disable-next-line no-unused-vars
  return function (dispatch, getState) {
    dispatch(beginApiCall());
    return courseApi.saveCourse(course)
      .then(savedCourse => {
        course.id
          ? dispatch(updateCourseSuccess(savedCourse))
          : dispatch(saveCourseSuccess(savedCourse));
      }).catch(e => {
        dispatch(apiCallError(e));
        throw e;
      })
  }
}

export function deleteCourse(course) {
  return function(dispatch) {
    // Doing optimistic delete, so not dispatching begin/end API call.
    // actions, or apiCallError action since we are not the loading status for this.
    dispatch(deleteCourseOptimistic(course));
    return courseApi.deleteCourse(course.id);
  }
}