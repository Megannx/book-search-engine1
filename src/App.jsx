import React from 'react';
import './App.css';
import { Outlet } from 'react-router-dom';

import Navbar from './components/Navbar';

function App() {
  return (
    <React.StrictMode>
      <div className="app-container">
        <Navbar />
        <main className="content">
          <Outlet />
        </main>
      </div>
    </React.StrictMode>
  );
}

export default App;
