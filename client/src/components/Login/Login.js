import React from 'react';
import FlashMessage from 'react-flash-message';
import { useLocation, Redirect, NavLink } from 'react-router-dom';
import { loginAction } from '../redux/sessionReducer';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import axiosCustom from '../../axiosConfig';

export default function Login() {
  const location = useLocation();
  const loggedIn = useSelector(state => state.sessionReducer.loggedIn);
  const dispatch = useDispatch();

  const handleSubmit = async e => {
    e.preventDefault();
    const data = {
      email: e.target.email.value,
      password: e.target.password.value
    }

    return await axiosCustom.post(`/login`, data)
      .then(response => {
        console.log("Login.js response: ", response)
        if (response.status === 202) {
          alert(response.data)
        } else {
          dispatch(loginAction(response.data.firstname, response.data.email, response.data.userid));
          // dispatch to set login reducer to be true from here? 
        }
      })
      .catch(err => console.log(err))
  }

  return(
    <div>
      {location.state ? 
        <FlashMessage duration={5000}>
          <h5 className="col-md-6 col-sm-12" style={{color: 'lightseagreen', position: 'absolute', left: '-2.5em', marginTop: "0.5em"}}>Registration successful!</h5>
        </FlashMessage> 
      : null}

      <div className="container">
          <div className="row">
              <div className="col-6">
                  <div className="login-form">
                    <h4 className="card-title mb-4 mt-1">Login</h4>
                        <form onSubmit={handleSubmit} method="POST">
                          <div className="form-group">
                            <label>Email</label>
                              <input name="email" className="form-control" placeholder="Email" type="email" required />
                          </div>
                          <div className="form-group">
                            <label>Password</label>
                              <input name="password" className="form-control" placeholder="********" type="password" required />
                          </div> 
                          <div className="form-group">
                          </div>
                          <div className="form-group">
                              <button type="submit" className="btn btn-primary btn-block"> Login  </button>
                          </div>

                          {loggedIn ? <Redirect to={{pathname: "/search", state:{loginSuccessful: "login successful"}}}/> : null}

                          <p className="text-center"><NavLink to="/register" className="">Don't have an account?</NavLink></p>
                        </form>
                    </div>
              </div>
              <div className="col-6"></div>
          </div>
      </div>
    </div>
  )
};
