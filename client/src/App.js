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

function App() {
  /* 
const loggedIn = useSelector(state => state) - state is an object, you can pick and choose which properties you want if it were a big state object. Now you don’t have to use ‘props.state’, just use ‘state’.

const dispatch = useDispatch()
onClick={() => dispatch(logoutAction())}
*/


  // const [errorExists, setErrorExists] = useState();

  // useEffect(() => {
  //   localStorage.setItem('emailInLocalStorage', email);
  // }, [email]);

  // const handleOnchange = (e) => {
  //   setEmail(e.target.value)
  // }

  // const [currentUser, setCurrentUser] = useState(
  //   localStorage.getItem('currentUserInLocalStorage') || 'barnabee'
  // );
  // DON'T NEED THIS localStorage stuff if I'm deciding to use Express backend and SQL database to store loginInfo
  // BUT localStorage for refreshes? 

  // const login = () => {
  //   localStorage.setItem('currentUserInLocalStorage', currentUser);
  // }
  // const logout = () => {
  //   localStorage.setItem('currentUserInLocalStorage', '');
  //   setCurrentUser('');
  // }

  // const renderLogin = () => {
  //   if (!currentUser) {
  //     return <a className="animateMe btn btn-primary btn-lg" href="/login" onClick={login} role="button">Login</a>
  //   } else {
  //     return (
  //       <div>
  //         <Link to={"/users/" + currentUser} className="username">{currentUser}</Link>
  //         <a className="animateMe btn btn-primary btn-lg" href="/login" onClick={logout} role="button">Logout</a>
  //       </div>
  //     )
  //   }
  // }

  // const renderError = () => {
  //   return errorExists ? <Error /> : null;
  // }



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
          <Route exact path="/results" >
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

export default App;
