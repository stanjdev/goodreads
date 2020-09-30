import React from 'react';

export default function Error() {

  return(
    <div>
      <div class="alert alert-danger" role="alert">
          <p class="mt-3">Return and try again!</p>  
      </div> 
      <a class="btn btn-primary" href="/" role="button">Go Back</a>
    </div>
  )
}