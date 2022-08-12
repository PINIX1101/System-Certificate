import React from 'react';
import '../assets/styles/Login.css'
import teacher from '../assets/image/teacher.png'
import student from '../assets/image/student.png'

export function WebBlocker() {
  const handleDosen = () => {
    sessionStorage.setItem('role','Dosen')
    window.location.reload()
  }

  const handleMahasiswa = () => {
    sessionStorage.setItem('role','Mahasiswa')
    window.location.reload()
  }
  
  return (
    <div className='web-blocker'>
      <div className='login'>
        <button className='button-login' onClick={handleDosen}>
          <img src={teacher} alt='teacher' />
          <h2>Masuk sebagai Dosen</h2>
        </button>
        <button className='button-login' style={{backgroundColor: "cadetBlue"}} onClick={handleMahasiswa}>
          <img src={student} alt='student' />
          <h2>Masuk sebagai Mahasiswa</h2>
        </button>
      </div>
    </div>
  )
}