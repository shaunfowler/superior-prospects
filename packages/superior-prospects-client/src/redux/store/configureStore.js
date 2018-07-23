import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
import createHistory from "history/createBrowserHistory";
import { routerMiddleware } from "react-router-redux";
import rootReducer from "../reducers";
import routeTrackerMiddleware from "../middleware/routeTrackerMiddleware";

export const history = createHistory();

const initialState = {};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(
  applyMiddleware(
    reduxImmutableStateInvariant(),
    thunk,
    routerMiddleware(history),
    routeTrackerMiddleware
  )
);

const store = createStore(rootReducer, initialState, enhancer);

export default store;
