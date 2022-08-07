import React, { useEffect, useState } from 'react';
import '../assets/styles/Login.css'
import bg from '../assets/image/login-bg.jpg'
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';

export function LoginPage() {
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
    <div className='login'>
      <div className='login-left'>
        <div className='login-options'>
        </div>
        <form onSubmit={handleLogin} className='login-form'>
          <h1>Sign In {role==='dosen'? 'Dosen' : 'Mahasiswa'}</h1>
          <label for='nama'>Wallet Address</label>
          <div className='input-group'>
            <input required type={'text'} name='wallet' value={wallet} id='wallet' disabled placeholder='0x123..' />
            <button type='button' onClick={connectWallet}>Connect Wallet</button>
          </div>
          <button type='submit' className='login'>Log In</button>
        <button className='login' onClick={changeRole} style={{backgroundColor: "cadetBlue"}}>Masuk sebagai {role==='dosen'? 'Mahasiswa' : 'Dosen'}</button>
        </form>
      </div>
      <div className='login-right'>
        <img src={bg} alt='bg'/>
      </div>
    </div>
  )
}