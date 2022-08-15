import React, { useState } from 'react';
import '../assets/styles/Login.css'
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

export function CreateCertificate(id) {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [number, setNumber] = useState('');
  const [classname, setClassname] = useState('');
  const [date, setDate] = useState('');
  const [organization, setOrganization] = useState('');
  const idname = sessionStorage.getItem('idname');
  
  const handleSubmit = async () => { 
   if( idname && date && organization ) { 
      try { 
         const { data, error } = await supabase.from('Sertifikat').upsert({ 
            name: name, 
            image: image, 
            number: number, 
            classname: classname, 
            date: date, 
            organization: organization, 
         }) 
         sessionStorage.setItem('numbersertif',number);
         navigate("/isitranskrip") 
      } catch (e) { 
      } 
   } else { 
      alert("Harap isi dengan lengkap"); 
   } 
}

  return (
    <div className='createcertificate'>
      <div className='form' style={{width: '60%', margin: 'auto'}}>
        <h1>Buat Sertifikat</h1>
        <div>
          <label for='name'>Nama</label>
          <div className='input-group'>
             <input required value={name || ''} onChange={(e) => setName(e.target.value)} type="text" name="name" placeholder="Nama" />
          </div>
        </div>
        <div>
          <label for='image'>Gambar</label>
          <div className='input-group'>
             <input required value={image || ''} onChange={(e) => setImage(e.target.value)} type="text" name="image" placeholder="Gambar" />
          </div>
        </div>
        <div>
          <label for='number'>Nomor</label>
            <div className='input-group'>
              <input required value={number || ''} onChange={(e) => setNumber(e.target.value)} type="text" name="number" placeholder="Nomor" />
            </div>
        </div>
        <div>
          <label for='classname'>Nama Kelas</label>
            <div className='input-group'>
              <input required value={classname || ''} onChange={(e) => setClassname(e.target.value)} type="text" name="classname" placeholder="Nama Kelas" />
            </div>
        </div>
        <div>
          <label for='date'>Tanggal</label>
          <div className='input-group'>
             <input required value={date || ''} onChange={(e) => setDate(e.target.value)} type="date" name="date" placeholder="Tanggal" />
          </div>
        </div>
        <div>
          <label for='organization'>Organisasi</label>
          <div className='input-group'>
             <input required value={organization || ''} onChange={(e) => setOrganization(e.target.value)} type="text" name="organization" placeholder="Organisasi" />
          </div>
        </div>
        <button onClick={ handleSubmit } type='submit' className='button'>Create</button>
        </div>
    </div>
  )
}