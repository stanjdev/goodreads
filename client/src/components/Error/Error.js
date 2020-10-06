import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Error() {

  return(
    <div>
      <div className="alert alert-danger" role="alert">
          <p className="mt-3">Page Not Found!</p>  
      </div> 
      <NavLink className="btn btn-primary" to="/" role="button">Go Back</NavLink>
    </div>
  )
}