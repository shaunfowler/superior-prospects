import React, { Component } from "react";

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
              </div>
            ))}
        </div>
      </div>
    );
  }
}

export default Properties;
