import React from 'react';
import { useNavigate } from 'react-router-dom';

export function Certificate(props) {
  const role = sessionStorage.getItem('role');
  const navigate = useNavigate();
  const handleClick = () => { 
    if(role === 'Kaprodi'){
      navigate(`/datatranskrip/${props.number}`)
    } else {
      navigate(`/transkrip/${props.number}`);
  }
}
  
  return (
    <div className='sertif-grid'>
        <img src={props.sertif} onClick={handleClick} alt='sertif'/>
        <div className='sertif-detail'>
          <h2>{ props.name }</h2>
          <h3>{ props.number }</h3>
          <p>{ props.classcode} { props.classname}</p>
          <p>{ props.date }</p>
        </div>
    </div>
  )
}