import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {
  const [input, setInput] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios('/api/Input');
      setInput(result.data.input);
    };
    fetchData();
  }, []);

  return (
    <div>
      <p>Input value: {input}</p>
    </div>
  );
}

export default App;