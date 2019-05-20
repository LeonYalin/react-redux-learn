import  { combineReducers } from 'redux';
import courses from './course.reducer';
import authors from './author.reducer';
import apiCallsInProgress from './apiStatus.reducer';

const rootReducer = combineReducers({
  courses,
  authors,
  apiCallsInProgress,
});

export default rootReducer;
