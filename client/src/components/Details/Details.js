import React, { useEffect, useState, useRef } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import Logo from './goodreads.png';
import { useSelector } from 'react-redux';
import axios from 'axios';
import "./Details.css";
import Comment from '../Comment/Comment';

import { useHistory } from 'react-router';


const apiKey = process.env.REACT_APP_GOODREADS_APIKEY;

export default function Details() {
  const history = useHistory();
  const [ratingOption, setRatingOption] = useState(5);
  const [userComment, setUserComment] = useState("");
  const [goodreads, setGoodReads] = useState();
  const [bookInfo, setBookInfo] = useState({});
  const [comments, setComments] = useState([]);
  // let location = useLocation();
  const loggedIn = useSelector(state => state.sessionReducer.loggedIn);
  const currentUser = useSelector(state => state.sessionReducer);
  const isMounted = useRef(false);
  
  // console.log(bookInfo)

  // if (!location.state) {
  //   location = {state: {results: "default"}}
  // }

  // const result = {
  //   isbn: location.state.results.isbn,
  //   title: location.state.results.title,
  //   author: location.state.results.author,
  //   year: location.state.results.year,
  //   book_id: location.state.results.book_id
  // }

  // https://reactrouter.com/web/example/url-params
  const { book_id } = useParams();
  // console.log(book_id);

  useEffect(() => {
    // const abortController = new AbortController();
    // const signal = abortController.signal;
    // if (/\D/gi.test(book_id)) {
    //   alert("BookID must be an integer only!");
    //   window.location = "/search";
    // }
    
    isMounted.current = true;

    if (isMounted.current && loggedIn) {
      fetchData(); // for GETTING comments and book data
      // console.log(bookInfo)
    }

    return function cleanup() {
      // abortController.abort();
      isMounted.current = false;
    };
  }, []);


// OG backend fetch for GoodReads + psql
  async function fetchData() {
    // const response = await fetch(`/details/${location.state.results.book_id}`);
    const response = await axios.get(`/details/${book_id}`);
    if (response.headers.error) {
      console.log(response.headers.error)
      alert(response.headers.error)
      window.location = "/search"
    }
    // console.log(response.headers.error);
    // console.log(JSON.parse(response.headers.bookinfo));
    // console.log(JSON.parse(response.headers.result));
    // if (response.headers.comment_list) console.log(JSON.parse(response.headers.comment_list));

    // const data = await response.json();
    // console.log(data);
    // // console.log(data.bookInfo);
    if (response.headers.comment_list) setComments(JSON.parse(response.headers.comment_list));
    if (response.headers.result) setGoodReads(JSON.parse(response.headers.result));
    if (response.headers.bookinfo) setBookInfo(JSON.parse(response.headers.bookinfo));

  }

  // async function fetchData() {
  //   const response = await fetch(`https://cors-anywhere.herokuapp.com/https://www.goodreads.com/book/review_counts.json?isbns=${""}&key=${apiKey}`)
  //   const data = await response.json();
  //   console.log(data);
  //   setGoodReads(data.books[0]);
  // }
  
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
    const commentAdd = await axios.post(`/details/${book_id}`, userData)
      .then(response => {
        if (response.status === 202) alert(response.data)
        // base case that user already commented. handled in the backend with an alert to the frontend on status code 202 again? 
        // on success, render the new comment, rating, and user's first name onto the page.
        else {
          console.log(response)
          history.go(0);
          // window.location = `/details/${book_id}`;
        }
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
  }

  // console.log(comments)

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
                        <p className="lead">Title: {bookInfo ? bookInfo.title : ""}</p>
                        <p className="lead">Author: {bookInfo ? bookInfo.author: ""}</p>
                        <p className="lead">Year: {bookInfo ? bookInfo.year: ""}</p>
                        <p className="lead">ISBN: {bookInfo ? <a href={`https://www.goodreads.com/book/isbn/${bookInfo.isbn}`} target="_blank" rel="noopener noreferrer">{bookInfo.isbn}</a> : "" }</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-4 d-flex align-items-center ratingsInfo">
                    <div className="list-group">
                    <img src={Logo} alt="goodreads logo" className="img-fluid mb-3 goodreads_logo" style={{ width: 400 }}/>
                      <button type="button" className="btn btn-secondary mb-3">
                        Average Rating: {goodreads ? <span className="badge badge-light">{ goodreads["average_rating"] }</span> : ""}
                      </button>
                      <button type="button" className="btn btn-secondary mb-3">
                        # of Ratings: {goodreads ? <span className="badge badge-light">{ goodreads["work_ratings_count"]}</span> : ""}
                      </button>
                      {goodreads && bookInfo ? <button type="button" className="btn btn-secondary"><a style={{color: "white"}} href={`https://www.goodreads.com/book/isbn/${bookInfo.isbn}`} target="_blank" rel="noopener noreferrer"> GoodReads Page Link  </a></button> : ""}
                    </div>
                  </div>
                </div>

                <h3 className="reviews_title">Reviews</h3>

                {comments.length > 0 ? comments.map((comment) => {
                    return (
                      <Comment comment={comment} key={comment.userid} userid={comment.userid} bookid={comment.book_id}/>
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