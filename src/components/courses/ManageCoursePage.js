import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadCourses, saveCourse } from '../../redux/actions/course.actions';
import { loadAuthors } from '../../redux/actions/author.actions';
import { newCourse } from '../../../tools/mockData';
import CourseForm from './CourseForm';
import Spinner from '../common/Spinner';
import { toast } from 'react-toastify';

function ManageCoursePage({ courses, authors, loadCourses, loadAuthors, saveCourse, history, ...props }) {
  const [course, setCourse] = useState({ ...props.course });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => { // same as ComponentDidMount
    if (!courses.length) {
      loadCourses().catch(e => { alert('Loading courses failed, ' + e); })
    } else {
      setCourse({ ...props.course });
    }

    if (!authors.length) {
      loadAuthors().catch(e => { alert('Loading author failed, ' + e); })
    }
  }, [props.course]);

  function handleChange(event) {
    const { name, value } = event.target;
    // eslint-disable-next-line no-unused-vars
    setCourse(prevCourse => ({
      ...prevCourse,
      [name]: name === 'authorId' ? parseInt(value, 10) : value,
    }));
  }

  function handleSave(event) {
    event.preventDefault();
    setSaving(true);
    saveCourse(course).then(() => {
      toast.success('Course saved.');
      history.push('/courses');
    });
  }

  return (
    !authors.length || !courses.length
      ? (<Spinner />) : (
        <CourseForm
          course={course}
          errors={errors}
          authors={authors}
          onChange={handleChange}
          onSave={handleSave}
          saving={saving} />
      )
  )
}

ManageCoursePage.propTypes = {
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  saveCourse: PropTypes.func.isRequired,
  course: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
}

function getCourseBySlug(courses, slug) {
  return courses.find(course => course.slug === slug) || null;
}

function mapStateToProps(state, ownProps) {
  const slug = ownProps.match.params.slug;
  const course = slug && state.courses.length > 0 ? getCourseBySlug(state.courses, slug) : newCourse;

  return {
    course,
    courses: state.courses,
    authors: state.authors,
  };
}


const mapDispatchToProps = { loadCourses, loadAuthors, saveCourse };

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
