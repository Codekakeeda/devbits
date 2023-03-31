import React, { useState,useEffect } from 'react'
import TabOptions from '../../common/tabOptions';
import TitleLineWithButton from '../../common/titleLineWithButton';
import SquareBox from '../../common/squareBox';

const Crypto = () => {
  const [cryptodata, setdata] = useState([]);
  const fetchdata = async () => {
    let url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";
    const data = await fetch(url);
    const parsedata = await data.json();
    console.log(parsedata);
    setdata(parsedata);
  }
  useEffect(() => {
    fetchdata();
  }, [])

  const [activeTab, setActiveTab] = useState("Crypto");
  return (
    <div>
      <TabOptions activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className='stock-component max-width'>
      <TitleLineWithButton titleName={'Popular Funds'} button={true} buttonName={'Screener'} svg={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" height={18} width={18}><path d="M0 0h24v24H0z" fill="none" /><path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z" /></svg>} />
        <SquareBox items={cryptodata} />

      </div>
    </div>
  )
}

export default Crypto
