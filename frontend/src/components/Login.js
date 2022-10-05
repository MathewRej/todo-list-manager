import React, { useState } from "react";
import '../index.css'
import './login.css'
import axios from 'axios'
import swal from 'sweetalert';
import { useNavigate } from "react-router-dom";



const Login = () => {
    const navigate = useNavigate()
    const [values, setValues] = useState(
        Object.assign({
            email: '',
            password: '',
        })
    )
    const [errors, setErrors] = useState({})
    const handleChange = (e) => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value,
        })
    }
    const handleSubmit = () => {

        let email = ''
        let password = ''
        const emailFormat = /\S+@\S+\.\S+/
        if (values.email === '') {
            email = 'Enter your Email'
        }
        if (values.email && !emailFormat.test(values.email)) {
            email = 'Invalid email'
        }

        if (values.password === '') {
            password = 'Enter your Password'
        }

        setErrors({
            email,
            password,
        });
        if (email === '' && password === '') {
            axios({
                method: 'post',
                url: 'http://127.0.0.1:5000/login',
                data: values
            }).then((resp) => {
                if (resp && resp.status) {
                    localStorage.setItem("accessToken", resp?.data?.accessToken);
                    const userName = resp?.data?.data?.username
                    swal({ text: resp.data.message, icon: "success" }).then(() => navigate(`/users/${userName}/`));
                }
                else {
                    navigate('/')
                }

            }).catch((e) => {
                if (e.response.status === 401) {
                    swal({ text: "Invalid Email or Password", icon: "error", closeModal: true })
                }
            })
        }
    }
    return (
        <div className="main-div">
           
            <div className="login-div">
                <div className="login-heading">
                    <h2>Log In</h2>
                </div>
                <div className="email-div">
                    <input name="email" type="text" placeholder="Email" className="email-field" value={values.email} onChange={(e) => handleChange(e)} />
                </div>
                <div className="errormessage-div">
                    {errors.email ? <label style={{ color: 'red' }}>{errors.email}</label> : null}
                </div>
                <div className="password-div">
                    <input name="password" type="password" placeholder="Password" className="password-field" value={values.password} onChange={(e) => handleChange(e)} />
                </div>
                <div className="errormessage-div">
                    {errors.password ? <label style={{ color: 'red' }}>{errors.password}</label> : null}
                </div>
                <div className="loginbutton-div">
                    <button className="loginbutton" onClick={() => handleSubmit()}>Login</button>
                </div>
                <div className="goback-link">
                    <a href="/">Go back!</a>
                </div>
            </div>
        </div>
    )
}
export default Login;   