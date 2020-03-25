import React from 'react';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      subreddits: [],
      parsedData: [],
      submitted: false
    };
  };

  async findReddit(query) {
    this.setState({ subreddits: [] })

    let requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    await fetch("http://www.reddit.com/subreddits/search.json?q=" + query + "&sort=new", requestOptions)
      .then(res => res.json())
      .then(json => this.setState({ subreddits: json }))
      .catch(error => console.log('error', error));

    let lenvar = this.state.subreddits.data.children.length;

    for (let i = 0; i < lenvar; i++) {
      this.state.parsedData.push(this.state.subreddits.data.children[i].data.display_name_prefixed);
    }

    console.log(this.state.parsedData);

    this.setState({ submitted: true })
  };

  handleSubmit = event => {
    event.preventDefault();
    this.findReddit(this.input.value)
  };

  render() {
    if (this.state.submitted) {
      const listItems = this.state.parsedData.map((link) =>
        <li>{link}</li>
      );
      
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
            <ul>{listItems}</ul>
          </header>
        </div>
      );
    } else {
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
          </header>
        </div>
      );

    }
  }
}

export default App;