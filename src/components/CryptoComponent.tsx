import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { Typography, Paper, Button, CircularProgress } from '@mui/material'
import axios from 'axios'

const CryptoComponent: React.FC = () => {
  const [data, setData] = useState<any>([])
  const [isLoading, setIsLoadin] = useState<boolean>(true)
  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
      const data = await axios.get(
        `https://api.coinlore.net/api/ticker/?id=${params.symbol}`
      )
      setData(data.data[0])
      setIsLoadin(false)
    } catch (e: any) {
      console.log(e.message)
    }
  }

  return (
    <div className='component'>
      <Button
        variant='outlined'
        onClick={() => {
          navigate('/')
        }}
      >
        Back
      </Button>
      {isLoading ? (
        <div className='loading'>
          <CircularProgress size={'60px'} />
        </div>
      ) : (
        <Paper elevation={2}>
          <Typography variant='h3'>{data.symbol}</Typography>
          <div className='price'>
            <Typography variant='h3'>{'$' + data.price_usd}</Typography>
            <Typography
              variant='h4'
              style={
                +data.percent_change_24h < 0
                  ? { color: 'red' }
                  : { color: 'green' }
              }
            >
              {'(' + data.percent_change_24h + '%' + ')'}
            </Typography>
          </div>

          <Typography variant='h3'>Supply: {data.csupply}</Typography>
          <Typography variant='h3'>Volume 24Hr: {data.volume24}</Typography>
        </Paper>
      )}
    </div>
  )
}

export default CryptoComponent
