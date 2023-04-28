import React from 'react'
import FuelQuoteHistory from './components/FuelQuoteHistory';
import FuelQuote from './components/FuelQuote';
import UserInformation from './components/UserInformation';
import RegisterPage from './components/RegisterPage';
import Login from './components/Login';
import UpdateUserInfo from './components/UpdateUserInfo';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/personal_info' element={<UserInformation />} />
        <Route path='/update_personal_info' element={<UpdateUserInfo />} />
        <Route path='/fuel_quote' element={<FuelQuote />} />
        <Route path='/fuel_quote_history' element={<FuelQuoteHistory />} />
        <Route path='/signup' element={<RegisterPage />} />
        {localStorage.getItem('token') ? <Route path='/' element={<FuelQuote />} /> : <Route path='/' element={<Login />} />}
      </Routes>
    </Router>
  )
}

export default App;
