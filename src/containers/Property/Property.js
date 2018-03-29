import React, { Component } from "react";
import {
  Paper,
  Grid,
  Button,
  Typography,
  TextField,
  Avatar
} from "material-ui";
import { FileUpload as FileUploadIcon } from "material-ui-icons";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { stateToHTML } from "draft-js-export-html";
import { stateFromHTML } from "draft-js-import-html";
import renderHTML from "react-render-html";
import Dropzone from "react-dropzone";
import moment from "moment";
import fileTypeToIcon from "../../utils/fileTypeToIcon";

const stripFileExtension = filename =>
  filename.substring(0, filename.lastIndexOf("."));

const formatMediaDate = date => moment(date).format("MMMM Do YYYY");

class Property extends Component {
  constructor(props) {
    super(props);

    this.state = {
      initialized: false,
      errored: false,
      editMode: false,
      newName: "",
      newDescription: ""
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props
      .getProperty(id)
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

  saveEditorContent = () => {
    const { editorState } = this.state;

    this.props.editProperty(
      Object.assign({}, this.props.selected, {
        body: stateToHTML(editorState.getCurrentContent()),
        name: this.state.newName,
        description: this.state.newDescription
      })
    );

    this.setState({
      editMode: false,
      newName: "",
      newDescription: ""
    });
  };

  enterEditMode = () => {
    this.setState({
      editMode: true,
      newName: this.props.selected.name,
      newDescription: this.props.selected.description
    });
  };

  onFileDrop = files => {
    const { _id } = this.props.selected;
    const { createMedia } = this.props;
    files.map(file => createMedia(file, _id));
  };

  renderTitle = () => {
    const { selected, isAuthenticated } = this.props;
    const { editMode, newName } = this.state;
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
        </Typography>

        {editMode && (
          <Button color="primary" onClick={() => this.saveEditorContent()}>
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
          renderHTML(selected.body)
        )}
      </div>
    );
  };

  renderDropZone = () => {
    const { isAuthenticated } = this.props;
    if (!isAuthenticated) {
      return null;
    }
    return (
      <Grid item lg={3} md={3} sm={4} xs={6}>
        <Paper className="media__item" elevation={1}>
          <div className="media__item__avatar">
            <Avatar>
              <FileUploadIcon />
            </Avatar>
          </div>
          <div className="media__item__text">
            <Dropzone onDrop={this.onFileDrop} className="dropzone" multiple>
              <div className="name">Upload new items</div>
              <div className="date">
                <code>xlsx</code>, <code>docx</code>, <code>pdf</code>,{" "}
                <code>png</code>, <code>jpeg</code>
              </div>
            </Dropzone>
          </div>
        </Paper>
      </Grid>
    );
  };

  renderMedia = () => {
    const { selected, isAuthenticated } = this.props;

    if (!isAuthenticated && selected.media && selected.media.length === 0) {
      return null;
    }

    return (
      <div className="media">
        <Grid container spacing={8}>
          {this.renderDropZone()}
          {selected.media &&
            selected.media.map(m => (
              <Grid key={m._id} item lg={3} md={3} sm={4} xs={6}>
                <a
                  className="panel-block"
                  href={`/api/static/${m.fileName}`}
                  target="_blank"
                  key={m._id}
                >
                  <Paper className="media__item" elevation={1}>
                    <div className="media__item__avatar">
                      {fileTypeToIcon(m.fileName)}
                    </div>
                    <div className="media__item__text">
                      <div className="name">
                        {stripFileExtension(m.fileName)}
                      </div>
                      <div className="date">{formatMediaDate(m.created)}</div>
                    </div>
                  </Paper>
                </a>
              </Grid>
            ))}
        </Grid>
      </div>
    );
  };

  render() {
    return (
      <div className="propertyView container">
        <Paper className="paper" elevation={1}>
          {this.state.initialized && (
            <div>
              {this.renderTitle()}
              {this.renderDescription()}
              {this.renderMedia()}
              {this.renderBody()}
            </div>
          )}
        </Paper>
      </div>
    );
  }
}

export default Property;
