import React, { Component } from "react";
import {
  List,
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

const Modes = {
  EDIT: 0,
  CREATE: 1
};

const alphabeticalSortPredicate = (a, b) =>
  a.name !== b.name ? (a.name < b.name ? -1 : 1) : 0;

class Properties extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPropertyModal: false,
      showLocationModal: false,
      entityId: null,
      entityName: "",
      entityDescription: "",
      modalMode: null,
      selectedLocationId: null,
      tabIndex: 0
    };
  }

  componentWillMount() {
    this.props.queryLocations();
    this.props.queryProperties();
  }

  onAddLocationClicked = () => {
    this.setState({
      showLocationModal: true,
      showPropertyModal: false,
      modalMode: Modes.CREATE
    });
  };

  onEditLocationClicked = location => {
    this.setState({
      showLocationModal: true,
      entityId: location._id,
      entityName: location.name,
      entityDescription: location.body,
      modalMode: Modes.EDIT
    });
  };

  onAddPropertyClicked = () => {
    const locations = this.props.locations.list;
    const { selectedLocationId } = this.state;

    const newState = {
      showPropertyModal: true,
      showLocationModal: false,
      modalMode: Modes.CREATE
    };
    if (!selectedLocationId && locations.length) {
      newState.selectedLocationId = locations[0]._id;
    }

    this.setState(newState);
  };

  onEntityNameChanged = event => {
    this.setState({
      entityName: event.target.value
    });
  };

  onEntityDescriptionChanged = event => {
    this.setState({
      entityDescription: event.target.value
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
      entityName: "",
      entityDescription: "",
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
        {locations &&
          locations
            .sort(alphabeticalSortPredicate)
            .map(l => <Tab key={l._id} label={l.name} />)}
      </Tabs>
    );
  };

  renderProperties = (locationId = null) => {
    const properties = [...this.props.properties.list];
    const locations = this.props.locations.list;
    if (!properties) {
      return null;
    }

    let filtered = properties;
    if (locationId) {
      filtered = properties.filter(p => p.locationRefId === locationId);
    }

    const getLocationName = locationId => {
      const location = locations.find(l => l._id === locationId);
      return location && location.name;
    };

    return (
      <List>
        {filtered
          .sort(alphabeticalSortPredicate)
          .map(p => (
            <PropertyItem
              key={p._id}
              id={p._id}
              name={p.name}
              safeName={p.safeName}
              description={p.description}
              locationName={!locationId && getLocationName(p.locationRefId)}
            />
          ))}
      </List>
    );
  };

  renderLocationSummary = location => {
    if (!location) {
      return null;
    }

    const { isAuthenticated } = this.props;

    return (
      <Typography variant="subheading" className="location-summary">
        {isAuthenticated && (
          <div className="location-toolbar">
            <Button
              color="primary"
              onClick={() => this.onEditLocationClicked(location)}
            >
              Edit {location.name}
            </Button>
          </div>
        )}
        {location.body}
      </Typography>
    );
  };

  renderLocationDialog = () => {
    const {
      entityId,
      entityName,
      entityDescription,
      showLocationModal,
      modalMode
    } = this.state;
    const { createLocation, updateLocation } = this.props;
    return (
      <Dialog
        open={showLocationModal}
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add Location</DialogTitle>
        <DialogContent className="dialog-md">
          <TextField
            autoFocus
            label="Name"
            type="text"
            value={entityName}
            onChange={this.onEntityNameChanged}
            fullWidth
          />
        </DialogContent>

        <DialogContent>
          <TextField
            label="Description"
            type="text"
            multiline={true}
            rowsMax={15}
            value={entityDescription}
            onChange={this.onEntityDescriptionChanged}
            fullWidth
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={this.hideModals} color="primary">
            Cancel
          </Button>
          <Button
            onClick={event => {
              let request;
              if (modalMode === Modes.CREATE) {
                request = createLocation({
                  name: entityName,
                  description: entityDescription
                });
              } else {
                request = updateLocation({
                  _id: entityId,
                  name: entityName,
                  description: entityDescription
                });
              }
              request.then(() => this.hideModals());
            }}
            color="primary"
            disabled={entityName === ""}
          >
            {modalMode === Modes.CREATE ? "Add" : "Update"}
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  renderPropertyDialog = () => {
    const { entityName, selectedLocationId, showPropertyModal } = this.state;
    const { createProperty } = this.props;
    const locations = this.props.locations.list;
    return (
      <Dialog
        open={showPropertyModal}
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add Property</DialogTitle>
        <DialogContent className="dialog-md">
          <TextField
            autoFocus
            label="Property Name"
            type="text"
            value={entityName}
            onChange={this.onEntityNameChanged}
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
                name: entityName,
                locationRefId: selectedLocationId,
                visible: true
              }).then(() => this.hideModals());
            }}
            color="primary"
            disabled={entityName === ""}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  render() {
    const locations = this.props.locations.list;
    const { isAuthenticated } = this.props;
    const { tabIndex } = this.state;

    return (
      <div className="propertiesView">
        {isAuthenticated && this.renderLocationDialog()}
        {isAuthenticated && this.renderPropertyDialog()}
        {this.renderTitle()}
        {this.renderLocationTabs()}
        {tabIndex !== 0 && this.renderLocationSummary(locations[tabIndex - 1])}
        {tabIndex === 0
          ? this.renderProperties()
          : this.renderProperties(locations[tabIndex - 1]._id)}
      </div>
    );
  }
}

export default Properties;
