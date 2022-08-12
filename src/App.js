import './assets/styles/App.css';
import React from 'react';
import { Routes, Route } from "react-router-dom";
import { LoginPage } from './components/LoginPage';
import Test from './components/TestPage';
import { Home } from './components/Home';
import { CreateCertificate } from './components/CreateCertificate';
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
        <LoginPage id={idname}/>
        :
        <div>
          {!idname ?
          <DidsCheck />
          :
          <div>
            <Header />
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/createcertificate" element={<CreateCertificate/>} />
              <Route path="/test" element={<Test />} />
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
