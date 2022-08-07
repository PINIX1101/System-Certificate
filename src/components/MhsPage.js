import React, { useEffect, useState } from 'react';
import '../assets/styles/Login.css'
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';

export function MhsPage() {
  const role = sessionStorage.getItem('role');
  const [wallet, setWallet] = useState('')

  useEffect(() => {
    window.ethereum.on('accountsChanged', function (accounts) {
      setWallet(accounts[0])
    })
    console.log(window.ethereum)
  })

  const handleLogin = (e) => {
    sessionStorage.setItem('session',1)
    window.location.reload()
  }

  const changeRole = () => {
    if(role==='dosen'){
      sessionStorage.setItem('role','mahasiswa')
    }
    else if (role==='mahasiswa'){
      sessionStorage.setItem('role','dosen')
    };
    window.location.reload()
  }

  const connectWallet = async (e) => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    setWallet(address)
  }

  return (
    <div className='mhs-page'>
    </div>
  )
}