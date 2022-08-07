import React, { useEffect, useState } from 'react';
import '../assets/styles/Login.css'
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import { supabase } from '../supabaseClient';

export function MhsPage() {
  const [name, setName] = useState('');
  const [nim, setNim] = useState('');
  const role = sessionStorage.getItem('role');
  const [wallet, setWallet] = useState('')

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
      <form onSubmit={handleSubmit} style={{width: '60%', margin: 'auto'}}>
          <h1>Set DID</h1>
        <div>
          <label for='name'>Nama</label>
          <div className='input-group'>
             <input required value={name || ''} onChange={(e) => setName(e.target.value)} type="text" name="name" placeholder="Nama" />
          </div>
        </div>
        <div>
          <label for='nim'>NIM</label>
            <div className='input-group'>
              <input required value={nim || ''} onChange={(e) => setNim(e.target.value)} type="text" name="nim" placeholder="NIM" />
            </div>
        </div>
        <button type='submit' className='button'>Save</button>
        </form>
    </div>
  )
}