import React, { useState } from 'react';
import '../assets/styles/Login.css'
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

export function IsiTranskrip(id) {
  const navigate = useNavigate();
  const [subject, setSubject] = useState('');
  const [score, setScore] = useState('');
  const idname = sessionStorage.getItem('idname');
  const numbersertif = sessionStorage.getItem('numbersertif');
  
  const handleTambah = async () => { 
   if( subject && score ) { 
      try { 
         const { data, error } = await supabase.from('Isi Transkrip').upsert({ 
            subject: subject, 
            score: score,
            number: numbersertif, 
         }) 
         window.location.reload();
      } catch (e) { 
      } 
   } else { 
      alert("Harap isi dengan lengkap"); 
   } 
}

  const selesaiIsi = () => { 
   navigate('/')
}

  return (
    <div className='createcertificate'>
      <div className='form' style={{width: '60%', margin: 'auto'}}>
        <h1>Buat Sertifikat</h1>
        <div>
          <label for='subject'>Nama Subjek</label>
          <div className='input-group'>
             <input required value={subject || ''} onChange={(e) => setSubject(e.target.value)} type="text" name="subject" placeholder="Subjek" />
          </div>
        </div>
        <div>
          <label for='score'>Nilai</label>
            <div className='input-group'>
              <input required value={score || ''} onChange={(e) => setScore(e.target.value)} type="text" name="score" placeholder="Nilai" />
            </div>
        </div>
        <button onClick={ handleTambah } type='submit' className='button'>Tambah Subjek</button>
        <button onClick={ selesaiIsi } type='submit' className='button' style={{marginTop:'5px'}}>Selesai</button>
        </div>
    </div>
  )
}