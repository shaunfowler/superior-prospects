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
        <h1 className="title">{selected.name}</h1>
        <div className="subtitle">{selected.description}</div>
        <div className="columns">
          <div className="column is-three-quarters">
            <div className="content">
              {selected.body && renderHTML(selected.body)}
            </div>
          </div>

          <div className="column is-one-quarter">
            <nav className="panel">
              <p className="panel-heading">Media</p>
              <p className="panel-tabs">
                <a className="">all</a>
                <a className="is-active">images</a>
                <a>documents</a>
              </p>
              {selected.media.map(m => (
                <a className="panel-block" key={m._id}>
                  {m.fileName}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
    );
  }
}

export default Property;
