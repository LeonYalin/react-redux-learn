import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as courseActions from '../../redux/actions/course.actions';
import { bindActionCreators } from 'redux';

class CoursesPage extends React.Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    courses: PropTypes.array.isRequired,
  }

  state = {
    course: {
      title: '',
    }
  }

  onChange = (event) => {
    const course = { ...this.state.course, title: event.target.value };
    this.setState({ course })
  }

  onSubmit = (event) => {
    event.preventDefault();
    this.props.actions.createCourse(this.state.course);
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <h1>Courses page</h1>
        <h3>Add course</h3>
        <input onChange={this.onChange} value={this.state.course.title} />
        <input type="submit" value="Save" />

        {this.props.courses.map(course => (
          <div key={course.title}>{course.title}</div>
        ))}
      </form>
    )
  }
}

function mapStateToProps(state) {
  return { courses: state.courses };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
