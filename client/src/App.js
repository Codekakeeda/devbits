import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './components/common/Navbar/Navbar'
import Home from './components/Pages/Home/Home'
import User from './components/Pages/Profile'
import Stocks from './components/screens/stocks'
import UsStocks from './components/screens/usStocks'
import StockDetails from './components/Pages/StockDetails'
import Login from './components/Pages/Login'
import Footer from './components/common/Footer'
import SignUp from './components/Pages/SignUp/SignUp'
import Crypto from './components/screens/crypto'
import About from './components/Pages/About'


const App = () => {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/user' element={<User />} />
        <Route path='/about-us' element={<About />} />
        <Route path='/login' element={<Login />} />
        <Route path='/sign-up' element={<SignUp />} />


        <Route path='/explore/stocks' element={<Stocks />} />
        <Route path='/explore/crypto' element={<Crypto />} />
        <Route path='/explore/us-stocks' element={<UsStocks />} />

        <Route path='/explore/:activeTab/:name/:id' element={<StockDetails />} />
      </Routes>
      <Footer />
    </Router>
  )
}


export default App
