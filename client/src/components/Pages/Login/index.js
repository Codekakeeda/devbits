import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {

    const [loginData, setLoginData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = ({ currentTarget: input }) => {
        setLoginData({ ...loginData, [input.name]: input.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const url = "http://localhost:8080/api/auth/login";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(loginData),
            });
            const json = await response.json();
            if (json.isSuccessFulLogin) {
                localStorage.setItem("token", json.authtoken);
                navigate("/explore/stocks");
                console.log("Login Successfull")
              }
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message);
            }
        }
    };


    return (
        <div className='login-form-wrapper'>
            <div className="container">
                <form className='login-form' onSubmit={handleSubmit}>
                    <p className='title'>Login</p>
                    <input
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder='Email'
                        id="email"
                        value={loginData.email}
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        name="password"
                        className="form-control"
                        placeholder='Password'
                        id="password"
                        value={loginData.password}
                        onChange={handleChange}
                    />
                    {error && <div className='error-msg'>{error}</div>}
                    <button type="submit" onClick={handleSubmit}>Login</button>
                </form>
                <div className='bottom'>
                    <Link className='Link' to='/sign-up'>Forgotten password?</Link>
                    <Link className='Link' to='/sign-up'>Create new account</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
