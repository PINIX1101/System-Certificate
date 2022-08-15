import React, { useEffect, useState } from 'react';
import '../assets/styles/Login.css'
import '../assets/styles/home.css'
import '../assets/styles/kelas.css'
import { supabase } from '../supabaseClient';
import { Link } from 'react-router-dom';
import { Certificate } from './widgets/Certificate';

export function Kelas() {
  const [certificates, setCertificates] = useState([]);
  const [classes, setClasses] = useState([]);
  const [MK, setMK] = useState('');
  const role = sessionStorage.getItem('role');
  
  useEffect(() => {
    getCertificates();
    getClasses();
  })

  const daftarMK = () => {
    
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
      } 
   }

  async function getClasses() { 
      try { 
         let { data, error, status } = await supabase 
            .from('Kelas') 
            .select()
        
         if (error && status !== 406) { 
            throw error 
         } 
         if (data) { 
            setClasses(data) 
         } 
      } catch (error) { 
      } 
   }

  return (
    <div className='mhs-page'>
      {role==='dosen'?
      <div className='create-data'>
        <Link to='/CreateClass' className='button' style={{margin: 'auto'}}>
          <h3>Buat Kelas</h3>
        </Link>
      </div>
     :''}
      <div className='list-kelas'>
        <h2 style={{marginLeft:'50px'}}> Daftar Kelas</h2>
      <table className='kelas' variant='simple'> 
       <thead> 
          <tr> 
             <th>Kode</th> 
             <th>Nama Kelas</th> 
             <th>Nama Dosen</th> 
             <th>Jumlah Pendaftar</th> 
             <th>Aksi</th> 
          </tr> 
       </thead> 
       <tbody> 
       {classes && classes.map(function(q, i) { 
        return ( 
           <tr style={{textAlign: 'center'}}> 
              <td> { q.classcode } </td> 
              <td> { q.classname } </td> 
              <td> { q.lecturername } </td> 
              <td> { q.count } </td> 
              <td> {role=='Mahasiswa'?
                <button onClick={daftarMK} v> Daftar </button> : ''} 
              </td> 
              </tr> 
           );})} 
       </tbody> 
      </table> 
      </div>
    </div>
  )
}