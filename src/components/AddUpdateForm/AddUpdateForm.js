import React from "react";
import TextField from "material-ui/TextField";
import Button from "material-ui/Button";

class AddUpdateForm extends React.Component {
  constructor(state) {
    super(state);
    this.state = { text: "" };
  }

  onTextChange = event => {
    this.setState({ text: event.target.value });
  };

  onSubmit = () => {
    this.props.onCreate({
      body: this.state.text,
      created: new Date()
    });
    this.setState({ text: "" });
  };

  render() {
    const { text } = this.state;
    return (
      <div>
        <TextField
          label="Summary of news"
          multiline
          rows="2"
          margin="normal"
          value={text}
          onChange={this.onTextChange}
          style={{ width: "100%" }}
        />
        <br />
        <Button
          variant="raised"
          color="primary"
          onClick={() => this.onSubmit()}
        >
          Add
        </Button>
      </div>
    );
  }
}

export default AddUpdateForm;
