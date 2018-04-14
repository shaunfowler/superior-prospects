import { connect } from "react-redux";
import Property from "./Property";
import {
  getProperty,
  editProperty,
  deleteProperty
} from "../../redux/actions/propertiesActions";
import { queryLocations } from "../../redux/actions/locationsActions";
import { createMedia } from "../../redux/actions/mediaActions";
import "./Property.less";

const getPropertyLocation = (property, locations) => {
  if (!property) {
    return null;
  }

  return locations.list.find(l => l._id === property.locationRefId) || null;
};

const mapStateToProps = ({ properties, user, locations }) => {
  return {
    selected: properties.selected,
    location: getPropertyLocation(properties.selected, locations),
    locations: locations.list,
    isAuthenticated: user.isAuthenticated
  };
};

export default connect(mapStateToProps, {
  getProperty,
  editProperty,
  deleteProperty,
  createMedia,
  queryLocations
})(Property);
