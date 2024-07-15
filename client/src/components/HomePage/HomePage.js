import React from 'react';
// import Button from 'react-bootstrap/Button';
import {NavLink} from 'react-router-dom';
import "./HomePage.css";
import goodreadsIcon from '../../imgs/goodreads_logo_banner.png'

export default function HomePage() {

  return(
    <div className="homePage container mt-5 animate__animated animate__zoomInUp">
      <div className="row">
        <div className="col col-7 my-5">
            <div className="container">
              <img className="bannerlogo" src={goodreadsIcon} width="80%" alt="GoodReads logo banner" />
              
              <h4 id="title" className="display-4">Book Reviews</h4>
              
              <hr className="my-3"></hr>
              <p className="lead">Search for your favorite books by title, author, or ISBN.</p>
              <p>Log in to review and leave ratings!</p>
              <p className="lead">Make sure to enable <a href="https://cors-anywhere.herokuapp.com/corsdemo" target='_blank'>cors-anywhere</a> first!</p>
                <NavLink className="animateMe btn btn-primary btn-lg" to="/login" role="button">Login</NavLink>
            </div>
        </div>
      </div>
    </div>
  )
}