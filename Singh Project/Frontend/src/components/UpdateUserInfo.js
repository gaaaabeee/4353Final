import React, { useState } from 'react'
import NavBar from './NavBar'
import { useNavigate } from "react-router-dom"

export default function UpdateUserInfo() {
    const navigate = useNavigate();
    const [information, setInformation] = useState({ fullname: '', address1: '', address2: '', zip: '', state: '' })
    const onChangeHandler = (event) => {
        setInformation({ ...information, [event.target.name]: event.target.value })
    }

    const set_user_info = async () => {
        let response = await fetch('http://localhost:5000/client/update_user', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token')
            },
            body: JSON.stringify(information)
        });
        let result = await response.json();
        if (result.success) {
            localStorage.setItem('fullname', result.fullname)
            localStorage.setItem('address', result.address)
            navigate('/fuel_quote')
            alert("user information has successfully updated.")
        } else {
            alert(result.error);
        }
    }
    return (
        <div>
            <NavBar />
            <div className='container d-flex justify-content-center' style={{ marginTop: '70px' }}>
                <div style={{ width: '80%', height: '450px', borderRadius: '20px', boxShadow: '0.5px 5px 10px #20202394' }}>
                    <h2 style={{ textAlign: 'center', marginTop: '10px' }}>Update Personal Information</h2>
                    <div className='mx-4'>
                        <span style={{ fontWeight: 'bold' }}>Note : </span>
                        <span>Please fill in the fields which are needed to be updated.</span>
                    </div>
                    <div className='row mt-4 mb-5 mx-1'>
                        <div className='col-sm-6 mt-1'>
                            <label style={{ fontWeight: 'bold', width: '25%', textAlign: 'center' }}>Fullname</label>
                            <input onChange={onChangeHandler} name='fullname' type='text' style={{ borderColor: 'green', width: '75%', outline: 'none', borderRadius: '5px', borderWidth: '0.5px' }} />
                        </div>
                        <div className='col-sm-6 mt-1'>
                            <label style={{ fontWeight: 'bold', width: '25%', textAlign: 'center' }}>State</label>
                            <select onChange={onChangeHandler} name='state' style={{ borderColor: 'green', width: '75%', outline: 'none', borderRadius: '5px', borderWidth: '0.5px' }} required>
                                <option value="">Select a state</option>
                                <option value="AL">Alabama</option>
                                <option value="AK">Alaska</option>
                                <option value="AZ">Arizona</option>
                                <option value="AR">Arkansas</option>
                                <option value="CA">California</option>
                                <option value="CO">Colorado</option>
                                <option value="CT">Connecticut</option>
                                <option value="DE">Delaware</option>
                                <option value="DC">District Of Columbia</option>
                                <option value="FL">Florida</option>
                                <option value="GA">Georgia</option>
                                <option value="HI">Hawaii</option>
                                <option value="ID">Idaho</option>
                                <option value="IL">Illinois</option>
                                <option value="IN">Indiana</option>
                                <option value="IA">Iowa</option>
                                <option value="KS">Kansas</option>
                                <option value="KY">Kentucky</option>
                                <option value="LA">Louisiana</option>
                                <option value="ME">Maine</option>
                                <option value="MD">Maryland</option>
                                <option value="MA">Massachusetts</option>
                                <option value="MI">Michigan</option>
                                <option value="MN">Minnesota</option>
                                <option value="MS">Mississippi</option>
                                <option value="MO">Missouri</option>
                                <option value="MT">Montana</option>
                                <option value="NE">Nebraska</option>
                                <option value="NV">Nevada</option>
                                <option value="NH">New Hampshire</option>
                                <option value="NJ">New Jersey</option>
                                <option value="NM">New Mexico</option>
                                <option value="NY">New York</option>
                                <option value="NC">North Carolina</option>
                                <option value="ND">North Dakota</option>
                                <option value="OH">Ohio</option>
                                <option value="OK">Oklahoma</option>
                                <option value="OR">Oregon</option>
                                <option value="PA">Pennsylvania</option>
                                <option value="RI">Rhode Island</option>
                                <option value="SC">South Carolina</option>
                                <option value="SD">South Dakota</option>
                                <option value="TN">Tennessee</option>
                                <option value="TX">Texas</option>
                                <option value="UT">Utah</option>
                                <option value="VT">Vermont</option>
                                <option value="VA">Virginia</option>
                                <option value="WA">Washington</option>
                                <option value="WV">West Virginia</option>
                                <option value="WI">Wisconsin</option>
                                <option value="WY">Wyoming</option>
                            </select>
                        </div>
                    </div>
                    <div className='row mx-1'>
                        <div className='col-sm-6 mt-1'>
                            <label style={{ fontWeight: 'bold', width: '25%', textAlign: 'center' }}>ZIP code</label>
                            <input onChange={onChangeHandler} name='zip' type='number' min={0} style={{ borderColor: 'green', width: '75%', outline: 'none', borderRadius: '5px', borderWidth: '0.5px' }} />
                        </div>
                        <div className='col-sm-6 mt-1'>
                            <label style={{ fontWeight: 'bold', width: '25%', textAlign: 'center' }}>Address1</label>
                            <input onChange={onChangeHandler} name='address1' type='address' style={{ borderColor: 'green', width: '75%', outline: 'none', borderRadius: '5px', borderWidth: '0.5px' }} />
                        </div>
                    </div>
                    <div className='row mx-1 mt-5'>
                        <div className='col-sm-12 mt-1'>
                            <label style={{ fontWeight: 'bold', width: '10%', textAlign: 'center' }}>Address2</label>
                            <input onChange={onChangeHandler} name='address2' type='address' style={{ borderColor: 'green', width: '90%', outline: 'none', borderRadius: '5px', borderWidth: '0.5px' }} />
                        </div>
                    </div>
                    <div className='mx-1 row'>
                        <div className='col-sm-12 mt-1'>
                            <button onClick={set_user_info} className='mt-5 p-1' style={{ backgroundColor: 'green', width: '100%', borderRadius: '5px', border: '0.5px', color: 'white' }}>submit</button>
                        </div>
                    </div >
                </div >
            </div >
        </div >
    )
}
