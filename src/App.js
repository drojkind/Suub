import React, {
  Component
} from 'react';
import './App.css';
import * as utils from './utils.js';

class App extends Component {

  constructor(props) {
    super();
    this.state = {subsData: false}
    this.getSubs = this.getSubs.bind(this);
  }

  getSubs() {

    utils.hashIt(() => {
       var myHash = localStorage.getItem('myHash'); // Grab Movie hash from localStorage
          fetch('http://localhost:1337/subs/movie?hash=' + myHash).then((response) => {
          	return response.json();
          }).then((subs) => {
          	console.log(subs);
            this.setState({subsData: subs.subtitles})
          }).catch(function(err) {
            console.log(err);
          });
    });

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
        <div className="subResults" id="subResults" style={{display: this.state.subsData ? 'block' : 'none'}}>
            <ul>
                {utils.getSubtitles(this.state.subsData).map(subtitle =>
                    <li>
                        <strong>Lang:</strong>{subtitle.lang}
                        <strong>Url:</strong>{subtitle.url}
                    </li>
                )}
            </ul>
        </div>
      </div>
    );
  }
}

export default App;
