import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as courseActions from '../../redux/actions/course.actions';
import * as authorActions from '../../redux/actions/author.actions';
import { bindActionCreators } from 'redux';
import CourseList from './CourseList';
import { Redirect } from 'react-router-dom';

class CoursesPage extends React.Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    courses: PropTypes.array.isRequired,
    authors: PropTypes.array.isRequired,
  }

  state = {
    redirectToAddCoursePage: false,
  }

  componentDidMount() {
    const { courses, authors, actions } = this.props;
    if (!courses.length) {
      actions.loadCourses().catch(e => { alert('Loading courses failed, ' + e); })
    }
    if (!authors.length) {
      actions.loadAuthors().catch(e => { alert('Loading author failed, ' + e); })
    }
  }

  render() {
    return (
      <>
        {this.state.redirectToAddCoursePage && <Redirect to="/course" />}
        <h1>Courses</h1>
        <button
          style={{ marginBottom: 20 }}
          className="btn btn-primary add-course"
          onClick={() => this.setState({ redirectToAddCoursePage: true })}>
          Add Course
        </button>
        <CourseList courses={this.props.courses} />
      </>
    )
  }
}

function mapStateToProps(state) {
  return {
    courses: state.authors.length === 0 ? [] : state.courses.map(course => {
      return {
        ...course,
        authorName: state.authors.find(a => a.id === course.authorId).name,
      }
    }),
    authors: state.authors,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
