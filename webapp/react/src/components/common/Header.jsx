import React from 'react'
import './styles.css';

function Header({title, subtitle}) {
  return (
    <div className='header'>
        <div className='container'>
            <div className='titles-container'>
                <div className='page-title'>{title}</div>
                <div className='page-sub-title'>{subtitle}</div>
            </div>
        </div>
        
    </div>
  )


}

export default Header