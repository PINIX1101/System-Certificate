import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import '../assets/styles/Login.css'
import bg from '../assets/image/login-bg.jpg'
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import { useNavigate } from 'react-router-dom';

function FormMahasiswa(props) {
  return (
    <>
      <label for='nama'>Wallet Address</label>
      <div className='input-group'>
        <input required type={'text'} name='wallet' value={props.wallet} id='wallet' disabled placeholder='0x123..' />
        <button type='button' onClick={props.connectWallet}>Connect Wallet</button>
      </div>
    </>
  )
}

function FormKaprodi(props) {
  return (
    <>
      <label for='nama'>Email Address</label>
      <div className='input-group'>
        <input required type={'text'} name='email' onChange={(e) => props.onChange(e.target.value)} id='email' placeholder='' />
      </div>
    </>
  )
}

function FormHeader(props) {
  switch(props.role) {
    case 'Pengurus':
      return(<h1>Administrator Sistem</h1>)
    case 'Kaprodi':
      return(<h1>Perwakilan Prodi</h1>)
    case 'Mahasiswa':
      return(<h1>Peserta Program</h1>)
    default:
      return(<h1><i>Guest</i></h1>)
  }
}

export function LoginPage(props) {
  const navigate = useNavigate();
  const [dids, setDids] = useState(null); 
  const [kategori, setKategori] = useState(null);
  const [email, setEmail] = useState('');
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
   } 
}
  
  const handleLogin = () => {
    sessionStorage.setItem('session', wallet)
    if(role==='Pengurus'){
      sessionStorage.setItem('role', kategori)
    }
    window.location.reload()
    if(dids){
      sessionStorage.setItem('idname', dids[0].name);
      sessionStorage.setItem('idnim', dids[0].nim);
      sessionStorage.setItem('idemail', dids[0].email)
    }
  }

  const handleKaprodiLogin = async () => {
    console.log('Login Kaprodi')
    const { user, error } = await supabase.auth.signIn({
      email: email,
    })
    if (error) {
      alert(error.message)
    } else {
      alert('Login Success')
      sessionStorage.setItem('session', email)
      sessionStorage.setItem('idname', email)
      sessionStorage.setItem('role', 'Kaprodi')
      window.location.reload()
    }
  }

// console.log(role);
  
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
          <FormHeader role={role}/>
          {role==='Kaprodi'? <FormKaprodi onChange={setEmail} /> : <FormMahasiswa wallet={wallet} connectWallet={connectWallet}/>}
          {role==='Pengurus'?
          <div>
            <label for='nama'>Kategori Pengurus</label>
            <div className='input-group'>
              <select style={{width: '100%', height: 40}} value={kategori || ''} onChange={(e) => setKategori(e.target.value)}>
                <option value=''></option>
                <option value="Admin">Administrator Sistem</option>
                <option value="Dosen">Pengajar</option>
              </select>
            </div>
          </div>
          :
          ''}
          <button onClick={role==='Kaprodi'? handleKaprodiLogin : handleLogin} type='submit' className='login'>Masuk</button>
        {role==='Kaprodi'?
        '':<button className='login' onClick={changeRole} style={{backgroundColor: "cadetBlue"}}>Masuk sebagai {role==='Pengurus'? 'Peserta Program' : 'Administrator Sistem'}</button>
        }
        </div>
      </div>
      <div className='login-right'>
        <img src={bg} alt='bg'/>
      </div>
    </div>
  )
}