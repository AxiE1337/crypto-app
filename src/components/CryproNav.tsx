import { useState } from 'react'
import { BiSortAlt2 } from 'react-icons/bi'
import { Typography } from '@mui/material'
import { CircularProgress } from '@mui/material'
import Coins from '../components/Coins'

const CryproNav: React.FC<{
  coinData: any
  isLoading: boolean
  inputData: string
}> = ({ coinData, isLoading, inputData }) => {
  const [sortArrNum, setSortArrNum] = useState<boolean>(false)
  const [sortArrCoin, setSortArrCoin] = useState<boolean>(false)
  const [sortArrPrice, setSortArrPrice] = useState<boolean>(false)

  const sortArrNumFunc = () => {
    if (!sortArrNum) {
      coinData.sort((a: any, b: any) => b.rank - a.rank)
    } else {
      coinData.sort((a: any, b: any) => a.rank - b.rank)
    }
    setSortArrNum(!sortArrNum)
  }

  const sortArrCoinFunc = () => {
    if (!sortArrCoin) {
      coinData.sort((a: any, b: any) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
          return -1
        }
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
          return 1
        }
      })
    } else {
      coinData.sort((a: any, b: any) => {
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
          return -1
        }
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
          return 1
        }
      })
    }
    setSortArrCoin(!sortArrCoin)
  }

  const sortArrPriceFunc = () => {
    if (!sortArrPrice) {
      coinData.sort((a: any, b: any) => b.price_usd - a.price_usd)
    } else {
      coinData.sort((a: any, b: any) => a.price_usd - b.price_usd)
    }
    setSortArrPrice(!sortArrPrice)
  }

  return (
    <>
      <div className='sort'>
        <h3 className='sortArr' onClick={sortArrNumFunc}>
          #<BiSortAlt2 />
        </h3>
        <Typography className='sortArr' variant='h5' onClick={sortArrCoinFunc}>
          Coin
          <BiSortAlt2 />
        </Typography>
        <Typography className='sortArr' variant='h5' onClick={sortArrPriceFunc}>
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
        coinData
          .filter((data: any) => {
            if (inputData.length <= 1) {
              return data
            } else {
              return data.name.toLowerCase().includes(inputData.toLowerCase())
            }
          })
          .map((data: any) => {
            return <Coins data={data} key={data.id} />
          })
      )}
    </>
  )
}

export default CryproNav
