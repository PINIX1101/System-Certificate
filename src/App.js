import './assets/styles/App.css';
import React from 'react';
import { Routes, Route } from "react-router-dom";
import { LoginPage } from './components/LoginPage';
import { Home } from './components/Home';
import { Admin } from './components/Admin';
import { Sertifikat } from './components/Sertifikat';
import { Kaprodi } from './components/Kaprodi';
import { Kelas } from './components/Kelas';
import { IsiTranskrip } from './components/IsiTranskrip';
import { DataTranskrip } from './components/DataTranskrip';
import { CreateCertificate } from './components/CreateCertificate';
import { CreateClass } from './components/CreateClass';
import { Transkrip } from './components/Transkrip';
import { DidsCheck } from './components/DidsCheck';
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
              <Route path="/admin" element={<Admin/>} />
              <Route path="/isitranskrip" element={<IsiTranskrip/>} />
              <Route path="/datatranskrip" element={<DataTranskrip/>} />
              <Route path="/kelas" element={<Kelas/>} />
              <Route path="/kaprodi" element={<Kaprodi/>} />
              <Route path="/sertifikat" element={<Sertifikat/>} />
              <Route path="/createcertificate" element={<CreateCertificate/>} />
              <Route path="/createclass" element={<CreateClass/>} />
              <Route path="/transkrip/:code" element={<Transkrip/>} />
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
