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
      editMode: false
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

  saveEditorContent = () => {
    const { editorState } = this.state;
    this.setState({
      editMode: false
    });
    this.props.editProperty(
      Object.assign({}, this.props.selected, {
        body: stateToHTML(editorState.getCurrentContent())
      })
    );
  };

  enterEditMode = () => {
    this.setState({ editMode: true });
  };

  renderTitle = () => {
    const { selected, isAuthenticated } = this.props;
    const { editMode } = this.state;
    return (
      <div>
        <h1 className="title">{selected.name}</h1>
        <div className="subtitle">{selected.description}</div>
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
