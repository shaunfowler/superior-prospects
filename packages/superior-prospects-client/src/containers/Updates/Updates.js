import React, { Component } from "react";
import {
  Button,
  List,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField
} from "@material-ui/core";
import {
  trackOpenCreateUpdateModal,
  trackPerformCreateUpdate,
  trackPerformDeleteUpdate
} from "../../analytics/updatesAnalytics";
import UpdateItem from "../../components/UpdateItem";

const sortNewestToOldestPredicate = (a, b) =>
  new Date(b.created) - new Date(a.created);

class Updates extends Component {
  state = {
    anchorEl: null,
    updateText: "",
    dialogOpen: false
  };

  componentWillMount() {
    this.props.queryUpdates();
  }

  onDeleteUpdate = update => {
    trackPerformDeleteUpdate();
    this.props.deleteUpdate(update);
  };

  onUpdateTextChange = event => {
    this.setState({ updateText: event.target.value });
  };

  onSubmitUpdate = () => {
    trackPerformCreateUpdate();
    this.props.createUpdate({
      body: this.state.updateText,
      created: new Date()
    });
    this.setState({ updateText: "" });
  };

  onOpenDialog = () => {
    trackOpenCreateUpdateModal();
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

  renderUpdatesTitle = () => {
    const { isAuthenticated } = this.props;
    return (
      <div className="paper__title">
        <Typography variant="h6">News</Typography>
        {isAuthenticated && (
          <Button
            className="paper__edit-icon"
            aria-label="More"
            color="primary"
            onClick={event => {
              this.onOpenDialog(event);
            }}
          >
            Add a news item
          </Button>
        )}
      </div>
    );
  };

  render() {
    const { isAuthenticated } = this.props;
    return (
      <div>
        {this.renderUpdatesTitle()}
        {isAuthenticated && this.renderDialog()}
        {this.renderUpdatesList()}
      </div>
    );
  }
}

export default Updates;
