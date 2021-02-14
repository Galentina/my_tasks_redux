import {applyMiddleware, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import toDoList from './reducers';




const store = createStore(toDoList, composeWithDevTools(applyMiddleware()));

export default store;