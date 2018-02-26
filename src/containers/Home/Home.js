import React, { Component } from "react";
import { Link } from "react-router-dom";
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
    updateModalOpen: false
  };

  componentWillMount() {
    document.title = "Superior Prospects";
    this.props.queryUpdates();
    this.props.queryProperties();
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

  handleClickOpenDialog = () => {
    this.setState({ updateModalOpen: true });
  };

  handleCloseDialog = () => {
    this.setState({ updateModalOpen: false });
  };

  render() {
    const updates = this.props.updates.list;
    const properties = this.props.properties.list;
    const { isAuthenticated } = this.props;
    const { updateText } = this.state;

    return (
      <div className="homeView container">
        <Grid container spacing={24}>
          <Grid item sm={6}>
            <Paper className="paper" elevation={1}>
              <div className="paper__title">
                <Typography variant="title">News</Typography>
                {isAuthenticated && (
                  <Button
                    className="paper__edit-icon"
                    aria-label="More"
                    color="primary"
                    onClick={event => this.handleClickOpenDialog(event)}
                  >
                    Add a news item
                  </Button>
                )}
              </div>

              {isAuthenticated && (
                <Dialog
                  open={this.state.updateModalOpen}
                  onClose={this.handleClose}
                  aria-labelledby="form-dialog-title"
                >
                  <DialogTitle id="form-dialog-title">
                    Add a news item
                  </DialogTitle>
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
                    <Button onClick={this.handleCloseDialog} color="primary">
                      Cancel
                    </Button>
                    <Button
                      onClick={event => {
                        this.handleCloseDialog(event);
                        this.onSubmitUpdate();
                      }}
                      color="primary"
                      disabled={updateText === ""}
                    >
                      Add
                    </Button>
                  </DialogActions>
                </Dialog>
              )}

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
            </Paper>
          </Grid>
          <Grid item sm={6}>
            <Paper className="paper" elevation={1}>
              <div className="paper__title">
                <Typography variant="title">
                  Recently added properties
                </Typography>
              </div>
              <List>
                {properties &&
                  properties
                    .sort(sortNewestToOldestPredicate)
                    .slice(0, 3)
                    .map(p => (
                      <PropertyItem
                        key={p._id}
                        id={p._id}
                        name={p.name}
                        created={p.created}
                        safeName={p.safeName}
                        description={p.description}
                      />
                    ))}
              </List>
              <br />
              <Link to="/properties">
                <Button
                  variant="raised"
                  color="primary"
                  className="view-all-properties-button"
                >
                  View all properties
                </Button>
              </Link>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Home;
