import React from 'react';
import sertif from '../../assets/image/sertif-exp.png'

export function Certificate(props) {
  return (
    <div className='sertif-grid'>
      <img src={sertif} alt='sertif'/>
      <div className='sertif-detail'>
        <h2>Vaksin Pertama</h2>
        <h3>1 Januari 2022</h3>
        <p>RSUP HASAN SADIKIN</p>
      </div>
    </div>
  )
}