import { CREATE_COURSE } from "./action.types";

export function createCourse(course) {
  return { type: CREATE_COURSE, course };
}