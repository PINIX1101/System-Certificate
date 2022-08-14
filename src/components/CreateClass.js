import React, { useState } from 'react';
import '../assets/styles/Login.css'
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

export function CreateClass(id) {
  const navigate = useNavigate();
  const [classcode, setClasscode] = useState('');
  const [classname, setClassname] = useState('');
  const [lecturername, setLecturername] = useState('');
  
  const handleSubmit = async () => { 
   if( classname && classcode && lecturername ) { 
      try { 
         const { data, error } = await supabase.from('Kelas').upsert({ 
            classname: classname, 
            classcode: classcode, 
            lecturername: lecturername, 
         }) 
         navigate("/") 
      } catch (e) { 
         alert(e.message); 
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
          <label for='classcode'>Kode Kelas</label>
          <div className='input-group'>
             <input required value={classcode || ''} onChange={(e) => setClasscode(e.target.value)} type="text" name="classcode" placeholder="Kode Kelas" />
          </div>
        </div>
        <div>
          <label for='classname'>Nama Kelas</label>
          <div className='input-group'>
             <input required value={classname || ''} onChange={(e) => setClassname(e.target.value)} type="text" name="classname" placeholder="Nama Kelas" />
          </div>
        </div>
        <div>
          <label for='lecturername'>Nama Dosen</label>
            <div className='input-group'>
              <input required value={lecturername || ''} onChange={(e) => setLecturername(e.target.value)} type="text" name="lecturername" placeholder="Nama Dosen" />
            </div>
        </div>
        <button onClick={ handleSubmit } type='submit' className='button'>Create</button>
        </div>
    </div>
  )
}