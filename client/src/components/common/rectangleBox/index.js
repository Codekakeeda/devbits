import React from 'react'
import './Box.css'
import { Link } from 'react-router-dom'

const RectangleBox = ({ items }) => {
  return (
    <div className="carousel-container">
      <div className="carousel">
        {items.map((item, index) => (
          <div className="carousel-item">
            <div>
              <h4 className='carousel-title'>{item.stockName}</h4>
              <div className='carousel-data'>
                <h5 className='carousel-values'>{item.value}</h5>
                <h5 className='carousel-values' style={{color:'#EB5B3C'}}>{item.change}</h5>
                <h5 className='carousel-values' style={{color:'#EB5B3C'}}>({item.percentage}%)</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RectangleBox
