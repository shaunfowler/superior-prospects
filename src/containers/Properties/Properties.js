import React, { Component } from "react";
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
    document.title = "Properties - Superior Prospects";
    this.props.queryLocations();
    this.props.queryProperties();
  }

  render() {
    const locations = this.props.locations.list;
    const properties = this.props.properties.list;
    return (
      <div className="propertiesView container">
        <div className="viewContainer columns">
          <div className="column">
            <h1 className="title">Properties</h1>
            {locations &&
              locations.map(l => (
                <div key={l._id} className="location">
                  <div className="is-size-4 has-text-weight-bold">
                    <i className="fa fa-map-marker" />
                    {l.name}
                  </div>
                  <div className="description is-text-grey">{l.body}</div>
                  {renderPropertiesForLocationId(properties, l._id)}
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Properties;
