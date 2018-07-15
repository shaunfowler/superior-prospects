import React, { Component } from "react";
import { Grid, Paper } from "material-ui";
import Properties from "../Properties";
import Updates from "../Updates";

class Home extends Component {
  componentWillMount() {
    document.title = "Superior Prospects";
  }

  render() {
    return (
      <div className="homeView container">
        <Grid container spacing={8}>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={3}>
            <Paper className="paper" elevation={1}>
              <Updates />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12} md={8} lg={8} xl={9}>
            <Paper className="paper" elevation={1}>
              <Properties />
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Home;