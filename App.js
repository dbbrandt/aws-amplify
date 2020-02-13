import React, { Component } from 'react';
import Main from "./components/Main";

class App extends Component {

  rerender = () => {
    this.forceUpdate();
  };

  render() {
    return (
      <Main rerender={this.rerender}/>
    );
  }
};

export default App;
