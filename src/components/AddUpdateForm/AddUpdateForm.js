import React from "react";

class AddUpdateForm extends React.Component {
  constructor(state) {
    super(state);
    this.state = { text: "" };
  }

  onTextChange = event => {
    this.setState({ text: event.target.value });
  };

  onSubmit = event => {
    event.preventDefault();
    this.props.onCreate({
      body: this.state.text,
      created: new Date()
    });
    this.setState({ text: "" });
  };

  render() {
    const { text } = this.state;
    return (
      <form className="box" onSubmit={this.onSubmit}>
        <div className="field">
          <label className="label">Add a new update</label>
          <div className="control">
            <textarea
              value={text}
              onChange={this.onTextChange}
              className="textarea"
              placeholder="Enter the update text"
            />
          </div>
        </div>

        <div className="field">
          <div className="control">
            <input type="submit" className="button is-link" value="Add" />
          </div>
        </div>
      </form>
    );
  }
}

export default AddUpdateForm;
