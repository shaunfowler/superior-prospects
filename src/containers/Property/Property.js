import React, { Component } from "react";
import renderHTML from "react-render-html";

class Property extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialized: false
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getProperty(id).then(() => {
      this.setState({ initialized: true });
    });
  }

  render() {
    if (!this.state.initialized) {
      return null;
    }

    const { selected } = this.props;
    return (
      <div className="propertyView container">
        <h2>{selected.name}</h2>
        <em>{selected.description}</em>
        <ul>{selected.media.map(m => <li key={m._id}>{m.fileName}</li>)}</ul>
        <div>{selected.body && renderHTML(selected.body)}</div>
      </div>
    );
  }
}

export default Property;
