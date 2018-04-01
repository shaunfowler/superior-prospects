import React, { Component } from "react";
// import { Link } from "react-router-dom";
import {
  Button,
  List,
  Grid,
  Paper,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField
} from "material-ui";
import UpdateItem from "../../components/UpdateItem";
import PropertyItem from "../../components/PropertyItem";

const sortNewestToOldestPredicate = (a, b) =>
  new Date(b.created) - new Date(a.created);

class Home extends Component {
  state = {
    anchorEl: null,
    updateText: "",
    dialogOpen: false
  };

  componentWillMount() {
    document.title = "Superior Prospects";
    this.props.queryUpdates();
    this.props.queryProperties();
    this.props.queryLocations();
  }

  onDeleteUpdate = update => {
    this.props.deleteUpdate(update);
  };

  onUpdateTextChange = event => {
    this.setState({ updateText: event.target.value });
  };

  onSubmitUpdate = () => {
    this.props.createUpdate({
      body: this.state.updateText,
      created: new Date()
    });
    this.setState({ updateText: "" });
  };

  onOpenDialog = () => {
    this.setState({ dialogOpen: true });
  };

  onCloseDialog = () => {
    this.setState({ dialogOpen: false });
  };

  renderDialog = () => {
    const { dialogOpen, updateText } = this.state;
    return (
      <Dialog
        open={dialogOpen}
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add a news item</DialogTitle>
        <DialogContent>
          <DialogContentText style={{ marginBottom: "20px" }}>
            Enter a short summary of the news or announcement.
          </DialogContentText>
          <TextField
            autoFocus
            id="news"
            label="News text"
            type="text"
            multiline={true}
            rowsMax={5}
            value={updateText}
            onChange={this.onUpdateTextChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.onCloseDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={event => {
              this.onCloseDialog(event);
              this.onSubmitUpdate();
            }}
            color="primary"
            disabled={updateText === ""}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  renderUpdatesList = () => {
    const updates = [...this.props.updates.list];
    const { isAuthenticated } = this.props;
    return (
      <List>
        {updates &&
          updates
            .sort(sortNewestToOldestPredicate)
            .slice(0, 5)
            .map(u => (
              <UpdateItem
                key={u._id}
                id={u._id}
                body={u.body}
                created={u.created}
                onDelete={this.onDeleteUpdate}
                isUserAuthenticated={isAuthenticated}
              />
            ))}
      </List>
    );
  };

  renderPropertiesList = () => {
    const properties = [...this.props.properties.list];
    const locations = this.props.locations.list;

    const getLocationName = locationId => {
      const location = locations.find(l => l._id === locationId);
      if (location) {
        return location.name;
      }
      return null;
    };

    return (
      <List>
        {properties &&
          properties
            .sort(sortNewestToOldestPredicate)
            .slice(0, 5)
            .map(p => (
              <PropertyItem
                key={p._id}
                id={p._id}
                name={p.name}
                safeName={p.safeName}
                description={p.description}
                locationName={getLocationName(p.locationRefId)}
              />
            ))}
      </List>
    );
  };

  renderUpdatesTitle = () => {
    const { isAuthenticated } = this.props;
    return (
      <div className="paper__title">
        <Typography variant="title">News</Typography>
        {isAuthenticated && (
          <Button
            className="paper__edit-icon"
            aria-label="More"
            color="primary"
            onClick={event => this.onOpenDialog(event)}
          >
            Add a news item
          </Button>
        )}
      </div>
    );
  };

  renderPropertiesTitle = () => {
    return (
      <div className="paper__title">
        <Typography variant="title">Recently added properties</Typography>
      </div>
    );
  };

  render() {
    return (
      <div className="homeView container">
        <Grid container spacing={8}>
          <Grid item sm={6}>
            <Paper className="paper" elevation={1}>
              {this.renderUpdatesTitle()}
              {this.renderDialog()}
              {this.renderUpdatesList()}
            </Paper>
          </Grid>
          <Grid item sm={6}>
            <Paper className="paper" elevation={1}>
              {this.renderPropertiesTitle()}
              {this.renderPropertiesList()}
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Home;
