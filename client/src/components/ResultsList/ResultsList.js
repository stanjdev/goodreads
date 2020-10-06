/* eslint-disable no-lone-blocks */
import React from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import "./ResultsList.css";
import Book from '../Book/Book';

export default function ResultsList() {

  const location = useLocation();
  // console.log(location.state.results[0].author)
  // console.log(location.state)
  const loggedIn = useSelector(state => state.sessionReducer.loggedIn);


  {return loggedIn ? (
      <div>
        <h1>Results</h1>
        <div className="container resultsContainer">
          <div className="row">
            <div className="col-md-6 col-12">
              <table className="table table-hover .list">
                <thead>
                  <tr>
                    <th className="isbnCol" scope="col">ISBN</th>
                    <th scope="col">Title</th>
                    <th scope="col">Author</th>
                    <th scope="col">Year</th>
                    <th scope="col">Details</th>
                  </tr>
                </thead>
                <tbody>

                  {
                    location.state ? 
                    (location.state.results.length < 1 ? 
                    <tr style={{ color: "crimson", marginTop: "1em", fontWeight: 'bold', textTransform: "uppercase"}}><td>No results found!</td></tr> 
                    : location.state.results.map(book => {
                      return <Book book={book} key={book.isbn}/>
                    }))
                    : <Redirect to={{pathname: "/search"}}/>
                  }

                </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  ) : <Redirect to={{ pathname: "/login" }} />}
}