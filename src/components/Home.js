import React, { useEffect, useState } from 'react';
import '../assets/styles/Login.css'
import '../assets/styles/home.css'
import { supabase } from '../supabaseClient';
import { Link } from 'react-router-dom';
import { Certificate } from './widgets/Certificate';

export function Home() {
  const [certificates, setCertificates] = useState([]);
  const [classes, setClasses] = useState([]);
  const role = sessionStorage.getItem('role');
  const idnim = sessionStorage.getItem('idnim');
  
  useEffect(() => {
    getCertificates();
  })
  
  async function getCertificates() { 
      try { 
         let { data, error, status } = await supabase 
            .from('Sertifikat') 
            .select()
            .match({nim: idnim});
         if (error && status !== 406) { 
            throw error 
         } 
         if (data) { 
            setCertificates(data) 
         } 
      } catch (error) { 
      } 
   }

  return (
    <div className='mhs-page'>
      {role==='Admin'?
      <div className='create-data'>
        <Link to='/CreateCertificate' class='button' style={{margin: 'auto'}}>
          <h3>Buat Sertifikat</h3>
        </Link>
      </div>
      :''}
      <div className='sertifikat-list'>
      {certificates && certificates.map(function(p, i) { return (
        <Certificate 
          code={p.id}
          sertif={p.image}
          name={p.name}
          number={p.number}
          classname={p.classname}
          classcode={p.classcode}
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