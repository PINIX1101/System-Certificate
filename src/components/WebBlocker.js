import React from 'react';
import '../assets/styles/Login.css'

export function WebBlocker() {
  const handleDosen = () => {
    sessionStorage.setItem('role','dosen')
    window.location.reload()
  }

  const handleMahasiswa = () => {
    sessionStorage.setItem('role','mahasiswa')
    window.location.reload()
  }
  
  return (
    <div className='web-blocker'>
      <button className='button' onClick={handleDosen}>Masuk sebagai Dosen</button>
      <button className='button' style={{backgroundColor: "cadetBlue"}} onClick={handleMahasiswa}>Masuk sebagai Mahasiswa</button>
    </div>
  )
}