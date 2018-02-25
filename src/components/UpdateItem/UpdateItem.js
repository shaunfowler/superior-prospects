import React from "react";
import moment from "moment";
import {
  Avatar,
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
  Notifications as NotificationsIcon,
  Delete as DeleteIcon
} from "material-ui-icons";
import "./UpdateItem.less";

class UpdateItem extends React.Component {
  state = {
    anchorEl: null
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { id, body, created, onDelete, isUserAuthenticated } = this.props;
    const { anchorEl } = this.state;
    return (
      <ListItem className="update-item">
        <Avatar className="update-item__icon">
          <NotificationsIcon />
        </Avatar>
        <ListItemText
          primary={moment(created).format("MMMM D, YYYY")}
          secondary={body}
        />
        {isUserAuthenticated && (
          <ListItemSecondaryAction onClick={event => this.handleClick(event)}>
            <IconButton aria-label="More">
              <MoreVertIcon />
            </IconButton>
          </ListItemSecondaryAction>
        )}

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
      </ListItem>
    );
  }
}
export default UpdateItem;
