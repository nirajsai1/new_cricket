import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Three from '../src/myjs/Threep';
import Four from '../src/myjs/Fourp';
import Input3 from '../src/myjs/input3';
import Input2 from '../src/myjs/Input2';
import Home from '../src/myjs/Home';
import './App.css'; 

function App() {
  return (
    <Router>
      <nav>
        <Link to='/'>Home</Link>
        <Link to='/input2'>Three Player Game</Link>
        <Link to='/three'></Link>
        <Link to='/input3'>Four Player Game</Link>
        <Link to='/four'></Link>
      </nav>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/input2' element={<Input2 />} />
        <Route path='/three' element={<Three />} />
        <Route path='/four' element={<Four />} />
        <Route path='/input3' element={<Input3 />} />
      </Routes>
    </Router>
  );
}

export default App;

