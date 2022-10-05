import React, { useState, useEffect } from 'react';
import axios from "axios";
import '../index.css';
import swal from 'sweetalert';
import { MDBBtn } from "mdb-react-ui-kit";
import { useNavigate } from 'react-router-dom';


const AddTodoList = (listData) => {
    
    const navigate = useNavigate()
    const [userName, setUserName] = useState([])
    const [todolistName, setTodolistName] = useState([])

    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://127.0.0.1:5000/todolist',
            headers: {
                Authorization: "Bearer " + localStorage.getItem("accessToken")
            }
        }).then(resp => {
            if (resp.data.todolists) {
                setUserName(
                    resp.data.todolists[0].username
                )
                setTodolistName(
                    resp.data.todolists[0].name
                )
            }
        })
    }, [])
    const [values, setValues] = useState(
        Object.assign({
            name: '',
            privacy: '',
        })
    )
    const [errors, setErrors] = useState({})
    const handleChange = (e) => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
    }

    const handleSubmit = () => {
        let name = '';
        let privacy = '';
        const nameFormat = /^[A-Za-z]+/

        if (values.name == '') {
            name = 'Add a Todo List'
        }
        if (values.name && !nameFormat.test(values.name)) {
            name = "Invalid Name"
        }
        if (values.privacy == '') {
            privacy = 'select any options'
        }

        setErrors({
            name,
            privacy,
        })
        if (name == "" && privacy == "") {
            axios({
                method: 'post',
                url: 'http://127.0.0.1:5000/todolist',
                data: values,
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("accessToken")
                }
            }).then((resp) => {
                if (resp.data.message) {
                    swal({ text: resp.data.message, icon: "success", closeModel: false }).then(() => navigate(`/users/${listData.listDetails[0].username}/todolists/${listData.listDetails[0].name}`));
                    listData.listData()
                    listData.closeModal()
                }
            }).catch((e) => {
                if (e.response.status == 409) {
                    swal({ text: "Todo list already exist", icon: "warning", closeModel: false })
                }
            })
        }
    }
    return (
        <div className="modal-main">
            <div className="todolist-heading">
                <h2>Add a Todo List</h2>
            </div>
            <div className="addtodo-div">
                <input className="addtodo-field"
                    name="name"
                    type="text"
                    placeholder="Todo List Name"
                    value={values.name}
                    onChange={(e) => handleChange(e)} />
            </div>
            <div className='errormessage-div'>
                {errors.name ? <label style={{ color: 'red' }}>{errors.name}</label> : null}
            </div>
            <div className="radio-btn-div">
                <label className='privacy-label'>
                    Privacy:
                </label>
                <input type="checkbox"
                    name="privacy"
                    value="private"
                    onChange={(e) => handleChange(e)}
                    className="radiobtn-field" />Private
                <input type="checkbox"
                    name="privacy"
                    value="public"
                    onChange={(e) => handleChange(e)}
                    className="radiobtn-field"
                />Public
            </div>
            <div className='errormessage-div'>
                {errors.privacy ? <label style={{ color: 'red' }}>{errors.privacy}</label> : null}
            </div>
            <div className="todobtn-div">
                <MDBBtn className="addbutton-todolist" onClick={() => handleSubmit()}>Add</MDBBtn>
            </div>
        </div>
    )
}

export default AddTodoList