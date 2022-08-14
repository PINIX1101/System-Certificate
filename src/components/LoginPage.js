import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import '../assets/styles/Login.css'
import bg from '../assets/image/login-bg.jpg'
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';

export function LoginPage(props) {
  const [dids, setDids] = useState(null); 
  const role = sessionStorage.getItem('role');
  const [wallet, setWallet] = useState('')

  console.log(dids)
  
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
    if(dids){
      sessionStorage.setItem('idname', dids[0].name);
      sessionStorage.setItem('idnim', dids[0].nim)
    }
    window.location.reload()
  }

  const changeRole = () => {
    if(role==='Dosen'){
      sessionStorage.setItem('role','Mahasiswa')
    }
    else if (role==='Mahasiswa'){
      sessionStorage.setItem('role','Dosen')
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
        <form onSubmit={handleLogin} className='login-form'>
          <h1>Sign In {role==='Dosen'? 'Dosen' : 'Mahasiswa'}</h1>
          <label for='nama'>Wallet Address</label>
          <div className='input-group'>
            <input required type={'text'} name='wallet' value={wallet} id='wallet' disabled placeholder='0x123..' />
            <button type='button' onClick={connectWallet}>Connect Wallet</button>
          </div>
          <button type='submit' className='login'>Log In</button>
        <button className='login' onClick={changeRole} style={{backgroundColor: "cadetBlue"}}>Masuk sebagai {role==='Dosen'? 'Mahasiswa' : 'Dosen'}</button>
        </form>
      </div>
      <div className='login-right'>
        <img src={bg} alt='bg'/>
      </div>
    </div>
  )
}