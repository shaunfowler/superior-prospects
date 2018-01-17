import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropertyItem from "../../components/PropertyItem";

const renderPropertiesForLocationId = (properties, locationId) => (
  <div>
    {properties &&
      properties
        .filter(p => p.locationRefId === locationId)
        .map(p => (
          <PropertyItem
            key={p._id}
            id={p._id}
            name={p.name}
            safeName={p.safeName}
            description={p.description}
          />
        ))}
  </div>
);

class Properties extends Component {
  componentWillMount() {
    this.props.queryLocations();
    this.props.queryProperties();
  }

  render() {
    const locations = this.props.locations.list;
    const properties = this.props.properties.list;
    return (
      <div className="propertiesView container">
        <h1 className="title">Properties</h1>
        {locations &&
          locations.map(l => (
            <div key={l._id} className="location">
              <div className="is-size-4 has-text-weight-bold">{l.name}</div>
              <div className="is-text-grey">{l.body}</div>
              {renderPropertiesForLocationId(properties, l._id)}
            </div>
          ))}
      </div>
    );
  }
}

export default Properties;
