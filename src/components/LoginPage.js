import React from 'react';
import '../assets/styles/Login.css'
import bg from '../assets/image/login-bg.jpg'

export function LoginPage() {
  return (
    <div className='login'>
      <div className='login-left'>
        <h1>Sign In</h1>
        <form className='login-form'>
          <label for='nim'>NIM</label>
          <input type={'text'} name='nim' id='nim' placeholder='NIM Anda'/>
          <label for='nama'>Nama</label>
          <input type={'text'} name='nama' id='nama' placeholder='Nama Anda'/>
          <label for='nama'>Wallet Address</label>
          <input type={'text'} name='wallet' id='wallet' placeholder='0x123..'/>

          <button className='login'>Log In</button>
        </form>
      </div>
      <div className='login-right'>
        <img src={bg} alt='bg'/>
      </div>
    </div>
  )
}