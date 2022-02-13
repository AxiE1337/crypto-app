import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import CoinPage from './pages/CoinPage'
import Crypto from './pages/Crypto'

const App = () => {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Crypto />}></Route>
        <Route path='/currency/:symbol' element={<CoinPage />} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </div>
  )
}

export default App
