import React, {useState} from 'react';
import axios from 'axios';
import { Redirect, useLocation } from 'react-router-dom';
import FlashMessage from 'react-flash-message';
import { useSelector } from 'react-redux';
import "./Search.css";

export default function Search() {
  const location = useLocation();
  const [searchResults, setSearchResults] = useState();
  const loggedIn = useSelector(state => state.sessionReducer.loggedIn);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      query: e.target.q.value
    }
    // console.log(data.query)
    return await axios.post('/search', data)
      .then(response => {
        // console.log(response.data)
        setSearchResults(response.data)
      })
      // .then(res => console.log("res received back!", res))
      // .catch(error => console.log(error))
  }
  
  // eslint-disable-next-line no-lone-blocks
  {return loggedIn ? (
      <div className="container animate__animated animate__bounce">
          <div className="row">
              <div className="col-6">

              {location.state ? 
                <FlashMessage duration={5000}>
                  <h5 className="col-md-6 col-sm-12" style={{color: 'lightseagreen', position: 'absolute', top: '0.5em'}}>Login successful!</h5>
                </FlashMessage> 
              : null}

                  <div className="search-form">
                      <form className="justify-content-center" onSubmit={handleSubmit} method="POST">
                        <h2 className="card-title">Search for a Book</h2>
                        <div className="form-group">
                            <input name="q" className="form-control form-control-lg mr-sm-2 mb-2" placeholder="ISBN, title, or author" type="search" required autoFocus></input>
                            <button type="submit" className="btn btn-primary my-2 my-sm-0 btn-lg">Search</button>      
                        </div> 
                      </form>
                      {searchResults &&
                        <Redirect to={{
                            pathname: "/results",
                            state: {results: searchResults}
                        }} />
                      }
                  </div>
              </div>
              <div className="col-6"></div>
          </div>
      </div>
  ) : <Redirect to={{ pathname: "/login"}} /> }
  
}