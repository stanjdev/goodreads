import React, { useState } from 'react';
import axios from 'axios';
import { Redirect, NavLink } from 'react-router-dom';

export default function Register() {
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      email: e.target.email.value,
      password: e.target.password.value,
      passwordAgain: e.target.passwordAgain.value
    }
    if (data.password !== data.passwordAgain) {
      alert("passwords don't match! (from Register.js React Client side)")
      return;
    }
    return await axios.post('/register', data)
      .then(response => {
        if (response.status === 202) {
          alert(response.data)
        } else {
          // console.log(response)
          setSuccess(true);
        }
      })
      .catch(err => console.log(err))
  }

  // useEffect(() => {
  //   console.log(success)  
  // }, [success])

  return(
      <div className="container">
          <div className="row">
              <div className="col-6">
                <div className="register-form">
                  <h4 className="card-title mb-4 mt-1">Sign Up</h4>
                      <form onSubmit={handleSubmit} method="POST">
                        <div className="form-group">
                          <label>First Name</label>
                            <input name="firstName" className="form-control" placeholder="First" autoFocus type="text" required></input>
                        </div> 
                        <div className="form-group">
                          <label>Last Name</label>
                            <input name="lastName" className="form-control" placeholder="Last" type="text" required></input>
                        </div> 
                        <div className="form-group">
                          <label>Email</label>
                            <input name="email" className="form-control" placeholder="email@" type="email" required></input>
                        </div> 
                        {/* <div className="form-group">
                          <label>Username</label>
                            <input name="username" className="form-control" placeholder="username" autocomplete="off" type="username" required></input>
                        </div> */}
                        <div className="form-group">
                          <label>Choose password</label>
                            <input name="password" className="form-control" placeholder="******" type="password" required></input>
                        </div> 
                        <div className="form-group">
                          <label>Confirm password</label>
                            <input name="passwordAgain" className="form-control" placeholder="******" type="password" required></input>
                        </div> 
                        <div className="form-group">
                        </div> 
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary btn-block"> Create </button>
                            {success ? <Redirect to={{pathname: "/login", state: {redirectSuccess: "successful!"}}} /> : null}
                        </div> 
                        <p className="text-center"><NavLink to="/login" className="">Already have an account?</NavLink></p>
                      </form>
                  </div>
                </div>
              <div className="col-6"></div>
          </div>
      </div>
  )
}