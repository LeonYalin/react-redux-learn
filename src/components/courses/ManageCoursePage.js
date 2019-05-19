import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadCourses } from '../../redux/actions/course.actions';
import { loadAuthors } from '../../redux/actions/author.actions';
import { newCourse } from '../../../tools/mockData';
import CourseForm from './CourseForm';

function ManageCoursePage({ courses, authors, loadCourses, loadAuthors, ...props }) {
  const [course, setCourse] = useState({ ...props.course });
  const [errors, setErrors] = useState({});

  useEffect(() => { // same as ComponentDidMount
    if (!courses.length) {
      loadCourses().catch(e => { alert('Loading courses failed, ' + e); })
    }
    if (!authors.length) {
      loadAuthors().catch(e => { alert('Loading author failed, ' + e); })
    }
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setCourse(prevCourse => ({
      [name]: name === 'authorId' ? parseInt(value, 10) : value,
    }));
  }

  return (
    <CourseForm course={course} errors={errors} authors={authors} onChange={handleChange} />
  )

}


ManageCoursePage.propTypes = {
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  course: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
}

function mapStateToProps(state) {
  return {
    course: newCourse,
    courses: state.courses,
    authors: state.authors,
  };
}

const mapDispatchToProps = { loadCourses, loadAuthors };

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
