import React, { useEffect, useState } from 'react'
import NavBar from './NavBar'
import { useNavigate } from "react-router-dom"

export default function FuelQuoteHistory() {
    const navigate = useNavigate();
    const [history, setHistory] = useState([])


    

    const getHistory = async () => {
        let response = await fetch('http://localhost:5000/fuel/history', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token')
            }
        });
        let result = await response.json();
        if (result.success) {
            setHistory(result.data)
        } else {
            alert(result.message)
        }
    }

    const is_log_in = () => {
        if (!localStorage.getItem('token'))
            navigate('/')
    }
    useEffect(() => {
        is_log_in();
        getHistory()
    })
    return (
        <>
        
        <NavBar />
<div className='container d-flex justify-content-center' style={{ marginTop: '70px' }}>
  <div style={{ width: '80%', borderRadius: '20px', boxShadow: '0.5px 5px 10px #20202394' }}>
    <div style={{ marginTop: '10px', marginBottom: '10px' }}>
      <h2 style={{ textAlign: 'center' }}>Fuel Quote History</h2>
      <div className='my-3 container'> 
        {
          history.length > 0 ? history.map((items) => {
            const suggestedPricePerGallon =1; // Replace with actual calculation for suggested price per gallon
            const totalAmount = items.gallons * suggestedPricePerGallon;
            return (
              <div className='my-1 row mx-1' style={{ borderBottomWidth: '1px', borderBottomStyle: 'solid', borderBottomColor: 'green' }}>
                <div className='col-sm-4'><span style={{ fontWeight: 'bold' }}>Name : </span>
                  <span>{localStorage.getItem('fullname')}</span></div>
                <div className='col-sm-4'><span style={{ fontWeight: 'bold' }}>Date : </span>
                  <span>{items.date}</span>
                </div>
                <div className='col-sm-2'><span style={{ fontWeight: 'bold' }}>Fuel Amount : </span>
                  <span>{items.gallons}</span>
                </div>
                <div className='col-sm-2'><span style={{ fontWeight: 'bold' }}>Price per Gallon : </span>
                  <span>{suggestedPricePerGallon}</span>
                </div>
                <div className='col-sm-2'><span style={{ fontWeight: 'bold' }}>Total Amount ($) : </span>
                  <span>{totalAmount}</span>
                </div>
              </div>
            )
          }) : (
            <div className='my-2 mx-1' style={{ borderBottomWidth: '1px', borderBottomStyle: 'solid', borderBottomColor: 'green' }}>
              <div>
                <h6 style={{ fontStyle: 'italic', textAlign: 'center' }}>No Fuel Has Been Bought So Far</h6>
              </div>
            </div>
          )
        }
      </div>
    </div>
  </div>
</div>

        </>
    )
}
