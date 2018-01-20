import App from "./App";
import { connect } from "react-redux";
import { getUser } from "../../redux/actions/userActions";
import "./App.scss";

const mapStateToProps = ({ user }) => {
  return {
    user: user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUser: () => dispatch(getUser())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
