import React, { useState } from 'react'
import NavBar from './NavBar'
import { useNavigate } from 'react-router-dom'

function RegisterPage() {
  const navigate = useNavigate();
  const [information, setInformation] = useState({ username: '', password: '' })
  const onChangeHandler = (event) => {
    setInformation({ ...information, [event.target.name]: event.target.value })
  }
  const get_user_register = async () => {
    let response = await fetch('http://localhost:5000/client/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(information)
    });
    let result = await response.json();
    if (result.success) {
      navigate('/')
    } else {
      alert(result.message);
    }
  }
  return (
    <>
      <NavBar />
      <div className='container d-flex justify-content-center' style={{ marginTop: '70px' }}>
        <div style={{ width: '80%', height: '450px', borderRadius: '20px', boxShadow: '0.5px 5px 10px #20202394' }}>
          <div style={{ marginTop: '10px' }}>
            <h2 style={{ textAlign: 'center' }}>Registration</h2>
            <div className='d-flex flex-column align-items-center'>
              <div style={{ width: '60%' }}>
                <div className='mt-5'>
                  <p style={{ fontWeight: 'bold' }}>username</p>
                  <input name='username' type='text' onChange={onChangeHandler} style={{ borderColor: 'green', width: '100%', outline: 'none', borderRadius: '5px', borderWidth: '0.5px' }} />
                </div>
                <div className='mt-5'>
                  <p style={{ fontWeight: 'bold' }}>password</p>
                  <input name='password' type='password' onChange={onChangeHandler} style={{ borderColor: 'green', width: '100%', outline: 'none', borderRadius: '5px', borderWidth: '0.5px' }} />
                </div>
              </div>
              <button disabled={information.username.length === 0 && information.password.length === 0 ? true : false} className='mt-5 p-1' style={{ backgroundColor: 'green', width: '60%', borderRadius: '5px', border: 'none', color: 'white', cursor: 'pointer' }} onClick={get_user_register}>signup</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default RegisterPage;