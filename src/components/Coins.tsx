import { motion } from 'framer-motion'
import { Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const Coins: React.FC<{ data: any }> = ({ data }) => {
  const navigate = useNavigate()
  return (
    <motion.div
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      exit={{ scaleY: 0 }}
      key={data.id}
      className='cryptoBar'
    >
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
          +data.percent_change_1h < 0 ? { color: 'red' } : { color: 'green' }
        }
      >
        {data.percent_change_1h + '%'}
      </p>
      <p
        style={
          +data.percent_change_24h < 0 ? { color: 'red' } : { color: 'green' }
        }
      >
        {data.percent_change_24h + '%'}
      </p>
      <p
        style={
          +data.percent_change_7d < 0 ? { color: 'red' } : { color: 'green' }
        }
      >
        {data.percent_change_7d + '%'}
      </p>
      <p>{'$' + data.market_cap_usd}</p>
      <p>{'$' + data.volume24}</p>
    </motion.div>
  )
}

export default Coins
