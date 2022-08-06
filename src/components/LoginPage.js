import React, { useEffect, useState } from 'react';
import '../assets/styles/Login.css'
import bg from '../assets/image/login-bg.jpg'
import { Link, useNavigate } from 'react-router-dom';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';

export function LoginPage() {
  const navigate = useNavigate()
  const [ , setNim] = useState('')
  const [ , setNama] = useState('')
  const [wallet, setWallet] = useState('')

  useEffect(() => {
    window.ethereum.on('accountsChanged', function (accounts) {
      setWallet(accounts[0])
    })
    console.log(window.ethereum)
  })

  const handleLogin = (e) => {
    sessionStorage.setItem('session',1)
    navigate('/dashboard');
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
          <Link to='/dosen' className='button'>Masuk sebagai Dosen</Link>
          <Link to='/test' className='button' style={{backgroundColor: "cadetBlue"}}>Tes DID</Link>
        </div>
        <form onSubmit={handleLogin} className='login-form'>
          <h1>Sign In</h1>
          <label for='nim'>NIM</label>
          <input required type={'text'} name='nim' id='nim' placeholder='NIM Anda' onChange={(e) => setNim(e.target.value)}/>
          <label for='nama'>Nama</label>
          <input required type={'text'} name='nama' id='nama' placeholder='Nama Anda' onChange={(e) => setNama(e.target.value)}/>
          <label for='nama'>Wallet Address</label>
          <div className='input-group'>
            <input required type={'text'} name='wallet' value={wallet} id='wallet' disabled placeholder='0x123..' />
            <button type='button' onClick={connectWallet}>Connect Wallet</button>
          </div>

          <button type='submit' className='login'>Log In</button>
        </form>
      </div>
      <div className='login-right'>
        <img src={bg} alt='bg'/>
      </div>
    </div>
  )
}