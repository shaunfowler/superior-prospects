import React from "react";
import moment from "moment";
import {
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  IconButton,
  Menu,
  MenuItem
} from "material-ui";
import {
  MoreVert as MoreVertIcon,
  Delete as DeleteIcon
} from "material-ui-icons";
import ReactGa from "react-ga";
import "./UpdateItem.less";

const trackUpdateMoreClick = () => {
  ReactGa.event({
    category: "Updates",
    action: "More button click"
  });
};

class UpdateItem extends React.Component {
  state = {
    anchorEl: null
  };

  handleClick = event => {
    trackUpdateMoreClick();
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  renderMenu = () => {
    const { id, onDelete } = this.props;
    const { anchorEl } = this.state;
    return (
      <Menu
        anchorEl={this.state.anchorEl}
        open={Boolean(anchorEl)}
        onClose={this.handleClose}
      >
        <MenuItem
          onClick={event => {
            this.handleClose(event);
            onDelete(id);
          }}
        >
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          <ListItemText inset primary="Delete" />
        </MenuItem>
      </Menu>
    );
  };

  render() {
    const { body, created, isUserAuthenticated } = this.props;
    return (
      <div>
        <ListItem className="update-item">
          <ListItemText
            primary={moment(created).format("MMMM D, YYYY")}
            secondary={body}
          />
          {isUserAuthenticated && (
            <ListItemSecondaryAction
              onClick={event => {
                this.handleClick(event);
              }}
            >
              <IconButton aria-label="More">
                <MoreVertIcon />
              </IconButton>
            </ListItemSecondaryAction>
          )}
        </ListItem>
        {this.renderMenu()}
      </div>
    );
  }
}
export default UpdateItem;
