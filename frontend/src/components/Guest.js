import React, { useState, useEffect } from "react";
import '../index.css'
import './guest.css'
import axios from "axios";
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import PersonIcon from '@mui/icons-material/Person';
import { MDBCollapse, MDBBtn } from 'mdb-react-ui-kit';
import HomeIcon from '@mui/icons-material/Home';

const Guest = () => {

    const [data, setData] = useState([])
    const [toggle, setToggle] = useState({});

    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://127.0.0.1:5000/guest'
        }).then(resp => {
            setData(resp.data.public)
            const toggleData = {}
            setToggle(() => {
                resp.data.public.forEach((item) => {
                    toggleData[item.id] = false
                })
                return toggleData
            })
        })
    }, [])

    function toggleShow(id) {
        setToggle({
            ...toggle,
            [id]: !toggle[id],
        });
    }

    return (
        <div class="container-fluid userpage">
            <div class="row g-0 navbar-div">
                <div class="col-sm-10 col-md-10 navbar-content">
                    <div className="todoicon-div"><PlaylistAddCheckIcon color="primary" sx={{ fontSize: 40 }} /></div>
                    <h1>Todo List</h1>
                </div>
                <div class="col-2 col-md-2 navbar-user-content">
                    <div className="usericon-div">
                        <div className="usericon-btn">
                            <AccountCircleIcon color="primary" sx={{ fontSize: 30 }} />
                        </div>

                        <div class="dropdown">
                            <button class="dropbtn"><ArrowDropDownIcon sx={{ fontSize: 30 }} /></button>
                            <div class="dropdown-content dropdown-div">
                                <a ><PersonIcon /> <span>Guest</span></a>
                                <a href='/'><HomeIcon sx={{ fontSize: 30 }} />Home</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="userpage-div">
                <div className="sidebar-div">
                    <div className="guest-heading-div"><h3>Guest</h3></div>
                    <div className="addtodolist-div">
                        <h4> Welcome</h4>
                    </div>
                    <div className="guestsidebar">
                        <p> Guest users can only  view <br /> public lists.</p>
                    </div>
                    <div className="guest-register-div">
                        <p> You can register as a user <br /> and add todolists.</p>
                        <h6 className="guest-register-link-div">Don't have an accout?</h6>
                        <div className="guest-register-link-div"><a className="guest-register-link" href="/register">Register</a></div>
                    </div>
                </div>
                <div className="content-div">
                    <center><h1>Public TodoLists</h1></center>
                    <div className="container table-div">
                        <table class="table ">
                            <thead>
                                <tr>
                                    <th>Todo List</th>
                                    <th>User</th>
                                    <th>Tasks</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((todolist, key) =>
                                    <tr key={key}>
                                        <td>{todolist.name}</td>
                                        <td>{todolist.username}</td>
                                        <td><MDBBtn onClick={() => { toggleShow(todolist.id) }}>{`${todolist.tasks.length} Tasks`}</MDBBtn>
                                            <MDBCollapse show={toggle[todolist.id]}>
                                                {todolist.tasks.map((item, index) => {
                                                    return (<ul>{item}</ul>)
                                                })}
                                            </MDBCollapse>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Guest;
