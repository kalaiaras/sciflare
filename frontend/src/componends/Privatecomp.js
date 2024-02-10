import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function Privatecomp() {
    const auth_id = JSON.parse(localStorage.getItem('id'));
  return (
    auth_id? <Outlet/>:<Navigate to='/signup'/>
  )
}

export default Privatecomp
