import React, {
  Component
} from 'react';
import axios from 'axios';
import './App.css';
import * as utils from './hashcode.js';

//import * as utils from './hashcode.js';
class App extends Component {


  constructor(props) {
    super(props);

    this.state = {
      subs: []
    };
  }

  getSubs() {

    utils.hashIt();
    setTimeout(function(){
    var myHash = localStorage.getItem('myHash'); // Grab Movie hash from localStorage
    axios.get('http://localhost:1337/subs/movie', {
        params: {
          hash: myHash
        }
      })
      .then(function(response) {
        console.log(response);
        const subs = response.data.data.children.map(obj => obj.data);
        this.setState({ subs });
        document.getElementById("subResults").style.display = "block";
      })
      .catch(function(error) {
        console.log(error);
      });
    }, 10); //time out 10ms

  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Subtitle downloader</h2>
        </div>
        <p className="App-intro">
          <input type="file" id="files" name="files[]" onChange={this.getSubs} />
        </p>
        <div className="subResults" id="subResults">
        <a href="https://www.google.com">Language</a>
        </div>
      </div>
    );
  }
}

export default App;
