import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Error() {

  return(
    <div>
      <div class="alert alert-danger" role="alert">
          <p class="mt-3">Page Not Found!</p>  
      </div> 
      <NavLink class="btn btn-primary" to="/" role="button">Go Back</NavLink>
    </div>
  )
}