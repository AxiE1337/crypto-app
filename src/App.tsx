import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import CryptoComponent from './components/CryptoComponent'
import Crypto from './pages/Crypto'

const App = () => {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Crypto />}></Route>
        <Route path='/currency/:symbol' element={<CryptoComponent />} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </div>
  )
}

export default App
