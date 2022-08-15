import React, { useEffect, useState } from 'react';
import '../assets/styles/Login.css'
import '../assets/styles/home.css'
import { supabase } from '../supabaseClient';
import { Link } from 'react-router-dom';
import { Certificate } from './widgets/Certificate';

export function Sertifikat() {
  const [certificates, setCertificates] = useState([]);
  const [classes, setClasses] = useState([]);
  const role = sessionStorage.getItem('role');
  
  useEffect(() => {
    getCertificates();
    getClasses();
  })
  
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
      <div className='list-kelas'>
        <h3>Daftar Kelas</h3>
        <table variant='simple'> 
         <thead> 
            <tr> 
               <th>Kode</th> 
               <th>Nama Kelas</th> 
               <th>Nama Dosen</th> 
               <th>Jumlah Pendaftar</th> 
            </tr> 
         </thead> 
         <tbody> 
         {classes && classes.map(function(q, i) { 
          return ( 
             <tr> 
                <td> { q.classcode } </td> 
                <td> { q.classname } </td> 
                <td> { q.lecturername } </td> 
                <td> { q.count } </td> 
                </tr> 
             );})} 
         </tbody> 
        </table> 
      </div>
      <div className='sertifikat-list'>
      {certificates && certificates.map(function(p, i) { return (
        <Certificate 
          code={p.number}
          sertif={p.image}
          name={p.name}
          number={p.number}
          classname={p.classname}
          date={p.date}/>
        )})}
        <div style={{textAlign: 'center'}}>
          { certificates === null || certificates.length === 0 ? <h1 style={{margin: 0}}>Tidak Ada Sertifikat</h1>
          :
          ''}
        </div>
      </div>
    </div>
  )
}