import { useState, useEffect } from 'react'
import axios from 'axios'
import { TextField } from '@mui/material'
import '../styles/crypto.css'
import CryptoNav from '../components/CryproNav'

const Crypto = () => {
  const [cryptoData, setCryptoData] = useState<any>([])
  const [inputData, setInputData] = useState<any>('')
  const [isLoading, setIsLoadin] = useState<boolean>(true)

  const option = {
    root: null,
    rootMargin: '0px',
    threshold: 0.6,
  }

  useEffect(() => {
    getData()
  }, [])
  const getData = async () => {
    try {
      const data: any = await axios.get('https://api.coinlore.net/api/tickers/')
      setCryptoData(data.data.data)
      setIsLoadin(false)
    } catch (err: any) {
      console.log(err.message)
    }
  }

  const callbackFunction = (entries: any) => {
    entries.forEach((entry: any) => {
      entry.target.classList.toggle('cryptoBarInv', !entry.isIntersecting)
    })
  }

  useEffect(() => {
    const observer = new IntersectionObserver(callbackFunction, option)
    document.querySelectorAll('.cryptoBar').forEach((data: any) => {
      observer.observe(data)
    })
  }, [getData])

  return (
    <>
      <header className='head'>
        <TextField
          variant='standard'
          label='Search'
          type='text'
          sx={{ m: 1, width: '65ch' }}
          onChange={(e) => {
            setInputData(e.target.value)
          }}
        />
      </header>
      <div className='crypto'>
        <CryptoNav
          coinData={cryptoData}
          isLoading={isLoading}
          inputData={inputData}
        />
      </div>
    </>
  )
}

export default Crypto
