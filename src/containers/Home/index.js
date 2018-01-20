import { connect } from "react-redux";
import Home from "./Home";
import {
  queryUpdates,
  deleteUpdate,
  createUpdate
} from "../../redux/actions/updatesActions";
import { queryProperties } from "../../redux/actions/propertiesActions";
import "./Home.scss";

const mapStateToProps = ({ updates, properties, user }) => {
  return {
    updates: updates,
    properties: properties,
    isAuthenticated: user.isAuthenticated
  };
};

const mapDispatchToProps = dispatch => {
  return {
    queryUpdates: () => dispatch(queryUpdates()),
    deleteUpdate: id => dispatch(deleteUpdate(id)),
    createUpdate: update => dispatch(createUpdate(update)),
    queryProperties: () => dispatch(queryProperties())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
