import React, { useState } from 'react'
import "./Navbar.css";
import { Link } from 'react-router-dom';
import IndianStockCompanies from '../../../assets/IndianStockCompanies';

const Navbar = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState(IndianStockCompanies);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = data.filter((item) => {
    return item.name.toLowerCase().includes(searchTerm.toLowerCase());
  });


  return (
    <div className='max-width header'>
      <Link to='/' className='logo'>
        <img className='header-logo-img' src='https://s.tmimgcdn.com/scr/800x500/173000/business-money-exchange-logo-template_173036-original.jpg' alt='logo' />
        <h1 className='header-logo cursor-point'>Investify</h1>
      </Link>

      <div className='header-links'>
        <Link className='header-link' to='/explore/stocks' alt='/'>Explore</Link>
        <Link className='header-link' to='/about-us' alt='/'>About Us</Link>
      </div>

      <div className='header-right'>

        <div className='header-search-container'>
          <div className='header-searchbar'>
            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-search absolute-center search-icon cursor-point" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
            <input placeholder="What are you looking for today?" type="text" value={searchTerm} onChange={handleChange} className='search-input' />
            {searchTerm && <ul className='search-results'>
              {filteredData.length !== 0 && filteredData.slice(0, 10).map((item) => (
                <li key={item.id} className='search-result-wrapper'><Link to={`/explore/stocks/${item.name}/${item.symbol}`} className='search-result'>{item.name}</Link></li>
              ))}
            </ul>
            }
          </div>
        </div>

        <div className='header-icons'>
          <svg xmlns="http://www.w3.org/2000/svg" height={20} fill="currentColor" className="bi bi-bell header-icon" viewBox="0 0 16 16">
            <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
          </svg>

          <svg xmlns="http://www.w3.org/2000/svg" height={20} fill="currentColor" className="bi bi-wallet header-icon" viewBox="0 0 16 16">
            <path d="M0 3a2 2 0 0 1 2-2h13.5a.5.5 0 0 1 0 1H15v2a1 1 0 0 1 1 1v8.5a1.5 1.5 0 0 1-1.5 1.5h-12A2.5 2.5 0 0 1 0 12.5V3zm1 1.732V12.5A1.5 1.5 0 0 0 2.5 14h12a.5.5 0 0 0 .5-.5V5H2a1.99 1.99 0 0 1-1-.268zM1 3a1 1 0 0 0 1 1h12V2H2a1 1 0 0 0-1 1z" />
          </svg>

          <svg xmlns="http://www.w3.org/2000/svg" height={20} fill="currentColor" className="bi bi-cart header-icon" viewBox="0 0 16 16">
            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
          </svg>
        </div>
        {!localStorage.getItem("token") && (
          <Link to='/login' className='button-homepage'>Log In</Link>
        )}
        {localStorage.getItem("token") && (
          <Link to='/user' className='profile-wrapper cursor-point'>
            <img src="https://i.pinimg.com/originals/cf/cf/44/cfcf44bdb4af4877ae3c98f4d7177993.jpg"
              alt="Profile"
              className='header-profile-image' />
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-chevron-down absolute-center profile-options-icon" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
            </svg>
          </Link>
        )}

      </div>
    </div>
  )
}

export default Navbar
