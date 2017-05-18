import React, { Component } from 'react';
import './App.css';
import * as utils from './hashcode.js';
//import * as utils from './hashcode.js';
class App extends Component {

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Subtitle downloader</h2>
        </div>
        <p className="App-intro">
          <input type="file" id="files" name="files[]" onChange={utils.hashIt} />
        </p>

      </div>
    );
  }
}

class Show extends Component {

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Subtitle downloader</h2>
        </div>
        <p className="App-intro">
          <input type="file" id="files" name="files[]" onChange={utils.hashIt} />
        </p>

      </div>
    );
  }
}

export default App;
