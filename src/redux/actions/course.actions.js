import { LOAD_COURSES_SUCCESS, CREATE_COURSE_SUCCESS, UPDATE_COURSE_SUCCESS } from "./action.types";
import * as courseApi from '../../api/courseApi';

export function loadCoursesSuccess(courses) {
  return { type: LOAD_COURSES_SUCCESS, courses };
}

export function updateCourseSuccess(course) {
  return { type: UPDATE_COURSE_SUCCESS, course };
}

export function saveCourseSuccess(course) {
  return { type: CREATE_COURSE_SUCCESS, course };
}

export function loadCourses() {
  return function (dispatch) {
    return courseApi.getCourses().then(courses => {
      dispatch(loadCoursesSuccess(courses));
    }).catch(e => {throw e; });
  }
}

export function saveCourse(course) {
  // eslint-disable-next-line no-unused-vars
  return function(dispatch, getState) {
    return courseApi.saveCourse(course).then(savedCourse => {
      course.id
        ? dispatch(updateCourseSuccess(savedCourse))
        : dispatch(saveCourseSuccess(savedCourse));
    })
  }
}