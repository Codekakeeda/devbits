import React from 'react';
import './Home.css'
import { Link } from 'react-router-dom';

const Home = () => {

  return (
    <div className='max-width homepage'>
      <section className="hero">
        <h1>Invest in Stocks with Confidence</h1>
        <p>Grow your wealth with our expert advice and tools.</p>
        <Link to='/login'  className='button-homepage'>Get Started</Link>
      </section>
      <section className="features">
        <div className="feature">
          <h2>Invest Anytime, Anywhere</h2>
          <p>Our platform allows you to invest in stocks from anywhere, at any time.</p>
        </div>
        <div className="feature">
          <h2>Easy to Use</h2>
          <p>Our platform is designed to be easy to use, even for beginners.</p>
        </div>
        <div className='last-div'>
          <h2>Ready to Get Started?</h2>
          <Link to='/sign-up' className='button-homepage'>Sign Up Now</Link>
        </div>
      </section>

    </div>
  )
}


export default Home

