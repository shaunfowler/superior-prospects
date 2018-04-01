import React from "react";
import moment from "moment";
import {
  Avatar,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemAvatar,
  ListItemSecondaryAction,
  IconButton,
  Menu,
  MenuItem
} from "material-ui";
import {
  MoreVert as MoreVertIcon,
  Notifications as NotificationsIcon,
  Delete as DeleteIcon,
  Edit as EditIcon
} from "material-ui-icons";
import { blue } from "material-ui/colors";
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
          }}
        >
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          <ListItemText inset primary="Edit" />
        </MenuItem>
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
          <ListItemAvatar>
            <Avatar
              className="update-item__icon"
              style={{ backgroundColor: blue[300] }}
            >
              <NotificationsIcon />
            </Avatar>
          </ListItemAvatar>
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
        </ListItem>
        {this.renderMenu()}
      </div>
    );
  }
}
export default UpdateItem;
