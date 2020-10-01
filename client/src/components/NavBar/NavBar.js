import React, {useState} from 'react';
import "./NavBar.css"
import { useSelector, useDispatch } from 'react-redux';
import { logoutAction } from '../redux/sessionReducer';

import axios from 'axios';
import icon from '../../imgs/books.png'

import { NavLink, Redirect } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';


const NavBar = () => {

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
    // console.log(data.query)
    e.target.reset();
    return await axios.post('/search', data)
      .then(response => {
        // console.log(response.data)
        setSearchResults(response.data)
      })
      // .then(res => console.log("res received back!", res))
      // .catch(error => console.log(error))
  }


  return (
      <Navbar id="Navbar" collapseOnSelect expand="lg" bg="dark" variant="dark" >
        <NavLink id="brand" to="/" className="animateMe navbar-brand animate__animated animate__lightSpeedInRight" style={{display: 'flex', justifyContent: "center", alignItems: 'center'}}><img src={icon} alt="books icon" style={{height: 26, marginRight: 7}}/> GoodReads Reviews</NavLink>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">

          <Nav className="mr-auto">
          {loggedIn ? 
            <>
              {/* <Nav.Link href="#features">Features</Nav.Link>
              <Nav.Link href="#pricing">Pricing</Nav.Link> */}

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
              
              {/* <NavDropdown title="Menu" id="collasible-nav-dropdown">
                <NavDropdown.Item><NavLink to="/">Home</NavLink></NavDropdown.Item>
                <NavDropdown.Item><NavLink to="/search">Search</NavLink></NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown> */}

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

}


export default NavBar;



/*  OLD BOOTSTRAP NAV MENU BAR
<nav className="navbar navbar-expand-lg navbar-light bg-light">
                  <div className="container">
                      

                      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                          <span className="navbar-toggler-icon"></span>
                      </button>
              
                  <div className="collapse navbar-collapse" id="navbarSupportedContent">
                      <ul className="navbar-nav ml-auto">

                        { loggedIn ? 

                          <div>
                              <li className="nav-item active welcome-lg">
                                  <h6 className="nav-link animate__animated animate__lightSpeedInLeft">Welcome, {loggedInUser ? loggedInUser + "!" : "random person!"} </h6>
                              </li>
                            
                              <DropdownButton id="dropdown-item-button" title="Menu">
                                <Dropdown.Item as="button" href="/"><NavLink to="/">Home</NavLink></Dropdown.Item>
                                <Dropdown.Item as="button"><NavLink to="/search">Search</NavLink></Dropdown.Item>
                                <div className="dropdown-divider"></div>
                                <Dropdown.Item as="button" onClick={handleLogout}>Logout</Dropdown.Item>
                              </DropdownButton>

                              <div className="menu-sm">
                                  <div className="dropdown-menu " aria-labelledby="navbarDropdown">
                                      <a className="btn mr-2 dropdown-item" href="/">Home <span className="sr-only ">(current)</span></a>
                                      <a className="btn mr-2 dropdown-item" href="/search" role="button">Search</a>
                                      <a className="dropdown-item" href="/">Home</a>
                                      <a className="dropdown-item" href="/search">Search</a>
                                  <div className="dropdown-divider"></div>
                                      <button className="dropdown-item btn btn-outline-dark nav-link float-right " onClick={handleLogout}>Logout</button>
                                  </div>
                              </div> 
                            
                                <form className="logout" onSubmit={handleLogout}>
                                    <button type="submit" className="animateMe btn btn-outline-dark">Log Out</button>
                                </form>
                                <form className="form-inline my-2 my-lg-0 " onSubmit={handleSubmit} method="POST">
                                    <input className="form-control mr-sm-2" name="input_search" type="search" placeholder="Search" aria-label="Search"></input>
                                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                                </form>

                                {searchResults &&
                                  <Redirect to={{
                                    pathname: "/results",
                                    state: {results: searchResults}
                                  }} />
                                }

                          </div>

                              : 

                              <li className="nav-item animate__animated animate__lightSpeedInLeft">
                                  <NavLink to="/register" className="animateMe btn btn-outline-dark">Register / Sign Up</NavLink>
                              </li>

                        }
                      </ul>
                  </div>

                </div>
              </nav>

*/