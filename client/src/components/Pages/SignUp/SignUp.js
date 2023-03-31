import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './SignUp.css';

const SignUp = () => {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        number: "",
        email: "",
        password: "",
    });
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`http://localhost:8080/api/auth/signUp`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const json = await response.json();
            console.log(json);
            if (json.isSuccessFul) {
                localStorage.setItem("token", json.authtoken);
                navigate("/explore/stocks");
                console.log("SignUp Successfull")
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

        // console.log(json);

    };




    return (
        <form className='sign-up-form' onSubmit={handleSubmit}>
            <div className='form-wrapper'>
                <p className='form-title'>Create new account</p>
                <input type="text"
                    placeholder='Name'
                    name="name"
                    className="form-control"
                    onChange={handleChange}
                    value={formData.name}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    className="form-control"
                    name="email"
                    onChange={handleChange}
                    value={formData.email}
                    required
                />
                <input
                    type="number"
                    placeholder="Phone"
                    className="form-control"
                    name="number"
                    onChange={handleChange}
                    value={formData.number}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="form-control"
                    name="password"
                    onChange={handleChange}
                    value={formData.password}
                    required
                />
                {error && <div className='error-msg'>{error}</div>}
                <button type="submit" onClick={handleSubmit}>Sign up</button>
            </div>
        </form>
    );
}

export default SignUp;
