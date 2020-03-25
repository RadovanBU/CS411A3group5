import React from 'react';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      subreddits: {}
    };
  };


  findReddit(query) {
    let requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch("http://www.reddit.com/subreddits/search.json?q=" + query + "&sort=new", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .then(result => this.setState({ 'subreddits': result }))
    .catch(error => console.log('error', error));

    console.log(this.state.subreddits)
  };

  handleSubmit = event => {
    event.preventDefault();
    this.findReddit(this.input.value)
  };


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1> Enter Your Game! </h1>
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              name="game"
              defaultValue="Steam"
              ref={(input) => this.input = input}
            />
          </form>

        {this.state.result}

        </header>
      </div>
    );
  }
}

export default App;