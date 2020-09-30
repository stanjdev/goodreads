import React, { useEffect, useState, useRef } from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import Logo from './goodreads.png';
import { useSelector } from 'react-redux';
import axios from 'axios';
import "./Details.css";
import Comment from '../Comment/Comment';


export default function Details(props) {
  const [ratingOption, setRatingOption] = useState(5);
  const [userComment, setUserComment] = useState("");
  const [goodreads, setGoodReads] = useState();
  const [comments, setComments] = useState([]);
  const location = useLocation();
  const loggedIn = useSelector(state => state.sessionReducer.loggedIn);
  const currentUser = useSelector(state => state.sessionReducer);
  const isMounted = useRef(false);
  
  // console.log(location.state.results);

  useEffect(() => {
    // const abortController = new AbortController();
    // const signal = abortController.signal;
    isMounted.current = true;

    if (isMounted.current) {
      fetchData(); // for GETTING comments and book data
    }

    return function cleanup() {
      // abortController.abort();
      isMounted.current = false;
    };
  })


  const result = {
    isbn: location.state.results.isbn,
    title: location.state.results.title,
    author: location.state.results.author,
    year: location.state.results.year,
    book_id: location.state.results.book_id
  }

  async function fetchData() {
    const response = await fetch(`/details/${location.state.results.book_id}`);
    const data = await response.json();
    // console.log(data)
    setGoodReads(data.result.books[0]);
    setComments(data.comment_list);
  }
  // const fetchData = (signal) => {
  //   fetch(`/details/${location.state.results.book_id}`, {signal: signal})
  //     .then(result => result.json())
  //     .then(data => {
  //       setGoodReads(data.result.books[0])
  //       setComments(data.comment_list)
  //     })
  // }

  const addComment = async () => {
    const userData = {
      name: currentUser.name,
      email: currentUser.email,
      userid: currentUser.userid,
      userRating: ratingOption,
      userComment: userComment
    }
    return await axios.post(`/details/${location.state.results.book_id}`, userData)
      .then(response => {
        if (response.status === 202) alert(response.data)
        // base case that user already commented. handled in the backend with an alert to the frontend on status code 202 again? 
        // on success, render the new comment, rating, and user's first name onto the page.
        else console.log(response)
      })
      .catch(err => console.log(err))
  }

  const handleChangeRating = (e) => {
    setRatingOption(e.target.value);
  }

  const handleChangeComment = (e) => {
    setUserComment(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    addComment();
    fetchData();
  }



  // eslint-disable-next-line no-lone-blocks
  {return loggedIn ? (
      <div className="container">
        <div className="detailsbg row pt-1 rounded-circle col-md-8 col-sm-12"></div>
          <div className="row pt-1 rounded-circle" id="details">
              <div className="col-md-8">
                <div className="row">

                  <div className="col-md-8 col-sm-12 ">
                    <div className="jumbotron">
                      <div className="container">
                        <h1 className="display-4">Book Details</h1>
                        <p className="lead">Title: {result.title}</p>
                        <p className="lead">Author: {result.author}</p>
                        <p className="lead">Year: {result.year}</p>
                        <p className="lead">ISBN: <a href={`https://www.goodreads.com/book/isbn/${result.isbn}`} target="_blank" rel="noopener noreferrer">{result.isbn}</a></p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-4 d-flex align-items-center ratingsInfo">
                    <div className="list-group">
                    <img src={Logo} alt="goodreads logo" className="img-fluid mb-3" style={{ width: 400 }}/>
                      <button type="button" className="btn btn-secondary mb-3">
                        Average Rating: {goodreads ? <span className="badge badge-light">{ goodreads["average_rating"] }</span> : ""}
                      </button>
                      <button type="button" className="btn btn-secondary mb-3">
                        # of Ratings: {goodreads ? <span className="badge badge-light">{ goodreads["ratings_count"]}</span> : ""}
                      </button>
                      {goodreads ? <a href={`https://www.goodreads.com/book/isbn/${result.isbn}`} target="_blank" rel="noopener noreferrer"><button type="button" className="btn btn-secondary mb-3" > GoodReads Page Link </button> </a>: ""}
                    </div>
                  </div>
                </div>

                <h3>Comments</h3>

                {comments.length > 0 ? comments.map((comment, idx) => {
                    return (
                      <Comment comment={comment} key={idx}/>
                    )
                }) : null}

                <hr></hr>

                <form onSubmit={handleSubmit} method="post">
                  <div className="form-group">
                    <label htmlFor="Rating">Rating</label>
                    <select value={ratingOption} className="form-control" id="Rating" name="rating" onChange={handleChangeRating}>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="Comments">Comments</label>
                    <textarea className="form-control" id="Comments" rows="8" name="comments" required onChange={handleChangeComment}></textarea>
                  </div>
                  <div className="form-group">
                      <button type="submit" className="btn btn-primary">Post</button>
                  </div>
                </form>
              </div>
           

            </div>
        </div>
  ) : <Redirect to={{ pathname: "/login" }} />};
}