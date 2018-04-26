import React from "react";
import moment from "moment";
import Dropzone from "react-dropzone";
import ReactGA from "react-ga";
import fileTypeToIcon from "../../utils/fileTypeToIcon";
import {
  Avatar,
  List,
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
  Delete as DeleteIcon,
  FileUpload as FileUploadIcon
} from "material-ui-icons";
import { ListItemAvatar } from "material-ui";

const stripFileExtension = filename =>
  filename.substring(0, filename.lastIndexOf("."));

const formatMediaDate = date => moment(date).format("MMMM Do YYYY");

const trackMediaClick = fileName => {
  ReactGA.event({
    category: "Media",
    action: "Open media item",
    label: fileName
  });
};

const trackMediaMoreClick = () => {
  ReactGA.event({
    category: "Media",
    action: "Media 'more' button click"
  });
};

const trackDeleteMedia = () => {
  ReactGA.event({
    category: "Media",
    action: "Delete media item"
  });
};

class MediaPanel extends React.Component {
  state = {
    anchorEl: null
  };

  openMenu = event => {
    trackMediaMoreClick();
    this.setState({ anchorEl: event.currentTarget });
  };

  closeMenu = () => {
    this.setState({ anchorEl: null, selectedMediaId: null });
  };

  renderMenu = () => {
    const { deleteMedia } = this.props;
    const { selectedMediaId } = this.state;
    const { anchorEl } = this.state;
    return (
      <Menu
        anchorEl={this.state.anchorEl}
        open={Boolean(anchorEl)}
        onClose={this.closeMenu}
      >
        <MenuItem
          onClick={event => {
            this.closeMenu(event);
            deleteMedia(selectedMediaId);
            trackDeleteMedia();
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

  renderDropZone = () => {
    const { isAuthenticated, onFileDrop } = this.props;
    if (!isAuthenticated) {
      return null;
    }

    return (
      <ListItem disableGutters className="media__item">
        <Avatar>
          <FileUploadIcon />
        </Avatar>
        <Dropzone onDrop={onFileDrop} className="dropzone" multiple>
          <div className="name">Upload new items</div>
          <div className="date">
            <code>xlsx</code>, <code>docx</code>, <code>pdf</code>,{" "}
            <code>png</code>, <code>jpeg</code>
          </div>
        </Dropzone>
      </ListItem>
    );
  };

  renderMedia = () => {
    const { media } = this.props;
    if (!media) {
      return null;
    }

    return (
      <List>
        {this.renderDropZone()}
        {media.map(m => (
          <ListItem
            disableGutters
            key={m._id}
            className="media__item"
            href={`/api/static/${m.fileName}`}
            onClick={() => {
              trackMediaClick(m.fileName);
            }}
          >
            <ListItemAvatar>{fileTypeToIcon(m.fileName)}</ListItemAvatar>
            <ListItemText
              className="media__item__text"
              primary={stripFileExtension(m.fileName)}
              secondary={formatMediaDate(m.created)}
            />
            <ListItemSecondaryAction
              onClick={event => {
                this.setState({ selectedMediaId: m._id });
                this.openMenu(event);
              }}
            >
              <IconButton aria-label="More">
                <MoreVertIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
        {this.renderMenu()}
      </List>
    );
  };

  render() {
    return <div className="media">{this.renderMedia()}</div>;
  }
}

export default MediaPanel;
