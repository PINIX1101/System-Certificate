import React, { useEffect, useState } from 'react';
import '../assets/styles/Login.css'
import '../assets/styles/home.css'

import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import { supabase } from '../supabaseClient';
import { Link, useNavigate } from 'react-router-dom';
import { Certificate } from './widgets/Certificate';

export function Home() {
  const navigate = useNavigate();
  const idname = sessionStorage.getItem('idname');
  const [name, setName] = useState('');
  const [nim, setNim] = useState('');
  const role = sessionStorage.getItem('role');
  const [wallet, setWallet] = useState('');
  
  useEffect(() => {
    window.ethereum.on('accountsChanged', function (accounts) {
      setWallet(accounts[0])
    });
    connectWallet();
  })

  const handleSubmit = async () => { 
   const { data, error } = await supabase.from('DID').upsert({ 
      wallet: wallet,
      name: name, 
      nim: nim, 
   }) 
}

  const connectWallet = async (e) => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    setWallet(address);
  }

  return (
    <div className='mhs-page'>
      {role==='Mahasiswa' ? 
      <div style={{textAlign: 'center'}}>
        <h1 style={{margin: 0}}>Tidak Ada Sertifikat</h1>
        <div className='sertifikat-list'>
          <Certificate />
          <Certificate />
          <Certificate />
          <Certificate />
          <Certificate />
          <Certificate />
          <Certificate />
          <Certificate />
        </div>

      </div>
      :
      <Link to='/CreateCertificate' class='button' style={{margin: 'auto', marginTop: '50px'}}>
      <h3>Buat Sertifikat</h3>
      </Link>
      }
    </div>
  )
}