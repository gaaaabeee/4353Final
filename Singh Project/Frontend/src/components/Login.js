import React, { useState } from 'react'
import NavBar from './NavBar'
import { useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate();
  const [information, setInformation] = useState({ username: '', password: '' })
  const onChangeHandler = (event) => {
    setInformation({ ...information, [event.target.name]: event.target.value })
  }
  const get_user_login = async () => {
    let response = await fetch('http://localhost:5000/client/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(information)
    });
    let result = await response.json();
    if (result.success) {
      localStorage.setItem('token', result.token)
      if (result.fullname) {
        localStorage.setItem('fullname', result.fullname)
        localStorage.setItem('address', result.address)
        navigate('/fuel_quote')
      } else {
        navigate('/personal_info')
      }
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
            <h2 style={{ textAlign: 'center' }}>Login</h2>
            <div className='d-flex flex-column align-items-center justify-content-center'>
              <div style={{ width: '60%' }}>
                <div className='mt-5'>
                  <p style={{ fontWeight: 'bold' }}>username</p>
                  <input name='username' onChange={onChangeHandler} type='text' style={{ borderColor: 'green', width: '100%', outline: 'none', borderRadius: '5px', borderWidth: '0.5px' }} />
                </div>
                <div className='mt-5'>
                  <p style={{ fontWeight: 'bold' }}>password</p>
                  <input name='password' onChange={onChangeHandler} type='password' style={{ borderColor: 'green', width: '100%', outline: 'none', borderRadius: '5px', borderWidth: '0.5px' }} />
                </div>
              </div>
              <button onClick={get_user_login} disabled={information.username.length === 0 && information.password.length === 0 ? true : false} className='mt-5 p-1' style={{ backgroundColor: 'green', width: '60%', borderRadius: '5px', border: 'none', color: 'white', cursor: 'pointer' }}>login</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login;