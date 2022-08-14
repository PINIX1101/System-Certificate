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
import { Link, useNavigate, useParams } from 'react-router-dom';

const endpoint = 'https://ceramic-clay.3boxlabs.com';

export function Transkrip(id) {
  const navigate = useNavigate();
  const [emailtujuan, setEmailtujuan] = useState('');
  const [kelas, setKelas] = useState('');
  const [wallet, setWallet] = useState('')
  const [dids, setDids] = useState(null); 
  const role = sessionStorage.getItem('role');
  const session = sessionStorage.getItem('session');
  const idname = sessionStorage.getItem('idname');
  const idnim = sessionStorage.getItem('idnim');
  const { code } = useParams();
  
  useEffect(() => {
    window.ethereum.on('accountsChanged', function (accounts) {
      setWallet(accounts[0]);
    });
    connectWallet();
  }, [id])
  
  async function getIsikelas() { 
      try { 
         let { data, error, status } = await supabase 
            .from('Isi Kelas') 
            .select(`classname,classcode`)
            .match({})
         
         if (error && status !== 406) { 
            throw error 
         } 

         if (data) { 
            setKelas(data) 
         } 
      } catch (error) { 
         alert(error.message) 
      } 
   }

  const handleSubmit = async () => { 
   if( idname && emailtujuan ) { 
      try { 
         const { data, error } = await supabase.from('Email Transkrip').upsert({ 
            name: idname, 
            nim: idnim,
            email_transkrip: emailtujuan, 
         }) 
         navigate(`/`) 
      } catch (e) { 
         alert(e.message); 
      } 
   } else { 
      alert("Harap isi dengan lengkap"); 
   } 
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
    <div className='didscheck'>
      <div className='form' style={{width: '60%', margin: 'auto'}}>
          <h1>Kirim Transkrip</h1>
        <div>
          <label for='emailtujuan'>Silahkan Tulis Email Kaprodi</label>
            <div className='input-group'>
              <input required value={emailtujuan || ''} onChange={(e) => setEmailtujuan(e.target.value)} type="text" name="emailtujuan" placeholder="Email Tujuan" />
            </div>
        </div>
        <button className='button' onClick={ handleSubmit }>Kirim</button>
        </div>
    </div>
  )
}