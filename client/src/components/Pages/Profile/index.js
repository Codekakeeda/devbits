import React from 'react'
import './User.css'

const User = () => {
  return (
    <div className='user-profile-wrapper max-width'>
      <div className='user-profile'>
        <div className='profile-details-wrapper'>
          <h2>Priyansh Sahu</h2>
          <p>Balance: $3453</p>
          <p>Shares Owned: 34</p>
          <p>Portfolio Value: $2334</p>
        </div>

        <div className='user-image-wrapper'>
          <img src="https://i.pinimg.com/originals/cf/cf/44/cfcf44bdb4af4877ae3c98f4d7177993.jpg"
            alt=''
            className='user-image' />
        </div>
      </div>
    </div>
  )
}

export default User
