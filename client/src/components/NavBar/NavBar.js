import React, {useState} from 'react';
import "./NavBar.css"
import { useSelector, useDispatch } from 'react-redux';
import { logoutAction } from '../redux/sessionReducer';

import icon from '../../imgs/books.png'
import axios from 'axios';

import { NavLink, Redirect } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';


export default function NavBar() {

  const loggedIn = useSelector(state => state.sessionReducer.loggedIn)
  const loggedInUser = useSelector(state => state.sessionReducer.name)
  const dispatch = useDispatch();

  // CREATE A HANDLELOGOUT CLICK FOR EVERY LOGOUT BUTTON ON THE SITE
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logoutAction());
  }
  
  const [searchResults, setSearchResults] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      query: e.target.input_search.value
    }
    e.target.reset();
    return await axios.post('/search', data)
      .then(response => {
        setSearchResults(response.data)
      })
  }


  return (
      <Navbar id="Navbar" collapseOnSelect expand="lg" bg="dark" variant="dark" >
        <NavLink id="brand" to="/" className="animateMe navbar-brand animate__animated animate__lightSpeedInRight" style={{display: 'flex', justifyContent: "center", alignItems: 'center'}}><img src={icon} alt="books icon" style={{height: 26, marginRight: 7}}/> GoodReads Reviews</NavLink>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">

          <Nav className="mr-auto">
          {loggedIn ? 
            <>
              <form className="form-inline my-2 my-lg-0 navSearchBar" onSubmit={handleSubmit} method="POST">
                <input className="form-control mr-sm-2" name="input_search" type="search" placeholder="Search" aria-label="Search"></input>
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
              </form>

              {searchResults &&
                <Redirect to={{
                  pathname: "/results",
                  state: {results: searchResults}
                }} />
              }
            </>
          : null }
          </Nav>

          <Nav>
            {loggedIn ? 
            <>
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/search">Search</Nav.Link>

              <li className="nav-item active welcome-lg">
                <span className="nav-link animate__animated animate__lightSpeedInLeft">Welcome, {loggedInUser ? loggedInUser + "!" : "random person!"} </span>
              </li>
              
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            </>
                :
            <li className="nav-item animate__animated animate__lightSpeedInLeft">
              <NavLink to="/register" className="animateMe btn btn-outline-light">Register / Sign Up</NavLink>
            </li>
            }
          </Nav>

        </Navbar.Collapse>
      </Navbar>
  )
};
