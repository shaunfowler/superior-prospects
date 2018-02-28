import React, { Component } from "react";
import {
  List,
  Paper,
  Tabs,
  Tab,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel
} from "material-ui";
import PropertyItem from "../../components/PropertyItem";
import { Typography, Button } from "material-ui";

class Properties extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPropertyModal: false,
      showLocationModal: false,
      newEntityName: "",
      selectedLocationId: null,
      tabIndex: 0
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
    const locations = this.props.locations.list;
    const { selectedLocationId } = this.state;

    const newState = {
      showPropertyModal: true,
      showLocationModal: false
    };
    if (!selectedLocationId && locations.length) {
      newState.selectedLocationId = locations[0]._id;
    }

    this.setState(newState);
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

  onTabIndexChanged = (event, value) => {
    this.setState({ tabIndex: value });
  };

  hideModals = () => {
    this.setState({
      showPropertyModal: false,
      showLocationModal: false,
      newEntityName: "",
      selectedLocationId: null
    });
  };

  renderTitle = () => {
    return (
      <div className="paper__title">
        <Typography variant="title">Properties</Typography>
        <Button color="primary" onClick={() => this.onAddLocationClicked()}>
          Add Location
        </Button>
        <Button color="primary" onClick={() => this.onAddPropertyClicked()}>
          Add Property
        </Button>
      </div>
    );
  };

  renderLocationTabs = () => {
    const locations = this.props.locations.list;
    return (
      <Tabs
        className="location-tabs"
        value={this.state.tabIndex}
        onChange={this.onTabIndexChanged}
        indicatorColor="primary"
        textColor="primary"
        fullWidth
      >
        <Tab label="All Locations" />
        {locations && locations.map(l => <Tab key={l._id} label={l.name} />)}
      </Tabs>
    );
  };

  renderPropertiesForLocationId = locationId => {
    const properties = this.props.properties.list;
    return (
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
  };

  renderProperties = () => {
    const properties = this.props.properties.list;
    return (
      <List>
        {properties &&
          properties.map(p => (
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
  };

  renderLocationSummary = location => {
    return location ? (
      <Typography variant="subheading" className="location-summary">
        {location.body}
      </Typography>
    ) : null;
  };

  handleClickOpenDialog = () => {
    this.setState({ modalOpen: true });
  };

  handleCloseDialog = () => {
    this.setState({ modalOpen: false });
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

  renderPropertyDialog = () => {
    const { newEntityName, selectedLocationId, showPropertyModal } = this.state;
    const { createProperty } = this.props;
    const locations = this.props.locations.list;
    return (
      <Dialog
        open={showPropertyModal}
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add Property</DialogTitle>
        <DialogContent>
          <DialogContentText style={{ marginBottom: "20px" }}>
            Enter a short summary of the news or announcement.
          </DialogContentText>
          <TextField
            autoFocus
            label="Property Name"
            type="text"
            value={newEntityName}
            onChange={this.onNewEntityNameChanged}
            fullWidth
          />
          <br />
          <br />
          <FormControl>
            <InputLabel htmlFor="location">Location</InputLabel>
            <Select
              value={selectedLocationId}
              onChange={this.onSelectedLocationChanged}
              inputProps={{
                name: "location",
                id: "location"
              }}
              fullWidth
            >
              {locations.map(l => (
                <MenuItem value={l._id} key={l._id}>
                  {l.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.hideModals} color="primary">
            Cancel
          </Button>
          <Button
            onClick={event => {
              createProperty({
                name: newEntityName,
                locationRefId: selectedLocationId,
                visible: true
              }).then(() => this.hideModals());
            }}
            color="primary"
            disabled={newEntityName === ""}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
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
    const { isAuthenticated } = this.props;
    const { tabIndex } = this.state;

    return (
      <div className="propertiesView container">
        <Paper className="paper" elevation={1}>
          {isAuthenticated && this.renderLocationModal()}
          {this.renderPropertyDialog()}
          {this.renderTitle()}
          {this.renderLocationTabs()}
          {tabIndex !== 0 &&
            this.renderLocationSummary(locations[tabIndex - 1])}
          {tabIndex === 0
            ? this.renderProperties()
            : this.renderPropertiesForLocationId(locations[tabIndex - 1]._id)}
        </Paper>
      </div>
    );
  }
}

export default Properties;
