import React, { useEffect, useState } from 'react';
import '../assets/styles/Login.css'
import bg from '../assets/image/login-bg.jpg'
import { Link, useNavigate } from 'react-router-dom';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';

export function WebBlocker() {
  const navigate = useNavigate()

  const handleDosen = () => {
    sessionStorage.setItem('role','dosen')
    window.location.reload()
  }

  const handleMahasiswa = () => {
    sessionStorage.setItem('role','mahasiswa')
    window.location.reload()
  }
  
  return (
    <div className='web-blocker'>
      <button className='button' onClick={handleDosen}>Masuk sebagai Dosen</button>
      <button className='button' style={{backgroundColor: "cadetBlue"}} onClick={handleMahasiswa}>Masuk sebagai Mahasiswa</button>
    </div>
  )
}