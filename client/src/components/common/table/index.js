import React, { useState } from 'react';
import './table.css';
import ApexChart from '../reactChart';
import { Link } from 'react-router-dom';
import IndianStockCompanies from '../../../assets/IndianStockCompanies';

const Table = () => {

    const svg = [
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" height={26} width={26} ><path d="M0 0h24v24H0z" fill="none" /><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg>,
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" height={26} width={26} ><path d="M0 0h24v24H0z" fill="none" /><path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" /></svg>,
    ];

    const [companies, setCompanies] = useState(IndianStockCompanies.slice(0, 5));

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
        <div className="table-wrapper">
            <div className='table'>
                <div className="title-row table-header">
                    <div>Company Name</div>
                    <div>Stock Chart</div>
                    <div>Market Price</div>
                    <div>Watchlist</div>
                </div>
                {companies.map((company) => (
                    <div className="row" key={company.symbol}>
                        <Link to={`${company.region}/${company.symbol}`} className="cell">{company.name}</Link>
                        <div className="cell chart-cell">
                            <ApexChart />
                        </div>
                        <div className="cell">
                            <div className='cell-price'>₹{company.price}</div>

                        </div>
                        <div className="cell">
                            <button onClick={() => handleWatchlistToggle(company.symbol)}>
                                {company.watchlisted ? svg[0] : svg[1]}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Table;
