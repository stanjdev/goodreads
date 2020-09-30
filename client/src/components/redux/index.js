import { createStore, combineReducers } from 'redux'; // but this is the vanillaJS way? just use react-redux??? 
// import separate reducers if there are many
import sessionReducer from './sessionReducer';


// https://youtu.be/o_Ni4Cqh4XA
function saveToLocalStorage(state) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('currentUser', serializedState)
  } catch (e) {
    console.log(e);
  }
}

function loadFromLocalStorage() {
  try {
    const serializedState = localStorage.getItem('currentUser')
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

const persistedState = loadFromLocalStorage();

const myStore = createStore(
  rootReducer,
  persistedState
);

myStore.subscribe(() => {
  console.log(myStore.getState())
  saveToLocalStorage(myStore.getState());
});

export default myStore;