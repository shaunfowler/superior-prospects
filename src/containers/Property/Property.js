import React, { Component } from "react";
import {
  Paper,
  Grid,
  Button,
  Typography,
  TextField,
  Avatar
} from "material-ui";
import {
  Folder as FolderIcon,
  FileUpload as FileUploadIcon
} from "material-ui-icons";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { stateToHTML } from "draft-js-export-html";
import { stateFromHTML } from "draft-js-import-html";
import renderHTML from "react-render-html";
import Dropzone from "react-dropzone";
import axios from "axios";

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
    const uploaders = files.map(file => {
      const formData = new FormData();
      formData.append("media", file);
      return axios.post(`/api/media/${_id}`, formData, {});
    });
    axios.all(uploaders).then(() => {});
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

  renderMedia = () => {
    const { selected, isAuthenticated } = this.props;
    return (
      <div className="media">
        <Grid container spacing={24}>
          {isAuthenticated && (
            <Grid item lg={3} md={3} sm={4} xs={6}>
              <Paper className="media__item" elevation={1}>
                <Avatar className="media__item__avatar">
                  <FileUploadIcon />
                </Avatar>
                <div className="media__item__text">
                  <Dropzone
                    onDrop={this.onFileDrop}
                    className="dropzone"
                    multiple
                  >
                    <div className="name">
                      Drop files here or click to upload.
                    </div>
                    <div className="date">
                      Only <code>xlsx</code>, <code>docx</code>,{" "}
                      <code>pdf</code>, <code>png</code>, <code>jpeg</code> are
                      allowed.
                    </div>
                  </Dropzone>
                </div>
              </Paper>
            </Grid>
          )}
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
                    <Avatar className="media__item__avatar">
                      <FolderIcon />
                    </Avatar>
                    <div className="media__item__text">
                      <div className="name">{m.fileName}</div>
                      <div className="date">{m.created}</div>
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
