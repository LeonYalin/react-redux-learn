import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => (
  <div className="jumbotron">
    <h1>Hello from React Redux!</h1>
    <p>by Leon Yalin</p>
    <Link to="about" className="btn btn-primary btn-lg">About</Link>
  </div>
);

export default HomePage;