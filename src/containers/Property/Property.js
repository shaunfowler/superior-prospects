import React, { Component } from "react";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { stateToHTML } from "draft-js-export-html";
import { stateFromHTML } from "draft-js-import-html";
import renderHTML from "react-render-html";
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

  renderTitle = () => {
    const { selected, isAuthenticated } = this.props;
    const { editMode, newName, newDescription } = this.state;
    return (
      <div>
        <h1 className="title">
          {!editMode && selected.name}
          {editMode && (
            <input
              type="text"
              className="title"
              onChange={this.onNameChange}
              value={newName}
            />
          )}
        </h1>
        <div className="subtitle">
          {!editMode && selected.description}
          {editMode && (
            <textarea
              className="subtitle"
              value={newDescription}
              onChange={this.onDescriptionChange}
            />
          )}
        </div>

        {editMode && (
          <button
            className="button is-link is-outlined"
            onClick={() => this.saveEditorContent()}
          >
            Save
          </button>
        )}
        {isAuthenticated &&
          !editMode && (
            <button
              className="button is-link is-outlined"
              onClick={() => this.enterEditMode()}
            >
              Edit
            </button>
          )}
      </div>
    );
  };

  renderEditor() {
    const { editorState, editMode } = this.state;
    return (
      <div>
        <Editor
          editorState={editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={this.onEditorStateChange}
          readOnly={!editMode}
        />
      </div>
    );
  }

  renderBody = () => {
    const { selected } = this.props;
    return (
      <div className="content">
        {selected.body && renderHTML(selected.body)}
      </div>
    );
  };

  renderMedia = () => {
    const { selected } = this.props;
    return (
      <nav className="panel">
        <p className="panel-heading">Media</p>
        <p className="panel-tabs">
          <a className="">all</a>
          <a className="is-active">images</a>
          <a>documents</a>
        </p>
        {selected.media &&
          selected.media.map(m => (
            <a className="panel-block" key={m._id}>
              {m.fileName}
            </a>
          ))}
      </nav>
    );
  };

  render() {
    const { editMode } = this.state;
    return (
      <div className="propertyView container">
        <div className="columns viewContainer">
          {this.state.initialized && (
            <div className="column">
              {this.renderTitle()}
              <div className="columns">
                <div className="column is-three-quarters">
                  {editMode && this.renderEditor()}
                  {!editMode && this.renderBody()}
                </div>
                <div className="column is-one-quarter">
                  {this.renderMedia()}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Property;
