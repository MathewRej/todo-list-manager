import React from 'react'
import './home.css'
import {
  MDBContainer,
  MDBRow,
  MDBCol,
}
  from 'mdb-react-ui-kit';
import { MDBBtn } from 'mdb-react-ui-kit';

const Home = () => {
  return (
    <MDBContainer fluid className='p-4 background-radial-gradient overflow-hidden home-maindiv'>
      <MDBRow>
        <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>
          <h1 className="my-5 display-3 fw-bold ls-tight px-3 home-heading" style={{ color: 'hsl(218, 81%, 95%)' }}>
            To Do List <br />
            <span style={{ color: 'hsl(218, 81%, 75%)' }}></span>
          </h1>
          <p className='px-3' style={{ color: 'hsl(218, 81%, 85%)' }}>
            <div className='bg-text hover-zoom'>
              <h3 className='todolist-quotes'>One of the secrets of getting <br />more done is to make a <br />TO-DO List every day, <br />keep it visible.</h3>
            </div>
          </p>
        </MDBCol>
        <MDBRow>
          <MDBCol></MDBCol>
          <MDBCol md='4'>
            <div className='signup-login-div'>
              <center>
                <MDBBtn className='signup-button'><a href='/register' className='signuplink'>SignUp</a></MDBBtn>
                <MDBBtn className='signup-button'><a href='/login' className='signuplink'>LogIn</a></MDBBtn>
                <MDBBtn className='signup-guestbutton'><a href='/guest' className='signuplink'>SignIn as a Guest</a></MDBBtn>
              </center>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBRow>
    </MDBContainer>
  )
}
export default Home