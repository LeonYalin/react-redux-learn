import React from "react";
import ReactDOM from "react-dom";

class Hi extends React.Component {
  render() {
    return <div>Hi There!</div>;
  }
}

ReactDOM.render(<Hi/>, document.getElementById('app'));