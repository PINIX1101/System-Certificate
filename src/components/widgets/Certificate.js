import React from 'react';
import sertif from '../../assets/image/sertif-exp.png'
import { Link } from 'react-router-dom';

export function Certificate(props) {
  return (
    <div className='sertif-grid'>
      <Link to='/Transkrip'>
        <img src={sertif} alt='sertif'/>
      </Link>
        <div className='sertif-detail'>
          <h2>Vaksin Pertama</h2>
          <h3>1 Januari 2022</h3>
          <p>RSUP HASAN SADIKIN</p>
        </div>
    </div>
  )
}