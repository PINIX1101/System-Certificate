import './assets/styles/App.css';
import React from 'react';
import { Routes, Route } from "react-router-dom";
import { LoginPage } from './components/LoginPage';
import Test from './components/TestPage';
import { MhsPage } from './components/MhsPage';
import { DidsCheck } from './components/DidsCheck';
import { LoginDosenPage } from './components/LoginDosenPage';
import { WebBlocker } from './components/WebBlocker';
import { Header } from './components/widgets/Header';

function App() {
  const session = sessionStorage.getItem('session');
  const role = sessionStorage.getItem('role');
  const idname = sessionStorage.getItem('idname');
  
  return (
    <div>
    {!role ? 
      <WebBlocker />
      : 
    <div>
      {!session ?
        <LoginPage />
        :
        <div>
          {!idname ?
          <DidsCheck />
          :
          <div>
            <Header />
            <Routes>
              <Route path="/test" element={<Test />} />
              <Route path="/" element={<MhsPage/>} />
              <Route path="/dosen" element={<LoginDosenPage/>} />
            </Routes>
          </div>
          }
        </div>
      }
    </div>
  }
  </div>);
}

export default App;
