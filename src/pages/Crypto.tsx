import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { TextField, Typography, CircularProgress } from '@mui/material'
import '../styles/crypto.css'
import { BiSortAlt2 } from 'react-icons/bi'

const Crypto: React.FC = () => {
  const [cryptoData, setCryptoData] = useState<any>([])
  const [inputData, setInputData] = useState<any>('')
  const [isLoading, setIsLoadin] = useState<boolean>(true)
  const [sortArrNum, setSortArrNum] = useState<boolean>(false)
  const [sortArrCoin, setSortArrCoin] = useState<boolean>(false)
  const [sortArrPrice, setSortArrPrice] = useState<boolean>(false)
  const [sortArr1h, setSortArr1h] = useState<boolean>(false)
  const navigate = useNavigate()
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

  const sortArrNumFunc = () => {
    if (!sortArrNum) {
      setCryptoData(cryptoData.sort((a: any, b: any) => b.rank - a.rank))
    } else {
      setCryptoData(cryptoData.sort((a: any, b: any) => a.rank - b.rank))
    }
    setSortArrNum(!sortArrNum)
  }

  const sortArrCoinFunc = () => {
    if (!sortArrCoin) {
      setCryptoData(
        cryptoData.sort((a: any, b: any) => {
          if (a.name.toLowerCase() < b.name.toLowerCase()) {
            return -1
          }
          if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return 1
          }
        })
      )
    } else {
      setCryptoData(
        cryptoData.sort((a: any, b: any) => {
          if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return -1
          }
          if (a.name.toLowerCase() < b.name.toLowerCase()) {
            return 1
          }
        })
      )
    }
    setSortArrCoin(!sortArrCoin)
  }

  const sortArrPriceFunc = () => {
    if (!sortArrPrice) {
      setCryptoData(
        cryptoData.sort((a: any, b: any) => b.price_usd - a.price_usd)
      )
    } else {
      setCryptoData(
        cryptoData.sort((a: any, b: any) => a.price_usd - b.price_usd)
      )
    }
    setSortArrPrice(!sortArrPrice)
  }

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
        <div className='sort'>
          <h3 className='sortArr' onClick={sortArrNumFunc}>
            #<BiSortAlt2 />
          </h3>
          <Typography
            className='sortArr'
            variant='h5'
            onClick={sortArrCoinFunc}
          >
            Coin
            <BiSortAlt2 />
          </Typography>
          <Typography
            className='sortArr'
            variant='h5'
            onClick={sortArrPriceFunc}
          >
            Price
            <BiSortAlt2 />
          </Typography>
          <Typography variant='h5'>1h</Typography>
          <Typography variant='h5'>24h</Typography>
          <Typography variant='h5'>7d</Typography>
          <Typography variant='h5'>
            market cap
            <BiSortAlt2 />
          </Typography>
          <Typography variant='h5'>24h volume</Typography>
        </div>
        {isLoading ? (
          <div className='loading'>
            <CircularProgress size={'60px'} />
          </div>
        ) : (
          cryptoData
            .filter((data: any) =>
              data.name.toLowerCase().includes(inputData.toLowerCase())
            )
            .map((data: any) => {
              return (
                <div key={data.id} className='cryptoBar'>
                  <Typography variant='h5'>{data.rank}</Typography>

                  <div>
                    <div className='coin'>
                      <Typography
                        onClick={() => {
                          navigate(`/currency/${data.id}`)
                        }}
                        variant='h4'
                      >
                        {data.name}
                      </Typography>
                      <p>{data.symbol}</p>
                    </div>
                  </div>
                  <Typography variant='h4'>{'$' + data.price_usd}</Typography>
                  <p
                    style={
                      +data.percent_change_1h < 0
                        ? { color: 'red' }
                        : { color: 'green' }
                    }
                  >
                    {data.percent_change_1h + '%'}
                  </p>
                  <p
                    style={
                      +data.percent_change_24h < 0
                        ? { color: 'red' }
                        : { color: 'green' }
                    }
                  >
                    {data.percent_change_24h + '%'}
                  </p>
                  <p
                    style={
                      +data.percent_change_7d < 0
                        ? { color: 'red' }
                        : { color: 'green' }
                    }
                  >
                    {data.percent_change_7d + '%'}
                  </p>
                  <p>{'$' + data.market_cap_usd}</p>
                  <p>{'$' + data.volume24}</p>
                </div>
              )
            })
        )}
      </div>
    </>
  )
}

export default Crypto
