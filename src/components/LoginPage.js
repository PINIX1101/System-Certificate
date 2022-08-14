import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import '../assets/styles/Login.css'
import bg from '../assets/image/login-bg.jpg'
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';

export function LoginPage(props) {
  const [dids, setDids] = useState(null); 
  const [kategori, setKategori] = useState(null);
  const role = sessionStorage.getItem('role');
  const [wallet, setWallet] = useState('')
  
  useEffect(() => {
    window.ethereum.on('accountsChanged', function (accounts) {
      setWallet(accounts[0])
    });
    }, [props.id])
  
  const getDids = async (address) => { 
   try { 
      let { data, error, status } = await supabase 
         .from('DID') 
         .select()
         .match({wallet: address});

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
  
  const handleLogin = async (e) => {
    sessionStorage.setItem('session', wallet)
    sessionStorage.setItem('role', kategori)
    if(dids){
      sessionStorage.setItem('idname', dids[0].name);
      sessionStorage.setItem('idnim', dids[0].nim)
    }
    window.location.reload()
  }

console.log(role);
  
  const changeRole = () => {
    if(role==='Pengurus'){
      sessionStorage.setItem('role','Mahasiswa')
    }
    else if (role==='Mahasiswa'){
      sessionStorage.setItem('role','Pengurus')
    };
    window.location.reload()
  }

  const connectWallet = async (e) => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    setWallet(address);
    getDids(address);
  }

  return (
    <div className='login'>
      <div className='login-left'>
        <div className='login-options'>
        </div>
        <div className='login-form'>
          <h1>Sign In {role==='Pengurus'? 'Pengurus' : 'Mahasiswa'}</h1>
          <label for='nama'>Wallet Address</label>
          <div className='input-group'>
            <input required type={'text'} name='wallet' value={wallet} id='wallet' disabled placeholder='0x123..' />
            <button type='button' onClick={connectWallet}>Connect Wallet</button>
          </div>
          {role==='Pengurus'?
          <div>
            <label for='nama'>Kategori Pengurus</label>
            <div className='input-group'>
              <select style={{width: '100%', height: 40}} value={kategori || ''} onChange={(e) => setKategori(e.target.value)}>
                <option value=''></option>
                <option value="Admin">Admin</option>
                <option value="Dosen">Dosen</option>
                <option value="Kaprodi">Kaprodi</option>
              </select>
            </div>
          </div>
          :
          ''}
          <button onClick={handleLogin} type='submit' className='login'>Log In</button>
        <button className='login' onClick={changeRole} style={{backgroundColor: "cadetBlue"}}>Masuk sebagai {role==='Pengurus'? 'Mahasiswa' : 'Pengurus'}</button>
        </div>
      </div>
      <div className='login-right'>
        <img src={bg} alt='bg'/>
      </div>
    </div>
  )
}