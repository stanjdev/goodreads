import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import NavBar from '../src/components/NavBar/NavBar';
import HomePage from './components/HomePage/HomePage';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import ResultsList from './components/ResultsList/ResultsList';
import Error from './components/Error/Error';
import Search from './components/Search/Search';
import Details from './components/Details/Details';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

export default function App() {
 
  return (
    <Router>
      <header>
        <NavBar />
      </header>
      <div>
        <Switch>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          {/* <Route exact path="/details/:book_id/:user_id/:review_id" >
            <Details />
          </Route> */}
          {/* <Route exact path="/details/:book_id/:user_id" >
            <Details />
          </Route> */}
          <Route path="/details/:book_id" >
            <Details />
          </Route>
          {/* <Route exact path="/details/" >
            <Details />
          </Route> */}
          <Route path="/results" >
            <ResultsList />
          </Route>
          <Route exact path="/search">
            <Search />
          </Route>
          <Route exact path="/error">
            <Error />
          </Route>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="">
            <Error />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}