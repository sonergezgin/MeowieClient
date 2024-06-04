import React, { useContext,useEffect } from 'react'
import {Link} from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import catIcon from '../../images/cat.png'

const Navbar = () => {

  let {user, logoutUser} = useContext(AuthContext);


  useEffect(()=>{
    const localStorageData = JSON.parse(localStorage.getItem('authTokens'))
    if(localStorageData){
      const expirationDate = Date.parse(localStorageData.expiration)
      if(Date.now() > expirationDate){
        logoutUser()
      }
    }
  })
  return (
    <div className=' flex items-center justify-center p-4 z-[100] w-full absolute hover:bg-black/25'>
      <Link to="/">
      <img src={catIcon} alt='catLogo' width={40} className='cursor-pointer'/>
      </Link>
      <Link to="/">
      <h1 className='text-[#ff6473] text-4xl font-bold cursor-pointer pl-1 pr-3'>MEOWIE</h1>
      </Link>
      <Link to="/movies">
        <button className='px-2 cursor-pointer font-bold text-[#d2d2d7] hover:text-white'>MOVIES</button>
      </Link>
      <Link to="/lists">
        <button className='px-2 cursor-pointer font-bold text-[#d2d2d7] hover:text-white'>LISTS</button>
      </Link>
      
      <div>
        {user ? (
        <button className='px-2 cursor-pointer font-bold text-[#d2d2d7] hover:text-white' onClick={logoutUser} >LOGOUT</button>
        ) : 
        (<Link to="/login">
        <button className='px-2 cursor-pointer font-bold text-[#d2d2d7] hover:text-white'>LOGIN</button>
        </Link>)
        }
        
        {user ? (
        <Link to='/profile'>
        <button className='px-2 cursor-pointer font-bold text-[#d2d2d7] hover:text-white'>PROFILE</button>
        </Link>
        ) : 
        (<Link to="/register">
        <button className='px-2 cursor-pointer font-bold text-[#d2d2d7] hover:text-white'>REGISTER</button>
        </Link>)
        }
        
      </div>
    </div>
  )
}

export default Navbar
