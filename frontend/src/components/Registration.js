import React, { useState } from "react";
import '../index.css';
import './registration.css'
import axios from 'axios'
import swal from 'sweetalert';

const Register = () => {
    const [values, setValues] = useState(
        Object.assign({
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
        })
    )
    const [errors, setErrors] = useState(
        Object.assign({
            name: "",
            email: "",
            password: "",
            confirmPassword: ""

        })
    )
    const handleChange = (e) => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value,

        })
    }

    const handleSubmit = () => {
        let name = '';
        let email = '';
        let password = '';
        let confirmPassword = '';
        const emailFormat = /\S+@\S+\.\S+/;
        let nameFormat = /^[A-Za-z]+/
        if (values.name === "") {
            name = "Enter your Name"
        }
        if (values.name && !nameFormat.test(values.name)) {
            name = "Invalid Name"
        }

        if (values.name && values.name.length < 3) {
            name = "Name contains 3 or more characters "
        }

        if (values.email === "") {
            email = "Enter your Email"
        }

        if (values.email && !emailFormat.test(values.email)) {
            email = 'Invalid email'
        }

        if (values.password === "") {
            password = "Enter your password"
        }

        if (values.password && values.password.length < 6) {
            password = "Required minimum 6 character "
        }

        if (values.confirmPassword === "") {
            confirmPassword = "Re-enter your password"
        }

        if (values.confirmPassword && values.password.confirmPassword < 6) {
            confirmPassword = "Required minimum 6 character "
        }

        if (values.password !== values.confirmPassword) {
            confirmPassword = "password does not match "
        }

        setErrors({
            name,
            email,
            password,
            confirmPassword
        })
        if (name === '' && email === '' && password === '' && confirmPassword === '') {
            axios({
                method: 'post',
                url: 'http://127.0.0.1:5000/register',
                data: values
            }).then((resp) => {
                swal({ text: resp.data.message, showCancelButton: true }).then(function () { window.location = "http://localhost:3000/login"; });
            }).catch((e) => {
                if (e.response.status === 409) {
                    swal({ text: "User is already exists" })
                }
            })

        }
    }

        return (
            <div className="main-div">
                <div className="register-div">
                    <div className="register-heading">
                        <h2>Register</h2>
                    </div>
                    <div className="email-div">
                        <input name="name" type="text" placeholder="Name" className="email-field" value={values.name} onChange={(e) => handleChange(e)} />
                        <div>{errors.name ? <label style={{ color: 'red' }}>{errors.name}</label> : null}</div>
                    </div>
                    <div className="email-div">
                        <input name="email" type="text" placeholder="Email" className="email-field" value={values.email} onChange={(e) => handleChange(e)} />
                        <div>{errors.email ? <label style={{ color: 'red' }}>{errors.email}</label> : null}</div>
                    </div>
                    <div className="email-div">
                        <input name="password" type="password" placeholder="Password" className="email-field" value={values.password} onChange={(e) => handleChange(e)} />
                        <div>{errors.password ? <label style={{ color: 'red' }}>{errors.password}</label> : null}</div>
                    </div>
                    <div className="password-div">
                        <input name="confirmPassword" type="password" placeholder="Confirm Password" className="password-field" value={values.confirmPassword} onChange={(e) => handleChange(e)} />
                        <div>{errors.confirmPassword ? <label style={{ color: 'red' }}>{errors.confirmPassword}</label> : null}</div>
                    </div>
                    <div className="registerbutton-div">
                        <button className="registerbutton" onClick={() => handleSubmit()}>Register</button>                </div>
                    <div className="goback-link">
                        <a href="/">Go back!</a>
                    </div>
                </div>
            </div>
        )
    }
    export default Register;