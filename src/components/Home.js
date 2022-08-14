import React, { useEffect, useState } from 'react';
import '../assets/styles/Login.css'
import '../assets/styles/home.css'
// import sertif from '../../../assets/image/sertif-exp.png'

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
  const [certificates, setCertificates] = useState('');
  const role = sessionStorage.getItem('role');
  const [wallet, setWallet] = useState('');
  
  useEffect(() => {
    window.ethereum.on('accountsChanged', function (accounts) {
      setWallet(accounts[0])
    });
    connectWallet();
    getCertificates();
    // console.log('PUBLIC URL', process.env.PUBLIC_URL)
  })

  const handleSubmit = async () => { 
   const { data, error } = await supabase.from('DID').upsert({ 
      wallet: wallet,
      name: name, 
      nim: nim, 
   }) 
}
  
  async function getCertificates() { 
      try { 
         let { data, error, status } = await supabase 
            .from('Sertifikat') 
            .select()
         
         if (error && status !== 406) { 
            throw error 
         } 
         if (data) { 
            setCertificates(data) 
         } 
      } catch (error) { 
         alert(error.message) 
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
    <div className='mhs-page'>
    {role==='Mahasiswa' ? ''
      :
      <Link to='/CreateCertificate' class='button' style={{margin: 'auto', marginTop: '50px'}}>
      <h3>Buat Sertifikat</h3>
      </Link>
      }
      <div style={{textAlign: 'center'}}>
        <div className='sertifikat-list'>
          {certificates && certificates.map(function(p, i) { 
      return (
        <Certificate 
          id={p.id}
          sertif={p.image}
          name={p.name}
          number={p.number}
          classname={p.classname}
          date={p.date}/>
        )})}</div>
        <div>{ certificates === null || certificates.length === 0 ? <h1 style={{margin: 0}}>Tidak Ada Sertifikat</h1> : ''}
        </div>
      </div>
    </div>
  )
}