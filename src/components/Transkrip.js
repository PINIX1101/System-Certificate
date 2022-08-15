import React, { useEffect, useState } from 'react';
import '../assets/styles/Login.css'
import { supabase } from '../supabaseClient';
import { useNavigate, useParams } from 'react-router-dom';

export function Transkrip(id) {
  const navigate = useNavigate();
  const [emailtujuan, setEmailtujuan] = useState('');
  const [kelas, setKelas] = useState('');
  const role = sessionStorage.getItem('role');
  const session = sessionStorage.getItem('session');
  const idname = sessionStorage.getItem('idname');
  const idnim = sessionStorage.getItem('idnim');
  const { code } = useParams();
  
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
      } catch (e) { 
      } 
   }

  const handleSubmit = async () => { 
   if( idname && emailtujuan ) { 
      try { 
         const { data, error } = await supabase.from('Email Transkrip').upsert({ 
            numbersertif: code, 
            name: idname,
            nim: idnim,
            email_transkrip: emailtujuan, 
         }) 
         navigate(`/`) 
      } catch (e) { 
      } 
   } else { 
      alert("Harap isi dengan lengkap"); 
   } 
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