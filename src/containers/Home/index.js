import { connect } from "react-redux";
import Home from "./Home";
import {
  getUpdates,
  deleteUpdate,
  addUpdate
} from "../../redux/actions/updatesActions";

const mapStateToProps = state => {
  return { updates: state.updates };
};

const mapDispatchToProps = dispatch => {
  return {
    getUpdates: () => dispatch(getUpdates()),
    deleteUpdate: id => dispatch(deleteUpdate(id)),
    addUpdate: update => dispatch(addUpdate(update))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
