import { connect } from "react-redux";
import Property from "./Property";
import {
  getProperty,
  editProperty
} from "../../redux/actions/propertiesActions";
import { createMedia } from "../../redux/actions/mediaActions";
import "./Property.less";

const mapStateToProps = ({ properties, user }) => {
  return {
    selected: properties.selected,
    isAuthenticated: user.isAuthenticated
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getProperty: id => dispatch(getProperty(id)),
    editProperty: property => dispatch(editProperty(property)),
    createMedia: (file, propertyId) => dispatch(createMedia(file, propertyId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Property);
