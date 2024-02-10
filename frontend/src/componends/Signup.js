
import React, { useState, useEffect } from 'react'
import {  useNavigate } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [data, setData] = useState([]);
  const [organization, setOrganization] = useState('');

  useEffect(() => {
    fetchdata();
 

  }, [data])

  const fetchdata = async () => {

    try {
      let result = await fetch('http://localhost:4000/organization/organizations', {
        method: 'get',
        headers: { 'Content-Type': 'application/json' }
      });
      result = await result.json();
      setData(result);



    }
    catch (error) {
      console.error('Error fetching data', error)
    }
  }

const handlelogin =async ()=>{
  navigate("/login") 
}




  const handlesignup = async () => {


    let result = await fetch('http://localhost:4000/auth/signup', {
      method: 'post',
      body: JSON.stringify({ username, email, password, organization }),
      headers: { 'Content-Type': 'application/json' }
    });
    result = await result.json();
    alert(result);
    if (result.ok) {
      navigate('/login');
    } else {
      throw new Error('Signup failed');
    }
   
  }

  return (

    <div className='register'>
      <h2>Signup</h2>
      <form>
        <input type="text" className='inputBox' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} /><br />
        <input type="email" className='inputBox' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} /><br />
        <input type="password" className='inputBox' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} /><br />
        <select value={organization} onChange={(e) => setOrganization(e.target.value)} className='inputBox'>

          <option value="">Select your organizations</option>
          {
            data.map((item) => (
              <option key={item._id} value={item.name}>{item.name}</option>
            ))
          }
        </select><br />
        <button className='appButton' onClick={handlesignup}>submit</button>
        <button className='appButton' onClick={handlelogin}>Login</button><br />
      </form>

    </div>

  )
}

export default Signup
