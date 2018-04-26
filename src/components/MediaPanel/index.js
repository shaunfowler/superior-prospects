import { connect } from "react-redux";
import { deleteMedia } from "../../redux/actions/mediaActions";
import MediaPanel from "./MediaPanel";
import "./MediaPanel.less";

export default connect(null, { deleteMedia })(MediaPanel);
