import React from 'react';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1> Enter Your Game! </h1>
        <form>
          <input type="text" name="name" />
          <input type="submit" value="Submit" />
        </form>
      </header>
    </div>
  );
}

export default App;