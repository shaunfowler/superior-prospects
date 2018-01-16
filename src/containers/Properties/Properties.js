import React, { Component } from "react";
import { Link } from "react-router-dom";

class Properties extends Component {
  componentWillMount() {
    this.props.queryLocations();
    this.props.getProperties();
  }

  render() {
    const locations = this.props.locations.list;
    const properties = this.props.properties.list;
    return (
      <div className="propertiesView container">
        {locations && locations.map(l => <div key={l._id}>{l.name}</div>)}
        <hr />
        {properties &&
          properties.map(p => (
            <div key={p._id}>
              <h3>{p.name}</h3>
              <p>{p.description}</p>
              <Link to={`properties/${p._id}`}>Details</Link>
            </div>
          ))}
      </div>
    );
  }
}

export default Properties;
