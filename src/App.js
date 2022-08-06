import './assets/styles/App.css';
import React from 'react';
import { Routes, Route } from "react-router-dom";
import { LoginPage } from './components/LoginPage';
import Test from './components/TestPage';
import { MhsPage } from './components/MhsPage';
import { LoginDosenPage } from './components/LoginDosenPage';
import { WebBlocker } from './components/WebBlocker';

function App() {
  const session = sessionStorage.getItem('session');
  const role = sessionStorage.getItem('role');
  
  return (
    <div>
    {!role ? 
      <WebBlocker />
      : 
    <div>
      {!session ?
        <LoginPage />
        :
        <Routes>
          <Route path="/test" element={<Test />} />
          <Route path="/dashboard" element={<MhsPage/>} />
          <Route path="/dosen" element={<LoginDosenPage/>} />
        </Routes>
      }
    </div>
  }
      </div>);
}

export default App;
