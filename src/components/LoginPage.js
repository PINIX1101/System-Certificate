import React, { useEffect, useState } from 'react';
import '../assets/styles/Login.css'
import bg from '../assets/image/login-bg.jpg'
import { useNavigate } from 'react-router-dom';

export function LoginPage() {
  const navigate = useNavigate()
  const [nim, setNim] = useState('')
  const [nama, setNama] = useState('')
  const [wallet, setWallet] = useState('')

  useEffect(() => {
    window.ethereum.on('accountsChanged', function (accounts) {
      setWallet(accounts[0])
    })
  }, [])

  const handleLogin = (e) => {
    alert(nim, nama, wallet)
    navigate('/dashboard')
  }

  const connectWallet = async (e) => {
    const { ethereum } = window
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
    setWallet(accounts[0])
  }

  return (
    <div className='login'>
      <div className='login-left'>
        <h1>Sign In</h1>
        <form onSubmit={handleLogin} className='login-form'>
          <label for='nim'>NIM</label>
          <input type={'text'} name='nim' id='nim' placeholder='NIM Anda' onChange={(e) => setNim(e.target.value)}/>
          <label for='nama'>Nama</label>
          <input type={'text'} name='nama' id='nama' placeholder='Nama Anda' onChange={(e) => setNama(e.target.value)}/>
          <label for='nama'>Wallet Address</label>
          <div className='input-group'>
            <input type={'text'} name='wallet' value={wallet} id='wallet' disabled placeholder='0x123..' />
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