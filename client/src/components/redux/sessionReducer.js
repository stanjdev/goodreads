const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";

// Action Creators
export const loginAction = (name, email, userid) => {
  return {
    type: LOGIN,
    payloadName: name,
    payloadEmail: email,
    payloadUserid: userid
  }
}

export const logoutAction = () => {
  return {
    type: LOGOUT
  }
}

const initialState = {
  loggedIn: false,
  name: "",
  email: "",
  userid: ""
}

export default function sessionReducer(state = initialState, action) {
  switch(action.type) {
    case LOGIN:
      return {
        loggedIn: true, 
        name: action.payloadName,
        email: action.payloadEmail,
        userid: action.payloadUserid
      }
    case LOGOUT:
      localStorage.clear();
      return {
        loggedIn: false, 
        name: "", 
        email: "",
        userid: ""
      }
    default: 
      return state;
  }
}

