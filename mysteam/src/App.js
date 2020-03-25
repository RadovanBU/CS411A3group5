import React from 'react';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1> Enter Your Game! </h1>
        <Button variant="light" size="lg"> Submit </Button>
      </header>
    </div>
  );
}

export default App;
