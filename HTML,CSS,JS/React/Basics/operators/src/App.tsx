import React from 'react';
import logo from './logo.svg';
import './App.css';
import Searchelement from './search&filter';
import Mapelement from './mapping';

function App() {
  return (
    <div className="App">
      <Searchelement />
      <Mapelement />
    </div>
  );
}

export default App;
