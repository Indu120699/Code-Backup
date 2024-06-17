import React from 'react';
import logo from './logo.svg';
import './App.css';
import './Employee.css';
import './Mainpage.css';
import Tab from './Table';
import Forms from './Employee';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Mainpage from './Mainpage';
import Login from './Login';
import Simpleex from './simpleex';


function App() {
  return (
    <BrowserRouter>
    <Routes >
      <Route path="/" element={<Mainpage />}/>
      <Route path="/employee" element={<Forms />}/>
      <Route path="/table" element={<Tab />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/form" element={<Simpleex />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
