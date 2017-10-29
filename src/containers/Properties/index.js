import { connect } from "react-redux";
import { getLocations } from "../../redux/actions/locationsActions";
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
    getLocations: () => dispatch(getLocations()),
    getProperties: () => dispatch(getProperties())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Properties);
