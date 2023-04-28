import React, { useState, useEffect } from 'react'
import NavBar from './NavBar'
import { useNavigate } from "react-router-dom"

export default function FuelQuote() {
    const navigate = useNavigate();
    const [fuelPrice, setfuelPrice] = useState({ suggestedPrize: 'to be calculated', totalAmount: 'to be calculated' })
    const [information, setInformation] = useState({ gallons: '', date: '' })
    const [fullName, setFullName] = useState('from database')
    const [address, setAddress] = useState('from database')
    const onChangeHandler = (event) => {
        setInformation({ ...information, [event.target.name]: event.target.value })
    }
    const getPrice = async () => {
        let response = await fetch('http://localhost:5000/fuel/rate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token')
            },
            body: JSON.stringify({ gallons: information.gallons })
        });
        let result = await response.json();
        if (result.success) {
            setfuelPrice({ suggestedPrize: result.fuel_rate, totalAmount: result.totalAmount })
        } else {
            alert(result.error)
        }
    }
    const place_order = async () => {
        let response = await fetch('http://localhost:5000/fuel/place_order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "token": localStorage.getItem('token')
            },
            body: JSON.stringify(information)
        });
        let result = await response.json();
        if (result.success) {
            alert(result.message)
            navigate('/fuel_quote_history')
        } else {
            alert(result.error)
        }
    }
    const is_log_in = () => {
        if (!localStorage.getItem('token'))
            navigate('/')
        else if (!localStorage.getItem('fullname')) {
            navigate('/personal_info')
            alert('Please fill in information given below.')
        }
        else
            getUserInfo();
    }
    const getUserInfo = () => {
        const fullname = localStorage.getItem('fullname'), address = localStorage.getItem('address');
        if (fullname && address) {
            setFullName(fullname)
            setAddress(address)
        }
    }
    useEffect(() => {
        is_log_in();
    })
    return (
        <>
            <NavBar />
            <div className='container d-flex justify-content-center' style={{ marginTop: '70px' }}>
                <div style={{ width: '80%', height: '500px', borderRadius: '20px', boxShadow: '0.5px 5px 10px #20202394' }}>
                    <h2 style={{ textAlign: 'center', marginTop: '10px' }}>Fuel Quote</h2>
                    <div>
                        <div className='row mt-4 mx-1'>
                            <div className='col-sm-6 mt-1'>
                                <label style={{ fontWeight: 'bold', width: '25%', textAlign: 'center' }}>Fullname </label>
                                <input readOnly name='fullname' type='text' style={{ borderColor: 'green', outline: 'none', padding: '2px', borderRadius: '5px', borderWidth: '0.5px', fontStyle: 'italic', fontWeight: 'bold', width: '75%' }} value={fullName} />
                            </div>
                            <div className='col-sm-6 mt-1'>
                                <label style={{ fontWeight: 'bold', width: '25%', textAlign: 'center' }}>Address </label>
                                <input readOnly name='address' type='text' style={{ borderColor: 'green', outline: 'none', padding: '2px', borderRadius: '5px', borderWidth: '0.5px', width: '75%', fontStyle: 'italic', fontWeight: 'bold' }} value={address} />
                            </div>
                        </div>
                        <div className='row mt-4 mx-1'>
                            <div className='col-sm-6 mt-1'>
                                <label style={{ fontWeight: 'bold', width: '25%', textAlign: 'center' }}>Gallons</label>
                                <input onChange={onChangeHandler} name='gallons' type='number' min={0} style={{ borderColor: 'green', outline: 'none', padding: '2px', borderRadius: '5px', borderWidth: '0.5px', width: '75%' }} />
                            </div>
                            <div className='col-sm-6 mt-1'>
                                <label style={{ fontWeight: 'bold', width: '25%', textAlign: 'center' }}>Delivery Date</label>
                                <input onChange={onChangeHandler} name='date' type='date' min={new Date().toISOString().split('T')[0]} style={{ borderColor: 'green', outline: 'none', padding: '2px', borderRadius: '5px', borderWidth: '0.5px', width: '75%' }} />

                            </div>
                        </div>
                        <button onClick={getPrice} disabled={information.gallons !== '' && information.date !== '' ? false : true} className='mt-4 p-1' style={{ display: 'block', marginRight: 'auto', marginLeft: 'auto', backgroundColor: 'green', borderRadius: '5px', border: 'none', color: 'white', width: '97%', cursor: 'pointer' }}>get price</button>
                        <div className='row mt-4 mx-1'>
                            <div className='col-sm-6'>
                                <label style={{ fontWeight: 'bold', width: '35%', textAlign: 'center' }}>Suggested Price</label>
                                <input type='text' style={{ borderColor: 'green', outline: 'none', padding: '2px', borderRadius: '5px', borderWidth: '0.5px', width: '65%', fontStyle: 'italic' }} value={fuelPrice.suggestedPrize + '$'} readOnly />
                            </div>
                            <div className='col-sm-6'>
                                <label style={{ fontWeight: 'bold', width: '25%', textAlign: 'center' }}>Total Amount</label>
                                <input type='text' style={{ borderColor: 'green', outline: 'none', padding: '2px', borderRadius: '5px', borderWidth: '0.5px', width: '75%', fontStyle: 'italic' }} value={fuelPrice.totalAmount + '$'} readOnly />
                            </div>
                        </div>
                        <button onClick={place_order} disabled={fuelPrice.suggestedPrize === 'to be calculated' ? true : false} className='mt-4 p-1' style={{ display: 'block', marginRight: 'auto', marginLeft: 'auto', backgroundColor: 'green', borderRadius: '5px', border: 'none', color: 'white', width: '97%', cursor: 'pointer' }}>confirm order</button>
                    </div>
                </div>
            </div>
        </>
    )
}