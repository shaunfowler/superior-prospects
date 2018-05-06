import React, { Component } from "react";
import {
  Paper,
  Grid,
  Button,
  Typography,
  TextField,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from "material-ui";
import { red } from "material-ui/colors";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { stateToHTML } from "draft-js-export-html";
import { stateFromHTML } from "draft-js-import-html";
import renderHTML from "react-render-html";
import { withRouter } from "react-router";
import {
  trackSaveProperty,
  trackEditButtonClick,
  trackFileUpload,
  trackPropertyDelete,
  trackOpenDeletePropertyModal
} from "../../analytics/propertyAnalytics";
import MediaPanel from "..//MediaPanel";

class Property extends Component {
  constructor(props) {
    super(props);

    this.state = {
      initialized: false,
      errored: false,
      editMode: false,
      showDeletePropertyDialog: false,
      newName: "",
      newDescription: "",
      newLocationRefId: ""
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    const { queryLocations, getProperty, history } = this.props;

    queryLocations();

    getProperty(id)
      .then(response => {
        const { name, body } = this.props.selected;
        document.title = `${name} - Superior Prospects`;
        const contentState = stateFromHTML(body);
        this.setState({
          initialized: true,
          editorState: EditorState.createWithContent(contentState)
        });
      })
      .catch(() => {
        history.push("/");
        this.setState({ initialized: false, errored: true });
      });
  }

  onEditorStateChange = editorState => {
    this.setState({
      editorState
    });
  };

  onNameChange = event => {
    this.setState({ newName: event.target.value });
  };

  onDescriptionChange = event => {
    this.setState({
      newDescription: event.target.value
    });
  };

  onLocationChange = event => {
    this.setState({
      newLocationRefId: event.target.value
    });
  };

  saveProperty = () => {
    const {
      editorState,
      newName,
      newDescription,
      newLocationRefId
    } = this.state;
    const { safeName } = this.props.selected;

    trackSaveProperty(safeName);

    this.props.editProperty(
      Object.assign({}, this.props.selected, {
        body: stateToHTML(editorState.getCurrentContent()),
        name: newName,
        description: newDescription,
        locationRefId: newLocationRefId
      })
    );

    this.setState({
      editMode: false,
      newName: "",
      newDescription: "",
      newLocationRefId: ""
    });
  };

  enterEditMode = () => {
    const { name, safeName, description, locationRefId } = this.props.selected;
    trackEditButtonClick(safeName);
    this.setState({
      editMode: true,
      newName: name,
      newDescription: description,
      newLocationRefId: locationRefId
    });
  };

  onFileDrop = files => {
    const { _id, safeName } = this.props.selected;
    trackFileUpload(safeName);
    const { createMedia } = this.props;
    files.map(file => createMedia(file, _id));
  };

  performDelete = async () => {
    const { selected, deleteProperty, history } = this.props;
    trackPropertyDelete(selected.safeName);
    await deleteProperty(selected._id);
    history.push("/");
    this.hideDeletePropertyDialog();
  };

  showDeletePropertyDialog = () => {
    const { safeName } = this.props.selected;
    trackOpenDeletePropertyModal(safeName);
    this.setState({
      showDeletePropertyDialog: true
    });
  };

  hideDeletePropertyDialog = () => {
    this.setState({
      showDeletePropertyDialog: false
    });
  };

  renderDeleteConfirmationDialog = () => {
    const { selected } = this.props;
    if (!selected) {
      return null;
    }

    return (
      <Dialog
        open={this.state.showDeletePropertyDialog}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Delete {selected.name}?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>This cannot be undone.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.hideDeletePropertyDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={this.performDelete}
            color="default"
            style={{ color: red[400] }}
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  renderTitle = () => {
    const { selected, isAuthenticated, locations } = this.props;
    const { editMode, newName, newLocationRefId } = this.state;
    const location = locations.find(l => l._id === selected.locationRefId);

    return (
      <div className="paper__title">
        <Typography variant="title">
          {!editMode && selected.name}
          {editMode && (
            <TextField
              className="title"
              onChange={this.onNameChange}
              value={newName}
            />
          )}

          {!editMode && (
            <span className="location">{location && location.name}</span>
          )}
          {editMode &&
            locations && (
              <Select
                className="location-select"
                value={newLocationRefId}
                onChange={this.onLocationChange}
                inputProps={{
                  name: "age",
                  id: "age-simple"
                }}
              >
                {locations.map(l => (
                  <MenuItem key={l._id} value={l._id}>
                    {l.name}
                  </MenuItem>
                ))}
              </Select>
            )}
        </Typography>

        {isAuthenticated &&
          !editMode && (
            <Button
              color="default"
              style={{ color: red[400] }}
              onClick={() => this.showDeletePropertyDialog()}
            >
              Delete
            </Button>
          )}

        {editMode && (
          <Button color="primary" onClick={() => this.saveProperty()}>
            Save
          </Button>
        )}
        {isAuthenticated &&
          !editMode && (
            <Button color="primary" onClick={() => this.enterEditMode()}>
              Edit
            </Button>
          )}
      </div>
    );
  };

  renderDescription = () => {
    const { editMode, newDescription } = this.state;
    const { selected } = this.props;
    return (
      <div className="description">
        {!editMode && <Typography>{selected.description}</Typography>}
        {editMode && (
          <TextField
            type="text"
            label="Description"
            multiline={true}
            rowsMax={5}
            className="subtitle"
            value={newDescription}
            onChange={this.onDescriptionChange}
          />
        )}
      </div>
    );
  };

  renderBody = () => {
    const { editorState, editMode } = this.state;
    const { selected } = this.props;
    return (
      <div className="body">
        {editMode ? (
          <Editor
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={this.onEditorStateChange}
          />
        ) : (
          selected.body && renderHTML(selected.body)
        )}
      </div>
    );
  };

  renderMedia = () => {
    const { selected, isAuthenticated } = this.props;
    return (
      <MediaPanel
        media={selected.media}
        onFileDrop={this.onFileDrop}
        isAuthenticated={isAuthenticated}
      />
    );
  };

  render() {
    return (
      <div className="propertyView container">
        <Paper className="paper" elevation={1}>
          {this.state.initialized && (
            <Grid container spacing={24}>
              <Grid item xs={12} style={{ paddingTop: 0, paddingBottom: 0 }}>
                {this.renderTitle()}
                {this.renderDescription()}
              </Grid>
              <Grid item xs={12} sm={12} md={8} lg={8} xl={9}>
                {this.renderBody()}
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={3}>
                {this.renderMedia()}
              </Grid>
            </Grid>
          )}
        </Paper>
        {this.renderDeleteConfirmationDialog()}
      </div>
    );
  }
}

export default withRouter(Property);
