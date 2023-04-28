import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

export default function NavBar() {
  const navigate = useNavigate()
  const get_logout = () => {
    let reponse = window.confirm('Are you sure! You want to logout from system?')
    if (reponse) {
      localStorage.removeItem('token')
      localStorage.removeItem('fullname')
      localStorage.removeItem('address')
      navigate('/')
    }
  }
  return (
    <nav style={{ height: '65px', boxShadow: '0px 1px 20px #20202394' }} className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid bg-light">
        <h3 className="navbar-brand" style={{ fontStyle: 'italic', borderBottom: '1px', borderBottomColor: 'green', borderBottomStyle: 'solid', color: 'green' }}>Fuel Calculator</h3>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {localStorage.getItem('fullname') && localStorage.getItem('address') ? (<li className="nav-item">
              <Link style={{ color: 'green' }} to={'/update_personal_info'} className="nav-link active" aria-current="page">Update Personal Information</Link>
            </li>) : (<li className="nav-item">
              <Link style={{ color: 'green' }} to={'/personal_info'} className="nav-link active" aria-current="page">Personal Information</Link>
            </li>)}
            <li className="nav-item">
              <Link style={{ color: 'green' }} to={'/fuel_quote'} className="nav-link active" aria-current="page">Fuel Quote</Link>
            </li>
            <li className="nav-item">
              <Link style={{ color: 'green' }} to={'/fuel_quote_history'} className="nav-link active" aria-current="page">Fuel Quote History</Link>
            </li>
            {
              localStorage.getItem('token') ? (<li className="nav-item">
                <div style={{ color: 'green', cursor: 'pointer' }} className="nav-link active" aria-current="page" onClick={get_logout}>Logout</div>
              </li>) :
                (
                  <>
                    <li className="nav-item">
                      <Link style={{ color: 'green' }} to={'/signup'} className="nav-link active" aria-current="page">Registration</Link>
                    </li>
                    <li className="nav-item">
                      <Link style={{ color: 'green' }} to={'/'} className="nav-link active" aria-current="page">Login</Link>
                    </li>
                  </>
                )
            }
          </ul>
        </div>
      </div >
    </nav >
  )
}
