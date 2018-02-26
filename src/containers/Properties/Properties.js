import React, { Component } from "react";
import { List, Grid, Paper } from "material-ui";
import PropertyItem from "../../components/PropertyItem";
import { Typography, Button } from "material-ui";

const renderPropertiesForLocationId = (properties, locationId) => (
  <List>
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
  </List>
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
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Paper className="paper" elevation={1}>
              {showLocationModal && this.renderLocationModal()}
              {showPropertyModal && this.renderPropertyModal()}
              <div className="viewContainer">
                <div className="paper__title">
                  <Typography variant="title">Properties</Typography>
                  <Button
                    color="primary"
                    onClick={() => this.onAddLocationClicked()}
                  >
                    Add Location
                  </Button>
                  <Button
                    color="primary"
                    onClick={() => this.onAddPropertyClicked()}
                  >
                    Add Property
                  </Button>
                </div>
                <div>
                  {locations &&
                    locations.map(l => (
                      <div key={l._id}>
                        <Typography variant="title">{l.name}</Typography>
                        <Typography variant="body1">{l.body}</Typography>
                        {renderPropertiesForLocationId(properties, l._id)}
                      </div>
                    ))}
                </div>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Properties;
