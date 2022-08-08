import React, { useEffect, useState } from 'react';
import '../assets/styles/Login.css'
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import { supabase } from '../supabaseClient';
import CeramicClient from '@ceramicnetwork/http-client';
import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver';
import { EthereumAuthProvider, ThreeIdConnect } from '@3id/connect';
import { DID } from 'dids';
import { IDX } from '@ceramicstudio/idx';

const endpoint = 'https://ceramic-clay.3boxlabs.com';

export function CreateCertificate(id) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [date, setDate] = useState('');
  const [organization, setOrganization] = useState('');
  const [wallet, setWallet] = useState('')
  const [dids, setDids] = useState(null); 
  const role = sessionStorage.getItem('role');
  const session = sessionStorage.getItem('session');
  const idname = sessionStorage.getItem('idname');
  
  useEffect(() => {
    window.ethereum.on('accountsChanged', function (accounts) {
      setWallet(accounts[0])
    });
    connectWallet();
    getDids();
  }, [id])

  const getDids = async () => { 
   try { 
      let { data, error, status } = await supabase 
         .from('DID') 
         .select()
         .match({wallet: session});

      if (error && status !== 406) { 
         throw error 
      }
      if (data) { 
         setDids(data);
      } 
   } catch (error) {
      alert(error.message) 
   } 
}
  
  const handleSubmit = async () => { 
   sessionStorage.setItem('idname', name);
   const { data, error } = await supabase.from('DID').upsert({ 
      wallet: wallet,
      name: name, 
   });
}

  async function connect() {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const address = await signer.getAddress();

    console.log('from web3modal: ', address);

    return address;
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
    <div className='createcertificate'>
      <form onSubmit={handleSubmit} style={{width: '60%', margin: 'auto'}}>
        <h1>Buat Sertifikat</h1>
        <div>
          <label for='name'>Nama</label>
          <div className='input-group'>
             <input required value={name || ''} onChange={(e) => setName(e.target.value)} type="text" name="name" placeholder="Nama" />
          </div>
        </div>
        <div>
          <label for='number'>Nomor</label>
            <div className='input-group'>
              <input required value={number || ''} onChange={(e) => setNumber(e.target.value)} type="text" name="number" placeholder="Nomor" />
            </div>
        </div>
        <div>
          <label for='date'>Tanggal</label>
          <div className='input-group'>
             <input required value={date || ''} onChange={(e) => setDate(e.target.value)} type="text" name="date" placeholder="Tanggal" />
          </div>
        </div>
        <div>
          <label for='organization'>Organisasi</label>
          <div className='input-group'>
             <input required value={organization || ''} onChange={(e) => setOrganization(e.target.value)} type="text" name="organization" placeholder="Organisasi" />
          </div>
        </div>
        <button type='submit' className='button'>Save</button>
        </form>
    </div>
  )
}