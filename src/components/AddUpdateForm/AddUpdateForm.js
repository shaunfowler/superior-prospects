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
    this.props.onAdd({
      body: this.state.text,
      created: new Date()
    });
    this.setState({ text: "" });
  };

  render() {
    const { text } = this.state;
    return (
      <div>
        <h2>Add new update</h2>
        <form onSubmit={this.onSubmit}>
          <input type="text" value={text} onChange={this.onTextChange} />
          <input type="submit" value="Add" />
        </form>
      </div>
    );
  }
}

export default AddUpdateForm;
