import React, { Component } from "react";
import {
  List,
  Paper,
  Tabs,
  Tab,
  Dialog,
  DialogActions,
  DialogContent,
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
    const { isAuthenticated } = this.props;
    return (
      <div className="paper__title">
        <Typography variant="title">Properties</Typography>
        {isAuthenticated && (
          <div>
            <Button color="primary" onClick={() => this.onAddLocationClicked()}>
              Add Location
            </Button>
            <Button color="primary" onClick={() => this.onAddPropertyClicked()}>
              Add Property
            </Button>
          </div>
        )}
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

  renderProperties = (locationId = null) => {
    const properties = this.props.properties.list;
    if (!properties) {
      return null;
    }

    let filtered = properties;
    if (locationId) {
      filtered = properties.filter(p => p.locationRefId === locationId);
    }

    return (
      <List>
        {filtered.map(p => (
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

  renderLocationDialog = () => {
    const { newEntityName, showLocationModal } = this.state;
    const { createLocation } = this.props;
    return (
      <Dialog
        open={showLocationModal}
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add Property</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            label="Location Name"
            type="text"
            value={newEntityName}
            onChange={this.onNewEntityNameChanged}
            fullWidth
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={this.hideModals} color="primary">
            Cancel
          </Button>
          <Button
            onClick={event => {
              createLocation({
                name: newEntityName
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

  render() {
    const locations = this.props.locations.list;
    const { tabIndex } = this.state;

    return (
      <div className="propertiesView container">
        <Paper className="paper" elevation={1}>
          {this.renderLocationDialog()}
          {this.renderPropertyDialog()}
          {this.renderTitle()}
          {this.renderLocationTabs()}
          {tabIndex !== 0 &&
            this.renderLocationSummary(locations[tabIndex - 1])}
          {tabIndex === 0
            ? this.renderProperties()
            : this.renderProperties(locations[tabIndex - 1]._id)}
        </Paper>
      </div>
    );
  }
}

export default Properties;
