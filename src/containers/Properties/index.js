import { connect } from "react-redux";
import { queryLocations } from "../../redux/actions/locationsActions";
import { queryProperties } from "../../redux/actions/propertiesActions";
import Properties from "./Properties";
import "./Properties.less";

const mapStateToProps = state => {
  return {
    locations: state.locations,
    properties: state.properties
  };
};

const mapDispatchToProps = dispatch => {
  return {
    queryLocations: () => dispatch(queryLocations()),
    queryProperties: () => dispatch(queryProperties())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Properties);
