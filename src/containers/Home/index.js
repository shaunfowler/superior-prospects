import { connect } from "react-redux";
import Home from "./Home";
import {
  queryUpdates,
  deleteUpdate,
  createUpdate
} from "../../redux/actions/updatesActions";
import { queryProperties } from "../../redux/actions/propertiesActions";
import { queryLocations } from "../../redux/actions/locationsActions";
import "./Home.less";

const mapStateToProps = ({ updates, locations, properties, user }) => {
  return {
    updates,
    properties,
    locations,
    isAuthenticated: user.isAuthenticated
  };
};

const mapDispatchToProps = dispatch => {
  return {
    queryUpdates: () => dispatch(queryUpdates()),
    deleteUpdate: id => dispatch(deleteUpdate(id)),
    createUpdate: update => dispatch(createUpdate(update)),
    queryProperties: () => dispatch(queryProperties()),
    queryLocations: () => dispatch(queryLocations())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
