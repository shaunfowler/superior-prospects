import React, { Component } from "react";
import { Link } from "react-router-dom";

class Properties extends Component {
  componentWillMount() {
    this.props.getLocations();
    this.props.getProperties();
  }

  render() {
    const locations = this.props.locations.list;
    const properties = this.props.properties.list;
    return (
      <div className="propertiesView">
        <div className="locationsNav">
          {locations && locations.map(l => <h3 key={l._id}>{l.name}</h3>)}
        </div>
        <div className="propertiesNav">
          {properties &&
            properties.map(p => (
              <div key={p._id}>
                <h3>{p.name}</h3>
                <p>{p.description}</p>
                <Link to={`properties/${p._id}`}>Details</Link>
              </div>
            ))}
        </div>
      </div>
    );
  }
}

export default Properties;
