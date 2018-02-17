import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "material-ui/Button";
import Paper from "material-ui/Paper";
import Grid from "material-ui/Grid";
import Typography from "material-ui/Typography";
import PropertyItem from "../../components/PropertyItem";
import UpdateItem from "../../components/UpdateItem";
import AddUpdateForm from "../../components/AddUpdateForm";

const sortNewestToOldestPredicate = (a, b) =>
  new Date(b.created) - new Date(a.created);

class Home extends Component {
  componentWillMount() {
    document.title = "Superior Prospects";
    this.props.queryUpdates();
    this.props.queryProperties();
  }

  onDeleteUpdate = update => {
    this.props.deleteUpdate(update);
  };

  onCreateUpdate = update => {
    this.props.createUpdate(update);
  };

  render() {
    const updates = this.props.updates.list;
    const properties = this.props.properties.list;
    const { isAuthenticated } = this.props;
    return (
      <div className="homeView container">
        <Grid container spacing={24}>
          <Grid item sm={6}>
            <Paper className="paper">
              <Typography variant="headline" gutterBottom>
                News
              </Typography>
              {isAuthenticated && (
                <AddUpdateForm onCreate={this.onCreateUpdate} />
              )}
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
            </Paper>
          </Grid>
          <Grid item sm={6}>
            <Paper className="paper">
              <Typography variant="headline" gutterBottom>
                Recently added properties
              </Typography>
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
              <br />
              <Link to="/properties">
                <Button variant="raised" color="primary">
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
