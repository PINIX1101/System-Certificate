import React from 'react';
import '../assets/styles/Login.css'
import student from '../assets/image/student.png'
import admin from '../assets/image/admin.png'
import director from '../assets/image/director.png'

export function WebBlocker() {
  
  const handleKaprodi = () => {
    sessionStorage.setItem('role','Kaprodi')
    window.location.reload()
  }

  const handlePengurus = () => {
    sessionStorage.setItem('role','Pengurus')
    window.location.reload()
  }

  const handleMahasiswa = () => {
    sessionStorage.setItem('role','Mahasiswa')
    window.location.reload()
  }
  
  return (
    <div className='web-blocker'>
      <div className='login'>
        <button className='button-login' style={{width: 250}} onClick={handleKaprodi}>
          <img src={director} alt='teacher' />
          <h2>Perwakilan Prodi</h2>
        </button>
        <button className='button-login' style={{backgroundColor: "#75975E", width: 250}} onClick={handlePengurus}>
          <img src={admin} alt='student' />
          <h2>Pengurus</h2>
        </button>
        <button className='button-login' style={{backgroundColor: "cadetBlue", width: 250}} onClick={handleMahasiswa}>
          <img src={student} alt='student' />
          <h2>Peserta Program</h2>
        </button>
      </div>
    </div>
  )
}