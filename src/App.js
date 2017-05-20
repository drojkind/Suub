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

  onDrop(files) {
    this.setState({
      files
    });
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
          <h2 id="subTitle">suub</h2>
        </div>
        <hr />

        <p className="App-intro" style={{display: this.state.subsData ? 'none' : 'block'}}>

          <div className="form-group file-area">
            <input type="file" name="file[]" id="files" required="required" onChange={this.getSubs}/>
            <div className="file-dummy">
              <div className="success">Loading<span>.</span><span>.</span><span>.</span></div>
              <div className="default">Drag any movie file onto this screen<br/>
and we will try and find its subtitles</div>
            </div>
          </div>


        </p>
        <div className="subResults" id="subResults" style={{display: this.state.subsData ? 'block' : 'none'}}>
            <div id="subList">
                {utils.getSubtitles(this.state.subsData).map(subtitle =>
                    <div id="subContainer">
                        <a id="subUrl" href={subtitle.url}><p id="subLanguage">{subtitle.lang}</p></a>
                    </div>
                )}
            </div>

            <div id="subList">
              <div id="subContainer">
                <a id="subUrl" href="."><p id="subLanguageYellow">REFRESH PAGE</p></a>
              </div>
            </div>
        </div>
      </div>
    );
  }
}

export default App;
