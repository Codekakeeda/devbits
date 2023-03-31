import React, { useState, useEffect } from 'react'
import './User.css'
import Card from '../../common/squareBox/card';
import { Navigate } from 'react-router-dom';

const User = () => {

  const logOut = () => {
    localStorage.removeItem("token");
    Navigate('http://localhost:3000/login')
  };

  const [user, setuser] = useState({});
  const funcuser = async () => {
    const response = await fetch(`http://localhost:8080/api/auth/getuser`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authtoken: JSON.stringify(localStorage.getItem("token")),
      },
    });
    const newuser = await response.json();
    setuser(newuser);
    console.log(user);
  };


  const [boughtst, setboughtst] = useState([]);
  const [boughtcr, setboughtcr] = useState([]);
  const [invest, setinvest] = useState(0);


  const boughtfunc = async () => {
    const response = await fetch(`/api/invest/get`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authtoken: JSON.stringify(localStorage.getItem("token")),
      },
    });
    let parsedata = await response.json();
    let finaldata = Object.values(parsedata.stocks);
    let value = 0;
    finaldata.forEach((element) => {
      value += element.price * element.number;
    });
    setinvest(value);
    let newboughtst = finaldata.filter((stock) => {
      return stock.type === "stock";
    });
    setboughtst(newboughtst);
    let newboughtcr = finaldata.filter((stock) => {
      return stock.type === "crypto";
    });
    setboughtcr(newboughtcr);
  };

  useEffect(() => {
    boughtfunc();
    funcuser();
  }, []);


  return (
    <div className='dashboard'>
      <div className='user-profile-container max-width'>
        <div className='user-profile'>
          <div className='profile-details-wrapper'>
            <h2>{user.name}</h2>
            <p>Email: {user.email}</p>
            <p>Phone: {user.number}</p>
            <p>Balance: ${user.amount}</p>
            <p>Shares Owned: 34</p>
            <p>Portfolio Value: $2334</p>
          </div>
          <div className='rightSide'>
            <div className='user-image-wrapper'>
              <img src="https://i.pinimg.com/originals/cf/cf/44/cfcf44bdb4af4877ae3c98f4d7177993.jpg"
                alt=''
                className='user-image' />
            </div>
            {localStorage.getItem("token") && (
              <button className='button-homepage' onClick={logOut}>Log Out</button>
            )}
          </div>
        </div>
      </div>
      <div className='user-profile-container'>
        {boughtst.length ? (
          boughtst.map((stock, key) => {
            return (
              // stock.type === "stock" && (
              <Card
                item={{
                  name: stock.company,
                  price: stock.price,
                }}
                company={stock.company}
                number={stock.number}
                price={stock.price}
                type={stock.type}
                id={stock._id}
                key={key}
              />
              // )
            );
          })
        ) : (
          <h4>You haven't bought any stocks</h4>
        )}
      </div>
    </div>
  )
}

export default User
