import './assets/styles/App.css';
import React, { useEffect, useState } from 'react';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import { Routes, Route } from "react-router-dom";
import { LoginPage } from './components/LoginPage';
import Test from './components/TestPage';
import { MhsPage } from './components/MhsPage';
import { LoginDosenPage } from './components/LoginDosenPage';

function App() {
  const [wallet, setWallet] = useState('')

  useEffect(() => {
    window.ethereum.on('accountsChanged', function (accounts) {
      setWallet(accounts[0])
    });
    connect();
  })

  const connect = async () => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    setWallet(address)
  }
  
  return (
    <div>
    {!wallet ? 
      <LoginPage />
      :
    <Routes>
      <Route path="/test" element={<Test />} />
      <Route path="/dashboard" element={<MhsPage/>} />
      <Route path="/dosen" element={<LoginDosenPage/>} />
    </Routes>
  }
      </div>);
}

export default App;
