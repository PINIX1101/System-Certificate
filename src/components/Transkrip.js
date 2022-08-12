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
import { Link, useNavigate } from 'react-router-dom';

const endpoint = 'https://ceramic-clay.3boxlabs.com';

export function Transkrip(id) {
  const [name, setName] = useState('');
  const [nim, setNim] = useState('');
  const [tanggallahir, setTanggallahir] = useState('');
  const [emailtujuan, setEmailtujuan] = useState('');
  const [image, setImage] = useState('');
  const [wallet, setWallet] = useState('')
  const [dids, setDids] = useState(null); 
  const role = sessionStorage.getItem('role');
  const session = sessionStorage.getItem('session');
  const idname = sessionStorage.getItem('idname');
  
  useEffect(() => {
    window.ethereum.on('accountsChanged', function (accounts) {
      setWallet(accounts[0])
      getDids();
    });
    connectWallet();
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
   updateProfile()
   sessionStorage.setItem('idname', name);
   const { data, error } = await supabase.from('DID').upsert({ 
      wallet: wallet,
      name: name, 
      nim: nim, 
      tanggallahir: tanggallahir,
      emailtujuan: emailtujuan,
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

  async function updateProfile() {
    if(typeof window.ethereum !== 'undefined') {
      const address = await connect();

      const ceramic = new CeramicClient(endpoint);
      const threeIdConnect = new ThreeIdConnect();

      if (typeof address !== 'undefined') {
        const provider = new EthereumAuthProvider(window.ethereum, address);

        console.log('writing:', address);

        await threeIdConnect.connect(provider);

        const did = new DID({
          provider: threeIdConnect.getDidProvider(),
          resolver: { ...ThreeIdResolver.getResolver(ceramic) },
        });

        ceramic.setDID(did);
        await ceramic.did.authenticate();

        const idx = new IDX({ ceramic });

        await idx.set('basicProfile', {
          name,
          avatar: image,
        });

        console.log('Profile updated!');
      } else {
        window.alert('Please install MetaMask');
      }
    } else {
      window.alert('Please install MetaMask');
    }
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
      <form onSubmit={handleSubmit} style={{width: '60%', margin: 'auto'}}>
          <h1>Kirim Transkrip</h1>
        <div>
          <label for='emailtujuan'>Silahkan tulis email tujuan</label>
            <div className='input-group'>
              <input required value={emailtujuan || ''} onChange={(e) => setEmailtujuan(e.target.value)} type="text" name="emailtujuan" placeholder="Email Tujuan" />
            </div>
        </div>
        <button type='submit' className='button'>Kirim</button>
        </form>
    </div>
  )
}