import { connect } from "react-redux";
import Property from "./Property";
import { getProperties } from "../../redux/actions/propertiesActions";
import "./Property.css";

const mapStateToProps = state => {
  return {
    properties: state.properties
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getProperties: () => dispatch(getProperties())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Property);
