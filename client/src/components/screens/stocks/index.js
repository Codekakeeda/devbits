import React, { useState } from 'react'
import './Stocks.css'
import TitleLineWithButton from '../../common/titleLineWithButton'
import RectangleBox from '../../common/rectangleBox'
import SquareBox from '../../common/squareBox'
import Button from '../../common/button'
import TabOptions from '../../common/tabOptions'
import IndianStockCompanies from '../../../assets/IndianStockCompanies'
import Table from '../../common/table'

const Stocks = () => {
  const dataOfIndex = [
    {
      id: 'NSE:NIFTY50',
      stockName: 'Nifty 50',
      
      value: 23455,
      change: -2145,
      percentage: 0.52,
    },
    {
      id: 'sensex',
      stockName: 'Sensex',
      value: 893455,
      change: -34245,
      percentage: 0.21,
    },
    {
      id: 'bank-nifty',
      stockName: 'Banknifty',
      value: 143455,
      change: -2345,
      percentage: 0.32,
    },
  ]

  const dataOfMostBought = [
    {
      id: 'RELIANCE.NS',
      image: 'https://logowik.com/content/uploads/images/ril-reliance-industries-limited5710.jpg',
      checked: 1,
      stockName: 'Reliance Industries Limited',
      stockPrice: 102.10,
      change: -2.80,
      percentage: 2.67,
    },
    {
      id: 'zomato',
      image: 'https://assets-netstorage.groww.in/stock-assets/logos/GSTK543320.png',
      checked: 1,
      stockName: 'Zomato',
      stockPrice: 50.65,
      change: -2.00,
      percentage: 3.80,
    },
    {
      id: 'vedanta',
      image: 'https://assets-netstorage.groww.in/stock-assets/logos/GSTK500295.png',
      checked: 1,
      stockName: 'Vedanta',
      stockPrice: 269.75,
      change: -1.50,
      percentage: 0.55,
    },
    {
      id: 'yes-bank',
      image: 'https://assets-netstorage.groww.in/stock-assets/logos/GSTK532648.png',
      checked: 0,
      stockName: 'Yes Bank',
      stockPrice: 15.05,
      change: -0.15,
      percentage: 0.99,
    },
  ]


  const [activeTab, setActiveTab] = useState("Stocks");
  return (
    <div>
      <TabOptions activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className='stock-component max-width'>
        <TitleLineWithButton titleName={'Index'} button={true} buttonName={'Screener'} svg={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" height={18} width={18}><path d="M0 0h24v24H0z" fill="none" /><path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z" /></svg>} />
        <RectangleBox items={dataOfIndex} />

        <TitleLineWithButton titleName={'Most Bought on Investify'} />
        <SquareBox items={IndianStockCompanies.slice(0,4)} />

        <TitleLineWithButton seemore={true} titleName={'Top Gainers'} />
        <div className='stock-buttons'>
          <Button active={true} buttonText={'Large'} />
          <Button active={false} buttonText={'Mid'} />
          <Button active={false} buttonText={'Small'} />
        </div>
        <SquareBox className='max-width' items={IndianStockCompanies.slice(4,8)} />

        <TitleLineWithButton button={true} buttonName={'News'} titleName={'Stocks in News'} svg={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" height={18} width={18} className="primaryClr tpm667ChipIcon"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M16 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8l-5-5zM7 7h5v2H7V7zm10 10H7v-2h10v2zm0-4H7v-2h10v2zm-2-4V5l4 4h-4z" /></svg>} />
        <SquareBox className='max-width' items={IndianStockCompanies.slice(8,12)} />

        <TitleLineWithButton seemore={true} titleName={'Top Losers'} />
        <div className='stock-buttons'>
          <Button active={false} buttonText={'Large'} />
          <Button active={false} buttonText={'Mid'} />
          <Button active={true} buttonText={'Small'} />
        </div>
        <SquareBox className='max-width' items={IndianStockCompanies.slice(12,16)} />

        <TitleLineWithButton seemore={true} titleName={'Top by Market Cap'} />
        <Table/>
      </div>
    </div>
  )
}

export default Stocks
