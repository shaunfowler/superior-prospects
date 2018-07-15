import { LOCATION_CHANGE } from "react-router-redux";
import ReactGA from "react-ga";

const routeTrackerMiddleware = () => next => action => {
  if (action.type === LOCATION_CHANGE) {
    ReactGA.pageview(action.payload.pathname);
  }
  return next(action);
};

export default routeTrackerMiddleware;
