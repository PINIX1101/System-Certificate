import React, { useState, useEffect } from 'react';
import '../assets/styles/Login.css'
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

export function CreateCertificate({id}) {
  useEffect(() => { 
      getCertificates();
      getClasses() 
   }, [id]) ;

  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [classname, setClassname] = useState('');
  const [classcode, setClasscode] = useState('');
  const [classes, setClasses] = useState('');
  const [date, setDate] = useState('');
  const [organization, setOrganization] = useState('');
  const [certificates, setCertificates] = useState('');
  const idname = sessionStorage.getItem('idname');
  
  async function getCertificates() { 
    try { 
        let { data, error, status } = await supabase 
          .from('Sertifikat') 
          .select()
          .order('id', { ascending: false })
        
        if (error && status !== 406) { 
          throw error 
        } 

        if (data) { 
          setCertificates(data) 
        } 
    } catch (error) { 
        alert(error.message) 
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
        alert(error.message) 
    } 
  }

  const handleSubmit = async () => { 
   if( idname && date && organization ) { 
      var kode_kelas = classname.slice(0,3);
      var str = "" + (certificates[0].id + 1);
      var pad = "0000";;
      var kode_angka = pad.substring(0, pad.length - str.length) + str;
      var kode = kode_kelas.toUpperCase() + kode_angka;

      try { 
         const { data, error } = await supabase.from('Sertifikat').upsert({ 
            name: name, 
            image: image, 
            number: kode, 
            classname: classname, 
            classcode: classcode, 
            date: date, 
            organization: organization, 
         }) 
         sessionStorage.setItem('numbersertif', kode);
         navigate("/isitranskrip") 
      } catch (e) { 
      } 
   } else { 
      alert("Harap isi dengan lengkap"); 
   } 
  }

  // console.log(classes)

  const handleClass = (e) => {
    setClasscode(e.target.value);
    for (let x in classes){
      if(classes[x].classcode === classcode){
        setClassname(classes[x].classname)
      }
    }
  }

  return (
    <div className='createcertificate'>
      <div className='form' style={{width: '60%', margin: 'auto'}}>
        <h1>Buat Sertifikat</h1>
        <div>
          <label for='name'>Nama Peserta</label>
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
          <label for='classcode'>Kelas</label>
          <div className='input-group'>
            <select style={{width: '100%', height: 40}} value={classcode || ''} onChange={handleClass}>
              <option value=''></option>
              {classes && classes.map(function(p, i) { return (
                <option value={p.classcode}>{p.classcode} {p.classname}</option>
                )})}
            </select>
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