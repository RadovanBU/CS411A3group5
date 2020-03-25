import React from 'react';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      subreddits: [],
      parsedData: []
    };
  };

  async findReddit(query) {
  let requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  await fetch("http://www.reddit.com/subreddits/search.json?q=" + query + "&sort=new", requestOptions)
    .then(res => res.json())
    .then(json => this.setState({ subreddits: json }))
    .catch(error => console.log('error', error));

  //console.log(this.state.subreddits.data.children[0].data.display_name_prefixed);
  let lenvar = this.state.subreddits.data.children.length;

  for (var i = 0; i<lenvar; i++){
    this.state.parsedData += [this.state.subreddits.data.children[i].data.display_name_prefixed + "|"]
  }

  console.log(this.state.parsedData);
};

handleSubmit = event => {
  event.preventDefault();
  this.findReddit(this.input.value)
};

render() {
  console.log(this.state.subreddits)
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

export default App;