import React, { useEffect, useState } from 'react'
import '../index.css'
import AddIcon from '@mui/icons-material/Add';
import AddTodoItem from './AddTodoItem';
import Modal from 'react-modal';
import axios from 'axios';

const customStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.75)'
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: "#fff",
    height: 'auto',
    width: '30%',
    border: '2px solid black',
    fontSize: '70%',
    WebkitOverflowScrolling: 'touch',
    borderRadius: '20px',
  },
};
const UserContent = ({ taskDetails }) => {
  const [tasks, setTasks] = useState()
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const closeModal = () => (
    setModalIsOpen(false)
  )
  useEffect(() => {
    if (taskDetails && taskDetails.id) {
      getTask()
    }
  }, [taskDetails])

  const finishClick = (id) => {
    axios({
      method: 'patch',
      url: 'http://127.0.0.1:5000/task',
      data: { id },
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken")
      }
    }).then(resp => {
      if (resp.data.status == true) {
        getTask()
      }
    })
  }

  const getTask = () => {
    axios({
      method: 'get',
      url: `http://127.0.0.1:5000/task?id=${taskDetails.id}`,
      headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") }
    }).then(
      resp => {
        setTasks(resp.data.sorted_task)
      }
    )
  }

  const deletetask = (id) => {
    axios({
      method: 'delete',
      url: 'http://127.0.0.1:5000/task',
      data: { id },
      headers: { Authorization: "Bearer " + localStorage.getItem("accessToken") }
    }).then(
      resp => {
        if (resp && resp.data && resp.data.status == true) {
          getTask()
        }
      }
    )
  }
  if (tasks && taskDetails && tasks.length == 0) {
    return (
      <div className='view-todolist'>
        <h2>{taskDetails.name}</h2>
        <div className='usercontent-table-div'>
          <div className="additem-div">
            <h3>Add a Task</h3>
            <div className="additem-btn-div">
              <button className="additem-btn" onClick={() => setModalIsOpen(true)}><AddIcon sx={{ fontSize: 40 }} /></button>
            </div>
          </div>
        </div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}>
          <AddTodoItem id={taskDetails.id} closeModal={closeModal} listDetails={taskDetails} tasks={getTask} />
        </Modal>
      </div>
    )
  }
  else if (tasks) {
    return (
      <div className='align-items-center justify-content-center'>

        <div className="view-todolist">
          <h2>{taskDetails.name}</h2>
          <div className='usercontent-table-div'>
            <div className="additem-div">
              <h3>Add a Task</h3>
              <div className="additem-btn-div">
                <button className="additem-btn" onClick={() => setModalIsOpen(true)}><AddIcon sx={{ fontSize: 40 }} /></button>
              </div>
            </div>
          </div>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}>
            <AddTodoItem id={taskDetails.id} closeModal={closeModal} listDetails={taskDetails} tasks={getTask} />
          </Modal>
          <table className="usercontent-table">
            <tr className='usertable-head'>
              <th >Task Name</th>
              <th >Date</th>
              <th >Action</th>
            </tr>
            {tasks && tasks.map((item, key) => {
              if (item.status == "on progress") {
                return (
                  <tr style={{ backgroundColor: "rgb(160, 158, 158)" }} key={key}>
                    <td>{item.name}</td>
                    <td>{new Date(item.date).toLocaleString().split(",")[0]} </td>
                    <button className="task-delete-btn" onClick={() => (deletetask(item.id))}>Delete</button>
                    <button className="task-finish-btn" onClick={() => (finishClick(item.id))}>Finish</button>
                  </tr>
                )
              }
              else if (item.status == "Finished") {
                return (
                  <tr style={{ textDecoration: "line-through", backgroundColor: "rgb(196, 194, 194)", color: "rgb(112, 111, 111)" }} key={key}>
                    <td>{item.name}</td>
                    <td>{new Date(item.date).toLocaleString().split(",")[0]} </td>
                    <td><button className="task-delete-finish-btn" onClick={() => (deletetask(item.id))}>Delete</button></td>
                  </tr>
                )
              }
              else {
                return (
                  <tr style={{ backgroundColor: "rgb(248, 186, 129)", color: "rgb(233, 120, 15)" }} key={key}>
                    <td>{item.name}</td>
                    <td>{new Date(item.date).toLocaleString().split(",")[0]} </td>
                    <button className="task-pending-delete-btn" onClick={() => (deletetask(item.id))}>Delete</button>
                    <button className="task-pending-finish-btn" onClick={() => (finishClick(item.id))}>Finish</button>
                  </tr>
                )
              }
            })}
          </table>
        </div>
      </div>
    )
  }
  else if (Object.keys(taskDetails).length === 0) {
    return (
      <h4 >Remember the to-do list but don't <br />forget the to-be list.</h4>
    )
  }
}
export default UserContent