import React, { useState } from 'react';
import axios from "axios";
import swal from "sweetalert"
import '../index.css';
import './users.css'
import { MDBBtn } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';

const AddTodoItem = (id) => {
    const navigate = useNavigate();

    const [values, setValues] = useState(
        Object.assign({
            name: '',
            date: '',
            id: id.id
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
        let name = '';
        let date = '';
        const nameFormat = /^[A-Za-z]+/
        if (values.name == '') {
            name = 'Add a Todo List'
        }
        if (values.name && !nameFormat.test(values.name)) {
            name = "Invalid Name"
        }
        if (values.date == '') {
            date = 'Select a date'
        }
        setErrors({
            name,
            date,
        })
        if (name == "" && date == "") {
            axios({
                method: 'post',
                url: 'http://127.0.0.1:5000/task',
                data: values,
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("accessToken")
                }
            }).then((resp) => {
                if (resp.data.message) {
                    swal({ text: resp.data.message, icon: "success", closeModal: true }).then(() => navigate(`/users/${id.listDetails.username}/todolists/${id.listDetails.name}`));
                    id.tasks()
                    id.closeModal()


                }

            }).catch((e) => {
                if (e.response.status == 409) {
                    swal({ text: "Task already exist this date", icon: "warning" });
                }
                if (e.response.status == 422) {
                    swal({ text: "Date must not be in past ", icon: "warning" });
                }
            })
        }

    }

    return (
        <div className="modal-main">
            <div className="todolist-heading">
                <h2>Add a Todo Item</h2>
            </div>
            <div className="addtodo-div">
                <input className="addtodo-field"
                    name="name"
                    type="text"
                    value={values.name}
                    onChange={(e) => { handleChange(e) }}
                    placeholder="Add a task"
                />
            </div>
            <div className='errormessage-div'>
                {errors.name ? <label style={{ color: 'red' }}>{errors.name}</label> : null}
            </div>
            <div className='addtodo-div'>
                <span className='endate-span'>End Date</span>
                <input type="date" name="date" placeholder='Date' value={values.date} onChange={(e) => { handleChange(e) }} className='date-field' />
            </div>
            <div className='errormessage-div'>
                {errors.date ? <label style={{ color: 'red' }}>{errors.date}</label> : null}
            </div>
            <div className="todobtn-div">
                <MDBBtn className="addbutton-todolist" onClick={() => handleSubmit()}>Add</MDBBtn>

            </div>
        </div>
    )
}
export default AddTodoItem;