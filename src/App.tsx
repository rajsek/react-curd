import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Blog } from './features/blog/Blog';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Blog />
      </header>
    </div>
  );
}

export default App;
