import { createStore, combineReducers } from 'redux'; // but this is the vanillaJS way? just use react-redux??
// import separate reducers if there are many
import sessionReducer from './sessionReducer';


// https://youtu.be/o_Ni4Cqh4XA
function saveToSessionStorage(state) {
  try {
    const serializedState = JSON.stringify(state);
    sessionStorage.setItem('currentUser', serializedState)
  } catch (e) {
    console.log(e);
  }
}

function loadFromSessionStorage() {
  try {
    const serializedState = sessionStorage.getItem('currentUser')
    if (serializedState === null) return undefined
    return JSON.parse(serializedState);
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

const rootReducer = combineReducers({
  sessionReducer: sessionReducer
});

const persistedState = loadFromSessionStorage();

const myStore = createStore(
  rootReducer,
  persistedState
);

myStore.subscribe(() => {
  saveToSessionStorage(myStore.getState());
});

export default myStore;
