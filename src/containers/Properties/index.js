import { connect } from "react-redux";
import {
  queryLocations,
  createLocation,
  updateLocation
} from "../../redux/actions/locationsActions";
import {
  queryProperties,
  createProperty
} from "../../redux/actions/propertiesActions";
import Properties from "./Properties";
import "./Properties.less";

const mapStateToProps = ({ locations, properties, user }) => {
  return {
    locations,
    properties,
    isAuthenticated: user.isAuthenticated
  };
};

const mapDispatchToProps = dispatch => {
  return {
    queryLocations: () => dispatch(queryLocations()),
    queryProperties: () => dispatch(queryProperties()),
    createLocation: entity => dispatch(createLocation(entity)),
    createProperty: entity => dispatch(createProperty(entity)),
    updateLocation: entity => dispatch(updateLocation(entity))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Properties);
