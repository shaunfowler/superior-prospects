import { connect } from "react-redux";
import Property from "./Property";
import { getProperty } from "../../redux/actions/propertiesActions";
import "./Property.scss";

const mapStateToProps = state => {
  return {
    selected: state.properties.selected
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getProperty: id => dispatch(getProperty(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Property);
