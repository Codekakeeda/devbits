import React, { useState } from 'react'
import './SquareBox.css'
import { Link } from 'react-router-dom'

const SquareBox = ({ items }) => {
    const svg = [
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" height={26} width={26} ><path d="M0 0h24v24H0z" fill="none" /><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg>,
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" height={26} width={26} ><path d="M0 0h24v24H0z" fill="none" /><path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" /></svg>,
    ];

    const [companies, setCompanies] = useState(items);
    const handleWatchlistToggle = (companyId) => {
        setCompanies((prevCompanies) => {
            return prevCompanies.map((company) => {
                if (company.symbol === companyId) {
                    return {
                        ...company,
                        watchlisted: !company.watchlisted,
                    };
                }
                return company;
            });
        });
    };

    return (
        <div className="square-container">
            <div className="square">
                {(items).map((item, index) => (
                    <div key={index} className="square-item">
                        <div>
                            <div className='image-button-wrapper'>
                                <Link to={`${(item.name)}/${item.symbol}`} className='image-wrapper'>
                                    {item.image.length  ? <img className='image' src={item.image} alt="" />: ''}
                                </Link>
                                {
                                    <button className='add-btn' onClick={() => handleWatchlistToggle(item.symbol)}>
                                        {/* {item.watchlisted ? svg[0] : svg[1]} */}
                                        </button>
                                }
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
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SquareBox
