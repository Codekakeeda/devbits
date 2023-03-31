import React from 'react'
import { Link } from 'react-router-dom'

const Card = ({item}) => {
    return (
        <div>
            <div className='image-button-wrapper'>
                <Link to={`${(item.name)}/${item.symbol}`} className='image-wrapper'>
                    {item.image.length ? <img className='image' src={item.image} alt="" /> : ''}
                </Link>
            </div>
            <Link to={`${item.name}/${item.symbol}`} className='square-details'>
                <h5 className='square-title'>{item.name}</h5>
                <h4 className='square-price-sec'>₹{item.price || item.current_price}</h4>

                <div className='square-data'>
                    <h5 className='square-values' style={{ color: '#EB5B3C' }}>{item.price_change_24h.toFixed(3)}</h5>
                    <h5 className='square-values' style={{ color: '#EB5B3C' }}>({item.price_change_percentage_24h.toFixed(3)}%)</h5>
                </div>
            </Link>
        </div>
    )
}

export default Card
