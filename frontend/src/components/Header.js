import React from 'react'
import { Link } from 'react-router-dom'

import './css/Header.css'

const Header = () => {
  return (
    <>
      <div className='headerContainer'>
        <Link to='/'>
          <h2 className='headerH1'>E-Commerce</h2>
        </Link>
        <ul className='headerUl'>
          <li>
            <Link className='headerLink' to='/cart'>
              Cart
            </Link>
          </li>
          <li>
            <Link className='headerLink' to='/login'>
              Login
            </Link>
          </li>
        </ul>
      </div>
    </>
  )
}

export default Header
