import React from 'react';
import '../assets/styles/Login.css'
import teacher from '../assets/image/teacher.png'
import student from '../assets/image/student.png'

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
        <button className='button-login' onClick={handleKaprodi}>
          <img src={teacher} alt='teacher' />
          <h2>Perwakilan Prodi</h2>
        </button>
        <button className='button-login' style={{backgroundColor: "cadetBlue"}} onClick={handlePengurus}>
          <img src={student} alt='student' />
          <h2>Pengurus</h2>
        </button>
        <button className='button-login' style={{backgroundColor: "cadetBlue"}} onClick={handleMahasiswa}>
          <img src={student} alt='student' />
          <h2>Peserta Program</h2>
        </button>
      </div>
    </div>
  )
}