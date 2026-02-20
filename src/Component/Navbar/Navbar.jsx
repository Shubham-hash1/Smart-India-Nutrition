import React from 'react'
import Navlinks from './Navlinks'
import Login from './Login'

const Navbar = () => {
  return (
    <div className=' flex justify-between p-4 font-bold'>
        <Navlinks/>
        <Login />
    </div>
  )
}

export default Navbar