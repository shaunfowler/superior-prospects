import { connect } from "react-redux";
import Updates from "./Updates";
import {
  queryUpdates,
  deleteUpdate,
  createUpdate
} from "../../redux/actions/updatesActions";

const mapStateToProps = ({ updates, user }) => {
  return {
    updates,
    isAuthenticated: user.isAuthenticated
  };
};

const mapDispatchToProps = dispatch => {
  return {
    queryUpdates: () => dispatch(queryUpdates()),
    deleteUpdate: id => dispatch(deleteUpdate(id)),
    createUpdate: update => dispatch(createUpdate(update))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Updates);
