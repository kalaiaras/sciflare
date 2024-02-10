import React,{useState} from 'react'
import {  useNavigate } from 'react-router-dom';
function Login() {
  const navigate = useNavigate();
    const [email, setEmail]= useState('');
    const [password, setPassword]= useState('');

    const handlelogin = async()=>{
      
      let result = await fetch('http://localhost:4000/auth/login',{
        method:'post',
        body:JSON.stringify({email,password}),
        headers:{'Content-Type':'application/json'}
      });
       result = await result.json();
 
        if (result) {
            localStorage.setItem('user',JSON.stringify(result.user.username));
            localStorage.setItem('role',JSON.stringify(result.user.role));
            localStorage.setItem('id',JSON.stringify(result.user._id))
            
            navigate('/');
        }
        else {
            alert('invalid email and password');
        }
      
    }
  return (
    <div className='login'>
        <h2>Login</h2>
              <input type="email" className='inputBox' placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)}/><br/>
      <input type="password" className='inputBox' placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)}/><br/>
      <button className='appButton' onClick={handlelogin}>Login</button><br/>
      

    </div>
  )
}

export default Login
