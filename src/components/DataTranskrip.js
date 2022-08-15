import React, { useEffect, useState } from 'react';
import '../assets/styles/Login.css'
import { supabase } from '../supabaseClient';
import { useNavigate, useParams } from 'react-router-dom';

export function DataTranskrip(id) {
  const navigate = useNavigate();
  const [emailtujuan, setEmailtujuan] = useState('');
  const [datatranskrip, setDatatranskrip] = useState('');
  const role = sessionStorage.getItem('role');
  const session = sessionStorage.getItem('session');
  const idname = sessionStorage.getItem('idname');
  const idnim = sessionStorage.getItem('idnim');
  const { code } = useParams();

  useEffect(() => {
    getIsitranskrip();
  })
  
  async function getIsitranskrip() { 
      try { 
         let { data, error, status } = await supabase 
            .from('Isi Transkrip') 
            .select()
         
         if (error && status !== 406) { 
            throw error 
         } 

         if (data) { 
            setDatatranskrip(data) 
         } 
      } catch (e) { 
      } 
   }
  
  return (
     <div className='mhs-page'>
      {role==='Kaprodi'?
        <div className='list-kelas'>
          <h2 style={{marginLeft:'50px'}}> Daftar Kelas</h2>
          <table className='kelas' variant='simple'> 
           <thead> 
              <tr> 
                 <th>Nomor Sertifikat</th> 
                 <th>Subjek</th> 
                 <th>Nilai</th> 
              </tr> 
           </thead> 
           <tbody> 
           {datatranskrip && datatranskrip.map(function(q, i) { 
            return ( 
               <tr style={{textAlign: 'center'}}> 
                  <td> { q.number } </td> 
                  <td> { q.subject } </td> 
                  <td> { q.score } </td> 
                  </tr> 
               );})} 
           </tbody> 
          </table> 
        </div>
        :
      <div style={{textAlign: 'center'}}>
        <h1 style={{margin: 0}}>Anda Bukan Kaprodi</h1>
      </div>
      }
    </div>
  )
}