import React from 'react';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {

  constructor(props) {
    super(props)
    this.url = 'https://www.reddit.com/r/Steam';
  };

  state = {
    result : ""
  };

  findReddit(q) {
    let requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch("http://www.reddit.com/subreddits/search.json?q=" + q + "&sort=new", requestOptions)
      .then(response => response.text())
      .then(result => result)
      .catch(error => console.log('error', error));
  };


  handleChange(event) {
    console.log("hi");
    this.findReddit(document.getElementById("game"));
  };

  render() {
    return (
      <div className = "App">
        <header className="App-header">
          <h1> Enter Your Game! </h1>
          <form>
            <input type="text" name="game" id="game" onChange={this.handleChange}/>
            {/* <input type="submit" value="Submit"/> */}
          </form>
          <p> {this.state.result} </p>
        </header>
      </div>
    );
  }
}

export default App;