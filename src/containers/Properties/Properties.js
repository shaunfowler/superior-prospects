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
  constructor(props) {
    super(props);
    this.state = {
      showPropertyModal: false,
      showLocationModal: false,
      newEntityName: "",
      selectedLocationId: null
    };
  }

  componentWillMount() {
    document.title = "Properties - Superior Prospects";
    this.props.queryLocations();
    this.props.queryProperties();
  }

  onAddLocationClicked = () => {
    this.setState({
      showLocationModal: true,
      showPropertyModal: false
    });
  };

  onAddPropertyClicked = () => {
    this.setState({
      showPropertyModal: true,
      showLocationModal: false
    });
  };

  onNewEntityNameChanged = event => {
    this.setState({
      newEntityName: event.target.value
    });
  };

  onSelectedLocationChanged = event => {
    this.setState({
      selectedLocationId: event.target.value
    });
  };

  hideModals = () => {
    this.setState({
      showPropertyModal: false,
      showLocationModal: false,
      newEntityName: "",
      selectedLocationId: null
    });
  };

  renderLocationModal = () => {
    const { newEntityName } = this.state;
    const { createLocation } = this.props;
    return (
      <div className="modal is-active">
        <div className="modal-background" />
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Add Location</p>
            <button
              className="delete"
              aria-label="close"
              onClick={() => this.hideModals()}
            />
          </header>
          <section className="modal-card-body">
            <div className="field">
              <label className="label">Location Name</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  value={newEntityName}
                  onChange={this.onNewEntityNameChanged}
                />
              </div>
            </div>
          </section>
          <footer className="modal-card-foot">
            <button
              className="button is-success"
              onClick={() =>
                createLocation({ name: newEntityName }).then(() =>
                  this.hideModals()
                )
              }
            >
              Save
            </button>
            <button className="button" onClick={() => this.hideModals()}>
              Cancel
            </button>
          </footer>
        </div>
      </div>
    );
  };

  renderPropertyModal = () => {
    const { newEntityName, selectedLocationId } = this.state;
    const { createProperty } = this.props;
    const locations = this.props.locations.list;
    return (
      <div className="modal is-active">
        <div className="modal-background" />
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Add Property</p>
            <button
              className="delete"
              aria-label="close"
              onClick={() => this.hideModals()}
            />
          </header>
          <section className="modal-card-body">
            <div className="field">
              <label className="label">Property Name</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  value={newEntityName}
                  onChange={this.onNewEntityNameChanged}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Location</label>
              <div className="control">
                <div className="select">
                  <select onChange={this.onSelectedLocationChanged}>
                    {locations.map(l => (
                      <option value={l._id} key={l._id}>
                        {l.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </section>
          <footer className="modal-card-foot">
            <button
              className="button is-success"
              onClick={() =>
                createProperty({
                  name: newEntityName,
                  locationRefId: selectedLocationId,
                  visible: true
                }).then(() => this.hideModals())
              }
            >
              Save
            </button>
            <button className="button" onClick={() => this.hideModals()}>
              Cancel
            </button>
          </footer>
        </div>
      </div>
    );
  };

  render() {
    const locations = this.props.locations.list;
    const properties = this.props.properties.list;
    const { showLocationModal, showPropertyModal } = this.state;

    return (
      <div className="propertiesView container">
        {showLocationModal && this.renderLocationModal()}
        {showPropertyModal && this.renderPropertyModal()}
        <div className="viewContainer columns">
          <div className="column">
            <h1 className="title">
              Properties
              <div className="buttons">
                <a
                  className="button is-link is-outlined"
                  onClick={() => this.onAddLocationClicked()}
                >
                  Add Location
                </a>
                <a
                  className="button is-link is-outlined"
                  onClick={() => this.onAddPropertyClicked()}
                >
                  Add Property
                </a>
              </div>
            </h1>

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
