import React from 'react'
import { Link, useNavigate} from 'react-router-dom'


function Nav() {
  const auth =localStorage.getItem('user');
   
 const navigate = useNavigate();
 const logout = () =>{
  localStorage.clear();
  navigate('/signup')
}
  return (
    <div>
      {
        auth ? <ul className='nav-ul'>
        <li><Link to='/'>Home</Link></li>
      
     
        <li><Link to='/profile'>Profile</Link></li>
        <li><Link onClick={logout} to='/signup'>Logout ({JSON.parse(auth)})</Link></li>
        </ul>:
        <ul className='nav-ul nav-right'>
        <li><Link to='/signup'>Signup</Link></li>
       <li><Link to='/login'>Login</Link></li>
       </ul>
      }



   
    </div>
  )
}

export default Nav
