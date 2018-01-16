import { connect } from "react-redux";
import { queryLocations } from "../../redux/actions/locationsActions";
import { getProperties } from "../../redux/actions/propertiesActions";
import Properties from "./Properties";
import "./Properties.css";

const mapStateToProps = state => {
  return {
    locations: state.locations,
    properties: state.properties
  };
};

const mapDispatchToProps = dispatch => {
  return {
    queryLocations: () => dispatch(queryLocations()),
    getProperties: () => dispatch(getProperties())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Properties);
