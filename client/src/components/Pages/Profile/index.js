import React from 'react'
import './User.css'

const User = () => {
  return (
    <div className='user-profile-wrapper max-width'>
      <div className='user-profile'>
        <div className='profile-details-wrapper'>
          <h2>Priyansh Sahu</h2>
          <p>Total Amount : $4498</p>
        </div>

        <div className='user-image-wrapper'>
          <img src="https://as2.ftcdn.net/v2/jpg/01/88/16/11/1000_F_188161181_ECXsk62DZLJR611UniB6oScNJsyZVEdZ.jpg"
            alt=''
            className='user-image' />
        </div>
      </div>
    </div>
  )
}

export default User
